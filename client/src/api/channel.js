import axios from 'axios'

export const list = async (req) => {
    let response

    try {
        response = await axios.get(`/api/channel/`, {
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

export const channelUpdate = async (req) => {
    let response

    try {
        const data = {
            id: req.id,
            name: req.name,
            url: req.url,
            description: req.description
        }
        response = await axios.put(`/api/channel/`, data, {
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

export const channelDelete = async (req) => {
    let response

    try {
        const data = {
            id: req.id
        }
        response = await axios.delete(`/api/channel/`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            },
            data
        })
    } catch (error) {
        response = error
    }

    return response
}

export const channelCreate = async (req) => {
    let response

    try {
        const data = {
            name: req.name,
            url: req.url,
            description: req.description
        }
        response = await axios.post(`/api/channel/`, data, {
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