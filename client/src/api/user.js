import axios from 'axios'

export const userList = async (req) => {
    let response

    try {
        let params = {}
        if ('id' in req) {
            params.id = req.id
        }
        else {
            req.userName !== undefined ? params.userName = req.userName : undefined
            req.userPhone !== undefined ? params.userPhone = req.userPhone : undefined
        }
        response = await axios.get(`/api/user/`, {
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

export const userRegist = async (req) => {
    let response

    try {
        const data = {
            user: {
                id: req.id,
                password: req.password,
                ips: req.ip,
                profile: req.profile,
                name: req.name,
                phone: req.phone,
                officePhone: req.officePhone,
                rank: req.rank,
                email: req.email,
                memo: req.memo
            }
        }
        response = await axios.post(`/api/user/`, data, {
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

export const userUpdate = async (req) => {
    let response

    try {
        const data = {
            user: {
                id: req.id,
                password: req.password,
                ips: req.ip,
                profile: req.profile,
                name: req.name,
                phone: req.phone,
                officePhone: req.officePhone,
                rank: req.rank,
                email: req.email,
                memo: req.memo
            }
        }
        console.log(data)
        response = await axios.put(`/api/user/`, data, {
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

export const userDelete = async (req) => {
    let response

    try {
        response = await axios.delete(`/api/user/`, {
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

export const csvDownload = async (req) => {
    let response

    try {
        const params = {
            userName: req.userName,
            userPhone: req.userPhone
        }
        response = await axios.get(`/api/user/csvDownload/`, {
            headers: {
                'Authorization': `Bearer ${req.accessToken}`
            },
            params,
            responseType: 'blob'
        })

        // excel download
        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }))
        const link = document.createElement('a')
        link.href = url
        const fileName = response.headers['content-disposition'].substring(response.headers['content-disposition'].lastIndexOf('=') + 1)
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link)
    } catch (error) {
        response = error
    }

    return response
}