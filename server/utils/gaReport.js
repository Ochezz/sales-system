import { google } from "googleapis";
import config from "~config";
import logger from "~logger";

const client = new google.auth.JWT({
  keyFile: config.googleAnalyticsKEY_FILE,
  scopes: config.googleAnalyticsSCOPES,
});

const analyticsreporting = google.analyticsreporting({
  version: "v4",
  auth: client,
});

const getReports = async (reportsBody, format = (res) => res) => {
  var res = {};
  try {
    res = await analyticsreporting.reports.batchGet({
      requestBody: reportsBody,
    });
  } catch (Error) {
    logger.error(Error);
  }

  return format(res);
};

export { getReports };
