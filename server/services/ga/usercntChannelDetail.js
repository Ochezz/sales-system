import config from "~config";
import logger from "~logger";
import { round, tohmsString } from "~utils/convert.js";
import { utmChannelMap } from "~utils/utmChannel.js";

const basic_report = (range) => {
  return {
    reportRequests: [
      {
        viewId: config.googleAnalyticsVIEW,
        dateRanges: [
          { startDate: range.standard.start, endDate: range.standard.end },
        ],
        metrics: [
          { expression: "ga:users" }, // 사용자
          { expression: "ga:newUsers" }, // 신규 방문자
          { expression: "ga:sessions" }, // 세션
          { expression: "ga:bounceRate" }, // 이탈률
          { expression: "ga:pageviewsPerSession" }, // 세션당 페이지수
          { expression: "ga:avgSessionDuration" }, // 평균 세션 시간
          { expression: "ga:goal1ConversionRate" }, // 관심고객등록 (목표 1 전환율)
          { expression: "ga:goal1Completions" }, // 관심고객등록 (목표 1 완료 수)
          { expression: "ga:goal1Value" }, // 관심고객등록 (목표 1 가치)
        ],
        orderBys: [{ fieldName: "ga:users", sortOrder: "DESCENDING" }],
        includeEmptyRows: "true",
      },
      {
        viewId: config.googleAnalyticsVIEW,
        dateRanges: [
          { startDate: range.standard.start, endDate: range.standard.end },
        ],
        metrics: [
          { expression: "ga:users" }, // 사용자
          { expression: "ga:newUsers" }, // 신규 방문자
          { expression: "ga:sessions" }, // 세션
          { expression: "ga:bounceRate" }, // 이탈률
          { expression: "ga:pageviewsPerSession" }, // 세션당 페이지수
          { expression: "ga:avgSessionDuration" }, // 평균 세션 시간
          { expression: "ga:goal1ConversionRate" }, // 관심고객등록 (목표 1 전환율)
          { expression: "ga:goal1Completions" }, // 관심고객등록 (목표 1 완료 수)
          { expression: "ga:goal1Value" }, // 관심고객등록 (목표 1 가치)
        ],
        dimensions: [{ name: "ga:sourceMedium" }],
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
        orderBys: [{ fieldName: "ga:users", sortOrder: "DESCENDING" }],
        includeEmptyRows: "true",
      },
    ],
  };
};

const format = async (res) => {
  let result = {};

  let rows = res.data.reports[1].data.rows;
  let ttfAll = res.data.reports[0].data.totals[0]         // total from all
  let ttfCondition = res.data.reports[1].data.totals[0]   // total from condition

  result.summary = {
    user : ttfCondition.values[0],
    userAll : ttfAll.values[0],
    userRemark : round(ttfCondition.values[0] / ttfAll.values[0] * 100, 2),

    newUser : ttfCondition.values[1],
    newUserAll : ttfAll.values[1],
    newUserRemark : round(ttfCondition.values[1] / ttfAll.values[1] * 100, 2),

    session : ttfCondition.values[2],
    sessionAll : ttfAll.values[2],
    sessionRemark : round(ttfCondition.values[2] / ttfAll.values[2] * 100, 2),

    bounceRate : round(ttfCondition.values[3], 2),
    bounceRateAll : round(ttfAll.values[3], 2),
    bounceRateRemark : round(ttfCondition.values[3] - ttfAll.values[3], 2),

    pvpSession : round(ttfCondition.values[4], 2),
    pvpSessionAll : round(ttfAll.values[4], 2),
    pvpSessionRemark : round(ttfCondition.values[4] - ttfAll.values[4], 2),

    avgSession : tohmsString(ttfCondition.values[5]),
    avgSessionAll : tohmsString(ttfAll.values[5]),
    avgSessionRemark : round(ttfCondition.values[5] / ttfAll.values[5] * 100, 2),

    goal1Rate : round(ttfCondition.values[6], 2),
    goal1RateAll : round(ttfAll.values[6], 2),
    goal1RateRemark : round(ttfCondition.values[6] / ttfAll.values[6] * 100, 2),

    goal1Comp : ttfCondition.values[7],
    goal1CompAll : ttfAll.values[7],
    goal1CompRemark : round(ttfCondition.values[7] / ttfAll.values[7] * 100, 2),

    goal1Value : ttfCondition.values[8],
    goal1ValueAll : ttfAll.values[8],
    goal1ValueRemark : round(ttfCondition.values[8] / ttfAll.values[8] * 100, 2),
  };

  result.data = await utmChannelMap(
    rows,
    (findIdx, item, value) => {
      try {
        item.user = value.metrics[0].values[0];
        item.userRemark = round(value.metrics[0].values[0] / ttfCondition.values[0] * 100, 2);
        item.newUser = value.metrics[0].values[1];
        item.newUserRemark = round(value.metrics[0].values[1] / ttfCondition.values[1] * 100, 2);
        item.session = value.metrics[0].values[2];
        item.sessionRemark = round(value.metrics[0].values[2] / ttfCondition.values[2] * 100, 2);
        item.bounceRate = round(value.metrics[0].values[3], 2);
        item.pvpSession = round(value.metrics[0].values[4], 2);
        item.avgSession = tohmsString(value.metrics[0].values[5]);
        item.goal1Rate = round(value.metrics[0].values[6], 2);
        item.goal1Comp = value.metrics[0].values[7];
        item.goal1CompRemark = round(value.metrics[0].values[7] / ttfCondition.values[7] * 100, 2);
        item.goal1Value = value.metrics[0].values[8];
        item.goal1ValueRemark = round(value.metrics[0].values[8] / ttfCondition.values[8] * 100, 2);
      } catch (e) {
        logger.error(e);
      }
      return item;
    }
  );

  return result;
};

export default { basic_report, format };
