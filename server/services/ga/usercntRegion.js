import config from "~config";
import logger from "~logger";
import { isNumeric } from "~utils/check.js";

const basic_report = (range) => {
    return {
        reportRequests: [
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [{ expression: "ga:users" }],
                dimensions: [
                    { name: "ga:regionId" },
                    { name: "ga:region" }
                ],
                dimensionFilterClauses: [
                    {
                        filters: [
                            {
                                dimensionName: "ga:country",
                                operator: "EXACT",
                                expressions: ["South Korea"]
                            }
                        ]
                    }
                ],
                includeEmptyRows: "true",
            },
        ],
    };
}

const format = (res) => {
    let rows = res.data.reports[0].data.rows;
    let result = {};
    result.colunms = ['No', '지역', '사용자'];
    let items = [];
    try {
        rows.forEach((row) => {
            if (isNumeric(row.dimensions[0])) {
                let item = {};

                item.id = row.dimensions[0];
                item.city = row.dimensions[1];
                item.use = row.metrics[0].values[0];

                items.push(item);
            }
        });

    result.data = items;
    } catch (e) {
        logger.error(e);
        return res
    }

    return result;
}

export default { basic_report, format }