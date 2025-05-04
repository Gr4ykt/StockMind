import {TOKEN_SECRET, EXPIRE_TIME} from "../config.js"
import jwt from 'jsonwebtoken'

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn:EXPIRE_TIME },
            (err, token) => {
                if (err, token)
                resolve(token)
            }
        );
    });
}