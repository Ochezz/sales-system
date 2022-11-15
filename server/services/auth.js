import config from '~config';
import jwt from 'jsonwebtoken';
import { CustomError } from "~utils/CustomError.js";
import { User } from "~models/user.js";
import logger from '~logger';
import { Ip } from '~models/ip.js';

export class AuthService {

    constructor(){
        this.user = new User();
        this.ip = new Ip();
    }

    // 로그인 시 사용자 정보를 조회하고 Token을 생성한다.
    async SignIn(_id, password, adress) {
        // Block 상태 확인
        if(await this.ip.checkBlocking(_id, adress)){
            throw new CustomError('Invaild Access IP', 401, 'this ip was temporarily blocked');
        } 

        const authorizedUser = await this.user.signIn(_id, password);
        if(!authorizedUser.id) {
            // Block count
            await this.ip.count(_id, adress);
            throw new CustomError('Invaild Parameter Error', 401, 'User not found');
        }
        // Block reset
        await this.ip.reset(_id, adress);

        // Access Token, Refresh Token 발급
        const { id, name, profile } = authorizedUser;
        const accessToken = await authorizedUser.generateAccessToken();
        const refreshToken = await authorizedUser.generateRefreshToken();

        return { id, name, profile, accessToken, refreshToken };
    }

    // Refresh Token을 이용하여 Access Token 재발급한다.
    async reissueAccessToken(refreshToken) {
        let decodeSuccess = true;
        let decodeRefreshToken = '';
        try {
            decodeRefreshToken = await jwt.verify(
                refreshToken,
                config.jwtSecretKey
            );
            const user = await this.user.findById(decodeRefreshToken.id);
            if(!user) throw new CustomError('InvaildParameterError', 401, 'User not found');
            const id = user.id;
            const nickName = user.name;
            const accessToken = await user.generateAccessToken();
            return { decodeSuccess, id, nickName, accessToken };
        } 
        catch(err) {
            decodeSuccess = false;
            return { decodeSuccess };
        }
    }
}