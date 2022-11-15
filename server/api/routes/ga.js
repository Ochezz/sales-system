import { Router } from 'express';
import logger from '~logger';
import { GAService } from '~services';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { getRange, getUserRange, getDeviceRange } from '~utils/range.js';
import { isAccessTokenValid } from '~middlewares';

const route = Router();
const GAServiceInstance = new GAService();

export default (app) => {
    app.use('/ga', route);

    // 기본 정보 표시
    route.get('/info', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        GAServiceInstance.basicInfo()
            .then(response =>
                res.status(200).json(response[0])
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 시간에 따른 활성 사용자 추세
    route.get('/user', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = getUserRange(req.query.range)

        GAServiceInstance.userCntOfDate(range)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 방문자현황
    route.post('/user', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = {'standard' : {'start': req.body.start, 'end': req.body.end}}

        GAServiceInstance.activeUserCntOfDate(range)
            .then(response =>
                res.status(200).json(response)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 사용자 위치 파악
    route.get('/region', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = getRange(req.query.range)

        GAServiceInstance.userCntByRegion(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 지역별유입수 상세
    route.post('/region', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = {'standard' : {'start': req.body.start, 'end': req.body.end}}

        GAServiceInstance.userCntByRegionDetail(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));


    // 주요 기기 파악
    route.get('/device', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = getDeviceRange(req.query.range)

        GAServiceInstance.sessionCntByDevice(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 접속디바이스
    route.post('/device', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = {'standard' : {'start': req.body.start, 'end': req.body.end}}

        GAServiceInstance.sessionCntByDeviceDetail(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 사용자가 방문하는 페이지 파악
    route.get('/path', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = getRange(req.query.range)

        GAServiceInstance.viewCntByVisitedPath(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 콘텐츠페이지뷰
    route.post('/path', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = {'standard' : {'start': req.body.start, 'end': req.body.end}}

        GAServiceInstance.viewCntByVisitedPathDetail(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 채널별 유입현황 추가
    route.get('/channel', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = getRange(req.query.range)

        GAServiceInstance.userCntByChannel(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));

    // 채널별 유입현황 추가
    route.post('/channel', isAccessTokenValid, asyncErrorWrapper(async (req, res, next) => {
        let range = {'standard' : {'start': req.body.start, 'end': req.body.end}}

        GAServiceInstance.userCntByChannelDetail(range)
            .then(result =>
                res.status(200).json(result)
            )
            .catch(e =>
                res.status(400).json(e)
            );
    }));
}