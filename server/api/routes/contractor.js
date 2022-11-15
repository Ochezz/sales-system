import { Router } from 'express';
import { ContractorService } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { csvDownloader, isAccessTokenValid, administerOnly } from '~middlewares';
import logger from '~logger';

const route = Router();

export default (app) => {
    const contractorService = new ContractorService(app);
    app.use('/contractor', route);

    route.get('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        if ('id' in req.query) {
            contractorService.detail(req.query.id)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }else {
            contractorService.list({
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
            item.name = element.userName;
            item.phone = element.userPhone;
            item.birthday = element.birthday;
            item.type = element.type;
            item.room = element.room;
            item.resvDate = element.resvDate;
            item.memo = element.memo;
            items.push(item);
        })

        contractorService.regist(user, items)
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.put('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        contractorService.update(user, {
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
        contractorService.delete(user, {
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
            contractorService.resvDetail(req.query.id)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }else {
            contractorService.resvList({
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
        contractorService.resvCsvDownload({
            'userName' : req.query.userName,
            'userPhone' : req.query.userPhone,
            'startDate' : req.query.startDate,
            'endDate' : req.query.endDate,
            'visitTime' : req.query.visitTime,
        })
            .then(data =>{
                    req.data = data;
                    res.setHeader("Content-Disposition", "attachment; filename=contractor_customer.xlsx");
                    next();
                }
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }), csvDownloader);

    route.post('/resv/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        contractorService.resvRegist(user, {
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
        contractorService.resvUpdate(user, {
            'id' : req.body.id,
            'userName' : req.body.userName,
            'userPhone' : req.body.userPhone,
            'visitNum' : req.body.visitNum,
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
        contractorService.resvDelete(user, {
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
            contractorService.settingDetail(req.query.date)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
        }else {
            contractorService.settingList({
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
        contractorService.settingRegist(user, items)
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

        contractorService.settingUpdate(user, datas)
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

        contractorService.settingDelete(user, datas)
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));
}