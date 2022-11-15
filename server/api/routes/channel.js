import { Router } from 'express';
import { ChannelService } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { isAccessTokenValid, administerOnly } from '~middlewares';

const route = Router();

export default (app) => {
    const channelServiceInstance = new ChannelService(app);
    app.use('/channel', route);

    route.get('/', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        channelServiceInstance.allList()
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // case Regist
    route.post('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        channelServiceInstance.regist(user, {
                'channelName' : req.body.name,
                'channelNameUrl' : req.body.url,
                'description' : req.body.description
            })
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // case Update
    route.put('/', administerOnly, isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        const { user } = req;
        channelServiceInstance.update(user, {
                'id' : req.body.id,
                'channelName' : req.body.name,
                'channelNameUrl' : req.body.url,
                'description' : req.body.description
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
        channelServiceInstance.delete(user, {
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