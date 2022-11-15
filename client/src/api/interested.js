import axios from 'axios'

export const setting = async (req) => {
    let response

    try {
        response = await axios.get(`/api/interested/setting/`, {
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
            infomation: req.infomation,
            name: req.name,
            phone: req.phone,
            ageGroup: req.ageGroup,
            email: req.email,
            address: req.address,
            marketting: req.marketting
        }
        response = await axios.post(`/api/interested/setting/`, data, {
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

export const csvDownload = async (req) => {
    let response

    try {
        const params = {
            name: req.name,
            phone: req.phone
        }
        response = await axios.get(`/api/interested/csvDownload/`, {
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