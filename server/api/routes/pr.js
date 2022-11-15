import { Router } from 'express';
import { PressService } from '~services';
import { imgUploader, isAccessTokenValid } from '~middlewares';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';

const route = Router();

export default (app) => {
    const pressServiceInstance = new PressService(app);
    app.use('/pr', route);

    route.get('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        pressServiceInstance.list(req.query.title)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    route.post('/', isAccessTokenValid, imgUploader, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        pressServiceInstance.regist(user, {
            'title' : req.body.title,
            'thumnailUrl' : req.file.filename,
            'media' : req.body.media,
            'releaseDate' : req.body.releaseDate,
            'sourceUrl' : req.body.sourceUrl,
            'detail' : req.body.detail,
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
        pressServiceInstance.update(user, {
            'id' : req.body.id,
            'title' : req.body.title,
            'thumnailUrl' : req.body.thumnailUrl === undefined ? req.file.filename : req.body.thumnailUrl,
            'media' : req.body.media,
            'releaseDate' : req.body.releaseDate,
            'sourceUrl' : req.body.sourceUrl,
            'detail' : req.body.detail,
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
        pressServiceInstance.delete(user, {
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