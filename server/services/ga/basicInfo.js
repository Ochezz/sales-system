import config from "~config";
import logger from "~logger";
import { toMinsecString } from "~utils/convert.js";

const basic_report = () => {
    return {
        reportRequests: [
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: 'today', endDate: 'today' }],
                metrics: [
                    { expression: "ga:users" },
                    { expression: "ga:sessions" },
                    { expression: "ga:avgSessionDuration" },
                ],
                includeEmptyRows: "true",
            },
        ],
    };
}

const format = (res) => {
    let row = res.data.reports[0].data.rows[0];

    let result = [];

    try {
        let item = {};

        item.user = row.metrics[0].values[0];
        item.session = row.metrics[0].values[1];
        item.avgSession = toMinsecString(row.metrics[0].values[2]);

        result.push(item);
    } catch (e) {
        logger.error(e);
        return res
    }

    return result;
}

export default { basic_report, format }