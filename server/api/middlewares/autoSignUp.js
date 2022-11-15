import { User } from '~models/User.js';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import logger from '~logger';

// 로그인 시 회원가입 여부를 판단한다.
// loginSuccess
// true: 로그인 완료
// false: 로그인 실패. 회원 가입 필요.
const autoSignUp = asyncErrorWrapper(async (req, res, next) => {
    const userData = new User();
    const user = await userData.checkId(req.body.id);

    logger.debug(JSON.stringify(user))
    if(!user.duplicated) {
        return res.status(200).json({
            loginSuccess: false,
            message : '회원 가입을 진행해야 합니다.'
        });
    } else {
        req.user = {
            salt: user.salt
        }
        next();
    }
});

export { autoSignUp }