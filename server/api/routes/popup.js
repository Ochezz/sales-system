import { Router } from 'express';
import { PopupSrvice } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { imgUploader, isAccessTokenValid } from '~middlewares';
import logger from '~logger';

const route = Router();

export default (app) => {
    const popupServiceInstance = new PopupSrvice(app);
    app.use('/popup', route);

    route.get('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        if ('id' in req.query) {
            popupServiceInstance.detail(req.query.id)
                .then(response =>
                    res.status(200).json(response[0])
                )
                .catch(e =>
                    res.status(400).json(e)
                );
        }else {
            popupServiceInstance.list(req.query.title)
                .then(response =>
                    res.status(200).json(response)
                )
                .catch(e =>
                    res.status(400).json(e)
               );
        }
    }));
                
    route.post('/', isAccessTokenValid, imgUploader, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        popupServiceInstance.regist(user, {
            'title' : req.body.title,
            'type' : req.body.type,
            'content' : req.body.type == 'I' ? req.file.filename : req.body.content,
            'dispSize' : req.body.dispSize,
            'hrefUrl' : req.body.hrefUrl,
            'position' : req.body.position,
            'priority' : req.body.priority,
            'startDate' : req.body.startDate,
            'endDate' : req.body.endDate,
            'isNewpage' : req.body.isNewpage,
            'isActive' : req.body.isActive
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.put('/', isAccessTokenValid, imgUploader, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        popupServiceInstance.update(user, {
            'id' : req.body.id,
            'title' : req.body.title,
            'type' : req.body.type,
            'content' : req.body.type == 'I' ? (req.body.content === undefined ? req.file.filename : req.body.content) : req.body.content,
            'dispSize' : req.body.dispSize,
            'hrefUrl' : req.body.hrefUrl,
            'position' : req.body.position,
            'priority' : req.body.priority,
            'startDate' : req.body.startDate,
            'endDate' : req.body.endDate,
            'isNewpage' : req.body.isNewpage,
            'isActive' : req.body.isActive
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));

    route.delete('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        popupServiceInstance.delete(user, {
            'id' : req.body.id,
        })
        .then(response =>
            res.status(200).json(response)
        )
        .catch(e =>
            res.status(400).json(e)
        );
    }));
}