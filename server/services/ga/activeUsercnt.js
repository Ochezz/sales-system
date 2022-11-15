import config from "~config";
import logger from "~logger";

const basic_report = (range) => {
    return {
        reportRequests: [
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [{ 'expression': 'ga:1dayUsers' }],
                dimensions: [{ 'name': 'ga:date' }],
                includeEmptyRows: "true",
            },
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [{ 'expression': 'ga:7dayUsers' }],
                dimensions: [{ 'name': 'ga:date' }],
                includeEmptyRows: "true",
            },
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [{ 'expression': 'ga:14dayUsers' }],
                dimensions: [{ 'name': 'ga:date' }],
                includeEmptyRows: "true",
            },
            {
                viewId: config.googleAnalyticsVIEW,
                dateRanges: [{ startDate: range.standard.start, endDate: range.standard.end }],
                metrics: [{ 'expression': 'ga:28dayUsers' }],
                dimensions: [{ 'name': 'ga:date' }],
                includeEmptyRows: "true",
            },
        ]
    };
}

const format = (res) => {
    
    let result = {};
    try {
        let day1rows = res.data.reports[0].data.rows;
        let day7rows = res.data.reports[1].data.rows;
        let day14rows = res.data.reports[2].data.rows;
        let day28rows = res.data.reports[3].data.rows;
        
        result.summary = {
            day1 : [...day1rows].pop().metrics[0].values[0],
            // day1All : [...day1rows].pop().metrics[0].values[0],
            // day1Remark : '',

            day7 : [...day7rows].pop().metrics[0].values[0],
            // day7All : [...day7rows].pop().metrics[0].values[0],
            // day7Remark : '',

            day14 : [...day14rows].pop().metrics[0].values[0],
            // day14All : [...day14rows].pop().metrics[0].values[0],
            // day14Remark : '',

            day28 : [...day28rows].pop().metrics[0].values[0],
            // day28All : [...day28rows].pop().metrics[0].values[0],
            // day28Remark : ''
        };
        
        let items = [];
        
        day1rows.forEach((row, i) => {
            let item = {};

            item.date = row.dimensions[0];
            item.day1 = day1rows[i].metrics[0].values[0];
            item.day7 = day7rows[i].metrics[0].values[0];
            item.day14 = day14rows[i].metrics[0].values[0];
            item.day28 = day28rows[i].metrics[0].values[0];

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