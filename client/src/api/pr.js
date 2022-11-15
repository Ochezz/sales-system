import axios from 'axios'

export const list = async (req) => {
    let response

    try {
        let params = {
            title: req.title
        }
        response = await axios.get(`/api/pr/`, {
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

export const pressRegist = async (req) => {
    let response

    try {
        response = await axios.post(`/api/pr/`, req.formData, {
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

export const pressUpdate = async (req) => {
    let response

    try {
        response = await axios.put(`/api/pr/`, req.formData, {
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

export const pressDelete = async (req) => {
    let response

    try {
        response = await axios.delete(`/api/pr/`, {
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