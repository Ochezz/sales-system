import { Router } from 'express'; 
import { AuthService } from '~services';
import { autoSignUp, isAccessTokenValid } from '~middlewares';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { CustomError } from "~utils/CustomError.js";
import logger from '~logger';
import { compareEncrypt } from '~utils/crypto.js';


const route = Router();

export default (app) => {
    const authServiceInstance = new AuthService(app);
    app.use('/auth', route);

    // 로그인
    route.post('/login', autoSignUp, asyncErrorWrapper(async (req, res, next) => {
        try{
            const { id, password, address } = req.body;
            const _password = await compareEncrypt(password, req.user.salt); 
            const { _id, name, profile, accessToken, refreshToken } = await authServiceInstance.SignIn(id, _password, address);
            
            res.cookie("R_AUTH", refreshToken, {
                sameSite: 'none',
                httpOnly: true,
                secure: false,                      // TODO
                maxAge: 1000 * 60 * 60 * 24 * 14    // 2 Week
            });
            return res.status(200).json({
                loginSuccess: accessToken != undefined,
                _id: _id,
                nickName: name,
                accessToken: accessToken,
                profile: +profile
            });
        }catch(err){
            throw new CustomError('LoginError', 401, err);
        }
    }));

    // 로그아웃(Refresh Token 삭제)
    route.post('/logout', (req, res, next) => {
        res.clearCookie('R_AUTH');
        res.status(204).json();
    })

    // Refresh Token을 이용해 Access Token 발급
    route.get('/refresh', asyncErrorWrapper(async (req, res, next) => {
        
        if(!req.cookies.R_AUTH) {
            throw new CustomError('RefreshTokenError', 401, 'Refresh token not found');
        }
        
        const { decodeSuccess, id, nickName, accessToken } = await authServiceInstance.reissueAccessToken(req.cookies.R_AUTH);
        // Refresh Token가 유효하지 않을 경우
        if(!decodeSuccess) {
            res.clearCookie('R_AUTH');
            throw new CustomError('RefreshTokenError', 401, 'Invalid refresh token');
        }
        else {

            return res.status(200).json({
                id,
                nickName,
                accessToken
            });        
        }
    }));

    // Access Token이 유효한지 체크
    route.get('/isValid', isAccessTokenValid, async (req, res, next) => {
        return res.status(200).json({
            isValid: true
        });        
    });
}