import axios from 'axios'

// axios.interceptors.request.use(request => {
//     console.log('Starting Request: ', request)
//     return request
//   })

export const info = async (req) => {
    let response

    try {
        response = await axios.get(`/api/ga/info/?range=7`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const activeUser = async (req) => {
    let response

    try {
        response = await axios.get(`/api/ga/user/?range=7`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const activeUserDetail = async (req) => {
    let response

    try {
        const data = {
            start: req.start,
            end: req.end
        }
        response = await axios.post(`/api/ga/user/`, data, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const location = async (req) => {
    let response

    try {
        response = await axios.get(`/api/ga/region/?range=7`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const locationDetail = async (req) => {
    let response

    try {
        const data = {
            start: req.start,
            end: req.end
        }
        response = await axios.post(`/api/ga/region/`, data, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const device = async (req) => {
    let response

    try {
        response = await axios.get(`/api/ga/device/?range=7`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const deviceDetail = async (req) => {
    let response

    try {
        const data = {
            start: req.start,
            end: req.end
        }
        response = await axios.post(`/api/ga/device/`, data, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const visitedPath = async (req) => {
    let response

    try {
        response = await axios.get(`/api/ga/path/?range=7`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const visitedPathDetail = async (req) => {
    let response

    try {
        const data = {
            start: req.start,
            end: req.end
        }
        response = await axios.post(`/api/ga/path/`, data, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const channel = async (req) => {
    let response

    try {
        response = await axios.get(`/api/ga/channel/?range=7`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const channelDetail = async (req) => {
    let response

    try {
        const data = {
            start: req.start,
            end: req.end
        }
        response = await axios.post(`/api/ga/channel/`, data, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}