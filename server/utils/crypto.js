import crypto from 'crypto';

export const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });



export const createEncrypt = (plain) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plain, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ encrypt: key.toString('base64'), salt });
        });
    });

export const compareEncrypt = (plain, salt) => 
    new Promise(async (resolve, reject) => {   
        crypto.pbkdf2(plain, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });