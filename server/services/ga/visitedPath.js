import config from "~config";
import logger from "~logger";

const basic_report = (range) => {
    return {
        reportRequests: [
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [{ 'expression': 'ga:pageviews' }],
                dimensions: [{ 'name': 'ga:pagePathLevel1' }],
                orderBys: [
                    { "fieldName": 'ga:pageviews', "sortOrder": 'DESCENDING' },
                ],
                includeEmptyRows: "true",
            },
        ],
    };
}

const format = (res) => {
    let rows = res.data.reports[0].data.rows;
    let total = res.data.reports[0].data.totals[0].values[0];
    let result = {};
    result.columns = ['콘텐츠', '페이지뷰'];
    let items = [];
    var count = 0;
    try {

        for (let i = 0; i < 5; i++) {
            let row = rows[i];
            let item = {};

            item.path = row.dimensions[0];
            item.value = row.metrics[0].values[0];
            count += Number(item.value)
            items.push(item);
        }

        result.data = items;

    } catch (e) {
        logger.error(e);
        return res
    }

    return result;
}

export default { basic_report, format }