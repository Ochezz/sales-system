import fs from 'fs';

export const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
}

export const checkDir = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}