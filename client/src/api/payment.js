import axios from 'axios'

export const list = async (req) => {
    let response

    try {
        let params = {}
        if ('id' in req) {
            params.id = req.id
        }
        else {
            req.userName !== undefined ? params.userName = req.userName : undefined
            req.userPhone !== undefined ? params.userPhone = req.userPhone : undefined
            req.startDate !== undefined ? params.startDate = req.startDate : undefined
            req.endDate !== undefined ? params.endDate = req.endDate : undefined
            req.visitTime !== undefined ? params.visitTime = req.visitTime : undefined
        }

        response = await axios.get(`/api/payment/resv/`, {
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

export const visitUpdate = async (req) => {
    let response

    try {
        const data = {
            id: req.id,
            userName: req.userName,
            userPhone: req.userPhone,
            memo: req.memo
        }
        response = await axios.put(`/api/payment/resv/`, data, {
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

export const visitDelete = async (req) => {
    let response

    try {
        response = await axios.delete(`/api/payment/resv/`, {
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

export const settingList = async (req) => {
    let response

    try {
        let params = {}
        if ('date' in req) {
            params.date = req.date
        }
        else {
            req.startDate !== undefined ? params.startDate = req.startDate : undefined
            req.endDate !== undefined ? params.endDate = req.endDate : undefined
        }

        response = await axios.get(`/api/payment/setting/`, {
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

export const settingRegist = async (req) => {
    let response

    try {
        const data = {
            startvisitDay: req.startvisitDay,
            endvisitDay: req.endvisitDay,
            items: req.items
        }
        response = await axios.post(`/api/payment/setting/`, data, {
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

export const settingUpdate = async (req) => {
    let response

    try {
        const data = {
            visitDay: req.visitDay,
            items: req.items
        }
        response = await axios.put(`/api/payment/setting/`, data, {
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

export const settingDelete = async (req) => {
    let response

    try {
        response = await axios.delete(`/api/payment/setting/`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            },
            data: {
                visitDay: req.visitDay,
                items: req.items
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
            userPhone: req.userPhone,
            startDate: req.startDate,
            endDate: req.endDate,
            visitTime: req.visitTime
        }
        response = await axios.get(`/api/payment/resv/csvDownload/`, {
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