import { getReports } from "~utils/gaReport.js";
import basicInfoRnF from "./basicInfo.js";
import usercntVisitRnF from "./usercntVisit.js";
import activeUsercntRnF from "./activeUsercnt.js";
import usercntRegionRnF from "./usercntRegion.js";
import usercntRegionDetailRnF from "./usercntRegionDetail.js";
import sessioncntDeviceRnF from "./sessioncntDevice.js";
import sessioncntByDeviceDetailRnF from "./sessioncntDeviceDetail.js";
import visitedPathRnF from "./visitedPath.js";
import visitedPathDetailRnF from "./visitedPathDetail.js";
import usercntChannelRnF from "./usercntChannel.js";
import usercntChannelDetailRnF from "./usercntChannelDetail.js";
import logger from "~logger";

export class GAService {

    async basicInfo() {
        let { basic_report, format } = basicInfoRnF;
        return await getReports(basic_report(), format);
    }

    async userCntOfDate(range) {
        let { basic_report, format } = usercntVisitRnF;
        return await getReports(basic_report(range), format);
    }

    async activeUserCntOfDate(range) {
        let { basic_report, format } = activeUsercntRnF;
        return await getReports(basic_report(range), format);
    }

    async userCntByRegion(range) {
        let { basic_report, format } = usercntRegionRnF;
        return await getReports(basic_report(range), format);
    }

    async userCntByRegionDetail(range) {
        let { basic_report, format } = usercntRegionDetailRnF;
        return await getReports(basic_report(range), format);
    }

    async sessionCntByDevice(range) {
        let { basic_report, format } = sessioncntDeviceRnF;
        return await getReports(basic_report(range), format);
    }

    async sessionCntByDeviceDetail(range) {
        let { basic_report, format } = sessioncntByDeviceDetailRnF;
        return await getReports(basic_report(range), format);
    }

    async viewCntByVisitedPath(range) {
        let { basic_report, format } = visitedPathRnF;
        return await getReports(basic_report(range), format);
    }

    async viewCntByVisitedPathDetail(range) {
        let { basic_report, format } = visitedPathDetailRnF;
        return await getReports(basic_report(range), format);
    }

    async userCntByChannel(range) {
        try{

            let { basic_report, format } = usercntChannelRnF;
            return await getReports(basic_report(range), format);
        }catch(e) {
            logger.error("error in index");
            logger.error(e);
            return {}
        }
    }

    async userCntByChannelDetail(range) {
        let { basic_report, format } = usercntChannelDetailRnF;
        return await getReports(basic_report(range), format);
    }
    
}
