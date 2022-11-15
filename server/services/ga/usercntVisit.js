import config from "~config";
import logger from "~logger";
import { isNumeric } from "~utils/check.js";

const basic_report = (range) => {
    return {
        reportRequests: [
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [{ 'expression': 'ga:users' }],
                dimensions: [{ 'name': range.dimensions }],
                includeEmptyRows: "true",
            },
        ],
    };
}

const format = (res) => {
    let rows = res.data.reports[0].data.rows;
    let result = [];

    try {
        rows.forEach((row) => {
            if (isNumeric(row.dimensions[0])) {
                let item = {};

                item.date = row.dimensions[0];
                item.value = row.metrics[0].values[0];

                result.push(item);
            }
        });
    } catch (e) {
        logger.error(e);
        return res
    }

    return result;
}

export default { basic_report, format }