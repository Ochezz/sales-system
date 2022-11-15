import { Router } from 'express';
import { MemberService } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { isAccessTokenValid, administerOnly } from '~middlewares';

const route = Router();

export default (app) => {
    const memberServiceInstance = new MemberService(app);
    app.use('/memb', route);

    /// TODO case Regist
    // route.post('/', asyncErrorWrapper(async (req, res, next) => {
    // }));

    // case Update
    route.put('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        memberServiceInstance.update(user, {
            'id' : req.body.id,
            'userName' : req.body.name,
            'userPhone' : req.body.phone,
            'ageGroup' : req.body.ageGroup,
            'zipCd' : req.body.zipCode,
            'email' : req.body.email,
            'address1' : req.body.address1,
            'address2' : req.body.address2,
            'visitRoute1' : req.body.route1,
            'visitRoute2' : req.body.route2,
            'useMarketting' : req.body.useMarketting
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    // case Delete
    route.delete('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        memberServiceInstance.delete(user, {
            'id' : req.body.id,
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.get('/tdreg', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        memberServiceInstance.todaysRegist()
            .then(response =>
                res.status(200).json(response[0])
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    route.get('/location', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        memberServiceInstance.cityInfo()
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    route.get('/age', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        memberServiceInstance.ageInfo()
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    route.get('/list', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        memberServiceInstance.list(req.query.name, req.query.phone)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));
}