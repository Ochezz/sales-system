import axios from 'axios'

export const list = async (req) => {
    let response

    try {
        let params = {}
        if ('title' in req) {
            params.title = req.title
        }
        if ('id' in req) {
            params.id = req.id
        }
        response = await axios.get(`/api/popup/`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            },
            params
        })
    } catch (error) {
        response = error
    }

    return response
}

export const popupRegist = async (req) => {
    let response

    try {
        response = await axios.post(`/api/popup/`, req.formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const popupUpdate = async (req) => {
    let response

    try {
        response = await axios.put(`/api/popup/`, req.formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${req.accessToken}`
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const popupDelete = async (req) => {
    let response

    try {
        response = await axios.delete(`/api/popup/`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            },
            data: {
                id: req.id
            }
        })
    } catch (error) {
        response = error
    }

    return response
}