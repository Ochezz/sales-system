import jwt from "jsonwebtoken";
import config from '~config';

import logger from "~logger";

export const getAccessToken = async(id, name) => {
    return await jwt.sign(
        {
            idToken: id,
            nickName: name
        },
        config.jwtSecretKey,
        {
            expiresIn: config.acTokenExpiration,
        }
    );
}

export const getRefreshToken = async(id) => {
    return await jwt.sign(
        {
            idToken: id
        },
        config.jwtSecretKey,
        {
            expiresIn: config.rfTokenExpiration,
        }
      );
}