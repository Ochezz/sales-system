import config from '~config';
import jwt from 'jsonwebtoken';
import { User } from '~models/User.js';
import { asyncErrorWrapper } from '~utils/asyncErrorWrapper.js';
import { CustomError } from "~utils/CustomError.js";

// Access Token이 유효한지 확인한다.
const isAccessTokenValid = asyncErrorWrapper(async function(req, res, next) {
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        const decodedUser = await jwt.verify(token, config.jwtSecretKey);
        const userData = new User();
        const user = await userData.findById(decodedUser.idToken);

        if(!user) {
            throw new CustomError('JsonWebTokenError', 401, 'User not found');
        }else if(req.administerOnly && !user.profile.isAdmin()){
            throw new CustomError('AuthorizationError', 401, 'User is not authorized');
        }else{
            req.user = {
                    _id: user.id,
                    nickName: user.name,
                    profile: user.profile
            };
        }
        next();
      } else {
          throw new CustomError('JsonWebTokenError', 401, 'Token not found');
      }
  })
  export { isAccessTokenValid };