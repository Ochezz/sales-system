import config from "~config";
import logger from "~logger";
import { round } from "~utils/convert.js";

const basic_report = (range) => {
    return {
        reportRequests: [
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [
                    { startDate: range.standard.start, endDate: range.standard.end },
                    { startDate: range.control.start, endDate: range.control.end },
                ],
                metrics: [{ expression: "ga:sessions" }],
                dimensions: [{ name: "ga:deviceCategory" }],
                includeEmptyRows: "true",
            },
        ],
    };
}

const format = (res) => {
    let rows = res.data.reports[0].data.rows;
    let stdTotal = res.data.reports[0].data.totals[0].values[0];
    let result = [];
    try {
        rows.forEach((row) => {
            let item = {};
            let stdval = row.metrics[0].values[0];
            let ctval = row.metrics[1].values[0];

            item.device = row.dimensions[0];
            item.session = round((stdval / stdTotal) * 100, 1);
            item.rate_of_change = round((stdval - ctval) / ctval * 100, 1);
            result.push(item);
        });
    } catch (e) {
        logger.error(e);
        return res
    }

    return result;
}

export default { basic_report, format }