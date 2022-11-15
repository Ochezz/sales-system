import logger from '~logger';

const getRange = (range) => {
    let today = new Date();
    
    let daterange = {
        'standard' : {'start': today.toGAFormat(), 'end': today.toGAFormat()}
    }

    switch (range) {
        case '7':
            daterange.standard.start = today.toGAFormat(6);
            daterange.standard.end = today.toGAFormat();
            break;
        case '28':
            daterange.standard.start = today.toGAFormat(27);
            daterange.standard.end = today.toGAFormat();
            break;
        default:
            break;
    }

    return daterange;
}

const getUserRange = (range) => {
    let today = new Date();

    let daterange = {
        'dimensions' : 'ga:dateHour',
        'standard' : {'start': today.toGAFormat(), 'end': today.toGAFormat()}
    }

    switch (range) {
        case '7':
            daterange.dimensions = 'ga:date'
            daterange.standard.start = today.toGAFormat(6);
            daterange.standard.end = today.toGAFormat();
            break;
        case '28':
            daterange.dimensions = 'ga:date'
            daterange.standard.start = today.toGAFormat(27);
            daterange.standard.end = today.toGAFormat();
            break;
        default:
            break;
    }

    return daterange;
}

const getDeviceRange = (range) => {
    let today = new Date();

    let daterange = {
        'standard' : {'start': today.toGAFormat(), 'end': today.toGAFormat()},
        'control' : {'start': today.toGAFormat(1), 'end': today.toGAFormat(1)}
    }

    switch (range) {
        case '7':
            daterange.standard.start = today.toGAFormat(6);
            daterange.standard.end = today.toGAFormat();
            daterange.control.start = today.toGAFormat(13);
            daterange.control.end = today.toGAFormat(7);
            break;
        case '28':
            daterange.standard.start = today.toGAFormat(27);
            daterange.standard.end = today.toGAFormat();
            daterange.control.start = today.toGAFormat(55);
            daterange.control.end = today.toGAFormat(28);
            break;
        default:
            break;
    }

    return daterange;
}

export { getRange, getUserRange, getDeviceRange };