import { Router } from 'express';
import { PaymentService } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { csvDownloader, isAccessTokenValid, administerOnly } from '~middlewares';
import logger from '~logger';

const route = Router();

export default (app) => {
    const paymentService = new PaymentService(app);
    app.use('/payment', route);

    route.get('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        if ('id' in req.query) {
            paymentService.detail(req.query.id)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }else {
            paymentService.list({
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
        const { user } = req;
        let items = [];
        req.body.items.filter(element => {
            let item = {};
            item.name = userName;
            item.phone = element.userPhone;
            item.birthday = element.birthday;
            item.type = element.type;
            item.resvDate = element.resvDate;
            item.memo = element.memo;
            items.push(item);
        })

        paymentService.regist(user, items)
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.put('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        paymentService.update(user, {
            'id' : req.body.id,
            'userName' : req.body.userName,
            'userPhone' : req.body.userPhone,
            'birthday' : req.body.birthday,
            'memo' : req.body.memo
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
        paymentService.delete(user, {
            'id' : req.body.id,
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.get('/resv/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        if ('id' in req.query) {
            paymentService.resvDetail(req.query.id)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }else {
            paymentService.resvList({
                'userName' : req.query.userName,
                'userPhone' : req.query.userPhone,
                'startDate' : req.query.startDate,
                'endDate' : req.query.endDate,
                'visitTime' : req.query.visitTime,
            })
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }        
    }));

    route.get('/resv/csvDownload', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        paymentService.resvCsvDownload({
            'userName' : req.query.userName,
            'userPhone' : req.query.userPhone,
            'startDate' : req.query.startDate,
            'endDate' : req.query.endDate,
            'visitTime' : req.query.visitTime,
        })
            .then(data =>{
                    req.data = data;
                    res.setHeader("Content-Disposition", "attachment; filename=payment_customer.xlsx");
                    next();
                }
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }), csvDownloader);

    route.post('/resv/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        paymentService.resvRegist(user, {
            'userName' : req.body.userName,
            'userPhone' : req.body.userPhone,
            'memo' : req.body.memo,
            'visitDay' : req.body.visitDay,
            'visitTime' : req.body.visitTime
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.put('/resv/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        paymentService.resvUpdate(user, {
            'id' : req.body.id,
            'userName' : req.body.userName,
            'userPhone' : req.body.userPhone,
            'memo' : req.body.memo
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.delete('/resv/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        paymentService.resvDelete(user, {
            'id' : req.body.id,
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));


    route.get('/setting/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        if ('date' in req.query) {
            paymentService.settingDetail(req.query.date)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }else {
            paymentService.settingList({
                'startDate' : req.query.startDate,
                'endDate' : req.query.endDate,
            })
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }       
    }));
    
    route.post('/setting/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        let items = []
        let startvisitDay = req.body.startvisitDay
        let endvisitDay = req.body.endvisitDay
        startvisitDay.getDatesBetween(endvisitDay).filter(date => {
            req.body.items.filter(element => {
                let item = {};
                item.visitDay = date;
                item.visitTime = element.visitTime;
                item.maximumNum = element.maximumNum;
                items.push(item);
            })
        })
        paymentService.settingRegist(user, items)
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.put('/setting/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        let datas = {}
        let items = []
        datas.visitDay = req.body.visitDay
        req.body.items.filter(element => {
            let item = {};
            item.id = element.id;
            item.maximumNum = element.maximumNum;
            items.push(item);
        })
        datas.items = items

        paymentService.settingUpdate(user, datas)
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.delete('/setting/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        let datas = {}
        let items = []
        datas.visitDay = req.body.visitDay
        req.body.items.filter(element => {
            let item = {};
            item.id = element.id;
            items.push(item);
        })
        datas.items = items

        paymentService.settingDelete(user, datas)
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));
}