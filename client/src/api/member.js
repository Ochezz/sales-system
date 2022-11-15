import axios from 'axios'

export const tdreg = async (req) => {
    let response

    try {
        response = await axios.get(`/api/memb/tdreg/`, {
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
        response = await axios.get(`/api/memb/location/`, {
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

export const age = async (req) => {
    let response

    try {
        response = await axios.get(`/api/memb/age/`, {
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

export const list = async (req) => {
    let response

    try {
        const params = {
            name: req.name,
            phone: req.phone
        }
        response = await axios.get(`/api/memb/list/`, {
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

export const infoUpdate = async (req) => {
    let response

    try {
        const data = {
            id: req.id,
            name: req.name,
            phone: req.phone,
            ageGroup: req.ageGroup,
            zipCode: req.zipCode,
            address1: req.address1,
            address2: req.address2,
            email: req.email,
            useMarketting: req.useMarketting
        }
        response = await axios.put(`/api/memb/`, data, {
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

export const infoDelete = async (req) => {
    let response

    try {
        response = await axios.delete(`/api/memb/`, {
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