import { Router } from 'express';
import { InterestedService } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { csvDownloader, isAccessTokenValid, administerOnly } from '~middlewares';
import logger from '~logger';

const route = Router();

export default (app) => {
    const InterestedServiceInstance = new InterestedService(app);
    app.use('/interested', route);

    route.get('/csvDownload', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        InterestedServiceInstance.csvDownload(req.query.name, req.query.phone)
            .then(data => {
                    req.data = data;
                    res.setHeader("Content-Disposition", "attachment; filename=interest_customer.xlsx");
                    next();
                }
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }), csvDownloader);

    route.get('/setting', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        InterestedServiceInstance.getSetting()
            .then(response =>
                res.status(200).json(response[0])
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    route.post('/setting', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        InterestedServiceInstance.registNewSetting(user, {
            'infomation' : req.body.infomation,
            'name' : req.body.name,
            'phone' : req.body.phone,
            'ageGroup' : req.body.ageGroup,
            'email' : req.body.email,
            'address' : req.body.address,
            'marketting' : req.body.marketting
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));
}