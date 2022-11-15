import axios from 'axios'

export const signIn = async (req) => {
    let response

    try {
        const data = {
            id: req.id,
            password: req.password,
            address: req.address
        }
        response = await axios.post(`/api/auth/login/`, data, {
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch (error) {
        response = error
    }

    return response
}

export const logout = async (req) => {
    let response

    try {
        const data = {}
        response = await axios.post(`/api/auth/logout/`, data, {
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch (error) {
        response = error
    }

    return response
}