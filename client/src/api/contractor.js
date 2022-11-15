import axios from 'axios'

export const contractorList = async (req) => {
    let response

    try {
        let data = {
            params: {}
        }
        if ('id' in req) {
            data.params.id = req.id
        }
        else {
            req.userName !== undefined ? data.params.userName = req.userName : undefined
            req.userPhone !== undefined ? data.params.userPhone = req.userPhone : undefined
        }

        response = await axios.get(`/api/contractor/`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${req.accessToken}`
            }
        }, data)
    } catch (error) {
        response = error
    }

    return response
}

export const contractorRegist = async (req) => {
    let response

    try {
        const data = {
            items: req.items
        }
        response = await axios.post(`/api/contractor/`, data, {
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

export const contractorUpdate = async (req) => {
    let response

    try {
        const data = {
            id: req.id,
            userName: req.userName,
            userPhone: req.userPhone,
            birthday: req.birthday,
            memo: req.memo
        }

        response = await axios.put(`/api/contractor/`, data, {
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

export const contractorDelete = async (req) => {
    let response

    try {
        response = await axios.delete(`/api/contractor/`, {
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

export const visitList = async (req) => {
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

        response = await axios.get(`/api/contractor/resv/`, {
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
            visitNum: req.visitNum,
            memo: req.memo
        }
        response = await axios.put(`/api/contractor/resv/`, data, {
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
        response = await axios.delete(`/api/contractor/resv/`, {
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

        response = await axios.get(`/api/contractor/setting/`, {
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
        response = await axios.post(`/api/contractor/setting/`, data, {
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
        response = await axios.put(`/api/contractor/setting/`, data, {
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
        response = await axios.delete(`/api/contractor/setting/`, {
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
        response = await axios.get(`/api/contractor/resv/csvDownload/`, {
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