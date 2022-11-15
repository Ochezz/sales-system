import config from "~config";
import { utmChannelMap } from "~utils/utmChannel.js";
import { round } from "~utils/convert.js";
import logger from "~logger";

const basic_report = (range) => {
  return {
    reportRequests: [
      {
        viewId: config.googleAnalyticsVIEW,
        dateRanges: [
          { startDate: range.standard.start, endDate: range.standard.end },
        ],
        metrics: [{ expression: "ga:users" }],
        dimensions: [{ name: "ga:sourceMedium" }],
        orderBys: [{ fieldName: "ga:users", sortOrder: "DESCENDING" }],
        includeEmptyRows: "true",
      },
      {
        viewId: config.googleAnalyticsVIEW,
        dateRanges: [
          { startDate: range.standard.start, endDate: range.standard.end },
        ],
        metrics: [{ expression: "ga:users" }],
        orderBys: [{ fieldName: "ga:users", sortOrder: "DESCENDING" }],
        includeEmptyRows: "true",
      },
    ],
  };
};

const format = async (res) => {
  let rows = res.data.reports[0].data.rows;
  let chgtotal = res.data.reports[0].data.totals[0].values[0];
  let total = res.data.reports[1].data.totals[0].values[0];

  let result = {};
  result.total = total;
  result.rate = round((chgtotal / total) * 100, 2);
  result.data = await utmChannelMap(rows, (findIdx, item, value) => {
    try {
      let usercnt = value.metrics[0].values[0];
      item.count = usercnt;
      item.rate = round((usercnt / chgtotal) * 100, 2);
    } catch (e) {
      logger.error(e);
    }
    return item;
  });

  return result;
};

export default { basic_report, format };
