import { asyncErrorWrapper } from "~utils/asyncErrorWrapper.js";

const administerOnly = asyncErrorWrapper(async function (req, res, next) {
  req.administerOnly = true;
  next();
});

export { administerOnly };
