import { Router } from 'express';
import { csvDownloader, isAccessTokenValid, administerOnly } from '~middlewares';
import { UserService } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { CustomError } from "~utils/CustomError.js";
import { PROFILE_SITE } from '~const';
import { createEncrypt } from '~utils/crypto.js';
import logger from '~logger';

const route = Router();

export default (app) => {
    const userServiceInstance = new UserService(app);
    app.use('/user', route);

    route.get('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        
        if ('id' in req.query) {
            if(user.profile == PROFILE_SITE && user._id != req.query.id){
                throw new CustomError('AuthorizationError', 401, 'User is not authorized');
            }
            userServiceInstance.detail(req.query.id)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }else {
            userServiceInstance.list(user, {
                'name' : req.query.userName,
                'phone' : req.query.userPhone
            })
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }
    }));

    route.post('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        try{
            const { user } = req;
            const newUser = req.body.user;
            const { encrypt, salt} = await createEncrypt(newUser.password);
            
            // AccessToken, RefreshToken 발급
            const { id, nickName, accessToken, refreshToken } = await userServiceInstance.regist(user, {
                "id": newUser.id,
                "password": encrypt, 
                "ips": newUser.ips,
                "profile": newUser.profile,
                "name": newUser.name,
                "phone": newUser.phone,
                "officePhone": newUser.officePhone,
                "rank": newUser.rank,
                "email": newUser.email,
                "memo": newUser.memo,
                "salt": salt
            });
            
            return res.status(200).json({
                registSuccess: true,
                id: id,
                nickName: nickName,
                // accessToken: accessToken
            });
        }catch(e){
            logger.error(e)
            throw new CustomError('Sign Up Error', e.status, e.message);
        }
    }));

    route.post('/rootUserRegist/', asyncErrorWrapper(async (req, res, next) => {
        try{
            const user = {"_id" : "system"}
            const newUser = req.body.user;
            const { encrypt, salt} = await createEncrypt(newUser.password);
            
            // AccessToken, RefreshToken 발급
            const { id, nickName, accessToken, refreshToken } = await userServiceInstance.regist(user, {
                "id": newUser.id,
                "password": encrypt, 
                "ips": newUser.ips,
                "profile": newUser.profile,
                "name": newUser.name,
                "phone": newUser.phone,
                "officePhone": newUser.officePhone,
                "rank": newUser.rank,
                "email": newUser.email,
                "memo": newUser.memo,
                "salt": salt
            });
            
            return res.status(200).json({
                registSuccess: true,
                id: id,
                nickName: nickName,
                // accessToken: accessToken
            });
        }catch(e){
            logger.error(e)
            throw new CustomError('Sign Up Error', e.status, e.message);
        }
    }));

    route.put('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        const newUser = req.body.user;
        const isPwUpdate = newUser.password != "";
        const { encrypt, salt } = await createEncrypt(newUser.password);

        userServiceInstance.update(user, {
            "id": newUser.id,
            "password": isPwUpdate ? encrypt : "", 
            "ips": newUser.ips,
            "profile": newUser.profile,
            "name": newUser.name,
            "phone": newUser.phone,
            "officePhone": newUser.officePhone,
            "rank": newUser.rank,
            "email": newUser.email,
            "memo": newUser.memo,
            "salt": isPwUpdate ? salt : ""
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.delete('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        userServiceInstance.delete(user, {
            'id' : req.body.id,
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.get('/csvDownload', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;        
        userServiceInstance.csvDownload(user, {
            'name' : req.query.userName,
            'phone' : req.query.userPhone
        })
        .then(data =>{
            req.data = data;
            res.setHeader("Content-Disposition", "attachment; filename=user_list.xlsx");
            next();
        }
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }), csvDownloader);
}