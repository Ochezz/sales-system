import config from "~config";
import logger from "~logger";
import { round, tohmsString } from "~utils/convert.js";

const basic_report = (range) => {
    return {
        reportRequests: [
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [
                    { expression: "ga:pageviews" },                 // 페이지뷰 수
                    { expression: "ga:uniquePageviews" },           // 순 페이지뷰 수
                    { expression: "ga:avgTimeOnPage" },             // 평균 페이지 머문 시간
                    { expression: "ga:sessions" },                  // 방문수
                    { expression: "ga:bounceRate" },                // 이탈률
                    { expression: "ga:exitRate" },                  // 종료율
                    { expression: "ga:pageValue" },                 // 페이지 값
                ],
                orderBys: [{ fieldName: "ga:pageviews", sortOrder: "DESCENDING" }],
                includeEmptyRows: "true",
            },
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [
                    { expression: "ga:pageviews" },                 // 페이지뷰 수
                    { expression: "ga:uniquePageviews" },           // 순 페이지뷰 수
                    { expression: "ga:avgTimeOnPage" },             // 평균 페이지 머문 시간
                    { expression: "ga:sessions" },                  // 방문수
                    { expression: "ga:bounceRate" },                // 이탈률
                    { expression: "ga:exitRate" },                  // 종료율
                    { expression: "ga:pageValue" },                 // 페이지 값
                ],
                dimensions: [{ name: "ga:pagePathLevel1" }],
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
                orderBys: [{ fieldName: "ga:pageviews", sortOrder: "DESCENDING" }],
                includeEmptyRows: "true",
            },
        ],
    };
}

const format = (res) => {
    
    let result = {};
    try {
        let rows = res.data.reports[1].data.rows;
        let ttfAll = res.data.reports[0].data.totals[0]         // total from all
        let ttfCondition = res.data.reports[1].data.totals[0]   // total from condition

        result.summary = {
            pageViews : ttfCondition.values[0],
            pageViewsAll : ttfAll.values[0],
            pageViewsRemark : round(ttfCondition.values[0] / ttfAll.values[0] * 100, 2),

            uniquePageviews : ttfCondition.values[1],
            uniquePageviewsAll : ttfAll.values[1],
            uniquePageviewsRemark : round(ttfCondition.values[1] / ttfAll.values[1] * 100, 2),

            avgTimeOnPage : tohmsString(ttfCondition.values[2]),
            avgTimeOnPageAll : tohmsString(ttfAll.values[2]),
            avgTimeOnPageRemark : round(ttfCondition.values[2] / ttfAll.values[2] * 100, 2),

            sessions : ttfCondition.values[3],
            sessionsAll : ttfAll.values[3],
            sessionsRemark : round(ttfCondition.values[3] / ttfAll.values[3] * 100, 2),

            bounceRate : round(ttfCondition.values[4], 2),
            bounceRateAll : round(ttfAll.values[4], 2),
            bounceRateRemark : round(ttfCondition.values[4] - ttfAll.values[4], 2),
            
            exitRate : round(ttfCondition.values[5], 2),
            exitRateAll : round(ttfAll.values[5], 2),
            exitRateRemark : round(ttfCondition.values[5] - ttfAll.values[5], 2),

            pageValue : round(ttfCondition.values[6]),
            pageValueAll : round(ttfAll.values[6]),
            pageValueRemark : round(ttfCondition.values[6] / ttfAll.values[6] * 100, 2),
        }
        
        let items = [];

        rows.forEach((row) => {
            let item = {};

            item.page = row.dimensions[0];
            item.pageViews = row.metrics[0].values[0];
            item.pageViewsRemark = round(row.metrics[0].values[0] / ttfCondition.values[0] * 100, 2);
            item.uniquePageviews = row.metrics[0].values[1];
            item.uniquePageviewsRemark = round(row.metrics[0].values[1] / ttfCondition.values[1] * 100, 2);
            item.avgTimeOnPage = tohmsString(row.metrics[0].values[2]);
            item.session = row.metrics[0].values[3];
            item.sessionRemark = round(row.metrics[0].values[3] / ttfCondition.values[3] * 100, 2);
            item.bounceRate = round(row.metrics[0].values[4], 2);
            item.exitRate = round(row.metrics[0].values[5], 2);
            item.pageValue = round(row.metrics[0].values[6]);
            item.pageValueRemark = round(row.metrics[0].values[6] / ttfCondition.values[6] * 100, 2);

            items.push(item);
        });

    result.data = items;
    } catch (e) {
        logger.error(e);
        return res
    }

    return result;
}

export default { basic_report, format }