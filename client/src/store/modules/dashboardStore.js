import * as API from '../../api/ga'
import * as APIM from '../../api/member'
import * as COMMON from '../../common/globalFunction'

const dashboardStore = {
    namespaced: true,
    state: {
        users: '',
        sessions: '',
        avgSessionDuration: '',
        tdReg: '',
        activeUserData: {
            labels: [],
            series: []
        },
        deviceData: {
            labels: [],
            series: [],
            devices: []
        },
        locationData: {
            columns: [],
            data: []
        },
        visitedPathData: {
            columns: [],
            data: []
        },
        mLocationData: {
            labels: [],
            series: []
        },
        mAgeData: {
            labels: [],
            series: []
        },
        channelData: {
            labels: [],
            series: []
        }
    },
    getters: {
        getUsers (state) {
            return state.users
        },
        getSessions (state) {
            return state.sessions
        },
        getAvgSessionDuration (state) {
            return state.avgSessionDuration
        },
        getActiveUserData (state) {
            return state.activeUserData
        },
        getDeviceData (state) {
            return state.deviceData
        },
        getLocationData (state) {
            return state.locationData
        },
        getVisitedPathData (state) {
            return state.visitedPathData
        },
        getTdRegData (state) {
            return state.tdReg
        },
        getMLocationData (state) {
            return state.mLocationData
        },
        getMAgeData (state) {
            return state.mAgeData
        },
        getChannelData (state) {
            return state.channelData
        }
    },
    mutations: {
        setInfo (state, payload) {
            if (Object.keys(payload).length !== 0) {
                state.users = COMMON.default.numberWithCommas(Object.values(payload)[0])
                state.sessions = COMMON.default.numberWithCommas(Object.values(payload)[1])
                state.avgSessionDuration = Object.values(payload)[2]
            }
        },
        setActiveUserData (state, payload) {
            let tmpLabels = []
            let tmpSeries = []
            let series = []

            if (Object.keys(payload).length !== 0) {
                payload.forEach(element => {
                    let dateStr = Object.values(element)[0]
                    let month = dateStr.substr(4, 2).replace(/(^0+)/, '')
                    let day = dateStr.substr(6, 2).replace(/(^0+)/, '')

                    tmpLabels.push(month + '월' + day + '일')
                    tmpSeries.push(Object.values(element)[1])
                })

                state.activeUserData.labels = tmpLabels
                series.push(tmpSeries)
                state.activeUserData.series = series
            }
        },
        setDeviceData (state, payload) {
            let tmpDevices = []
            let tmpLabels = []
            let tmpSeries = []

            if (Object.keys(payload).length !== 0) {
                payload.forEach(element => {
                    let tmpObj = {meta: '', value: ''}

                    tmpDevices.push(Object.values(element)[0])
                    tmpLabels.push(Object.values(element)[1])

                    if (Object.values(element)[0] === 'desktop') {
                        tmpObj.meta = '데스크톱'
                    }
                    else if (Object.values(element)[0] === 'mobile') {
                        tmpObj.meta = '모바일'
                    }
                    else if (Object.values(element)[0] === 'tablet') {
                        tmpObj.meta = '태블릿'
                    }
                    tmpObj.value = Object.values(element)[1]
                    tmpSeries.push(tmpObj)
                })

                state.deviceData.devices = tmpDevices
                state.deviceData.labels = tmpLabels
                state.deviceData.series = tmpSeries
            }
        },
        setLocationData (state, payload) {
            let tmpDatas = []

            if (Object.keys(payload).length !== 0) {
                // 내림차순 정렬
                payload.data.sort((a, b) => b.use - a.use)

                // 5건표시
                payload.data.forEach((element, index) => {
                    if (index < 5) {
                        let tmpArr = []

                        tmpArr.push(index + 1)
                        tmpArr.push(Object.values(element)[1])
                        tmpArr.push(COMMON.default.numberWithCommas(Object.values(element)[2]))
                        tmpDatas.push(tmpArr)
                    }
                    else {
                        return
                    }
                })

                state.locationData.columns = payload.colunms
                state.locationData.data = tmpDatas
            }
        },
        setVisitedPathData (state, payload) {
            let tmpDatas = []

            if (Object.keys(payload).length !== 0) {
                payload.data.sort((a, b) => b.value - a.value)

                // 5건표시
                payload.data.forEach((element, index) => {
                    if (index < 5) {
                        if (element.value === undefined) {
                            element.value = 0
                        }

                        element.value = COMMON.default.numberWithCommas(element.value)
                        tmpDatas.push(Object.values(element))
                    }
                    else {
                        return
                    }
                })

                state.visitedPathData.columns = payload.columns
                state.visitedPathData.data = tmpDatas
            }
        },
        setTdRegData (state, payload) {
            if (Object.keys(payload).length !== 0) {
                let total = COMMON.default.numberWithCommas(Object.values(payload)[0])
                let today = COMMON.default.numberWithCommas(Object.values(payload)[1])

                state.tdReg = today + '명 / ' + total + '명'
            }
            else {
                state.tdReg = '명 / 명'
            }
        },
        setMLocationData (state, payload) {
            let tmpLabels = []
            let tmpSeries = []

            if (Object.keys(payload).length !== 0) {
                payload.sort((a, b) => b.count - a.count)

                payload.forEach((element, index) => {
                    if (index < 6) {
                        tmpLabels.push(Object.values(element)[1])
                        if (Object.values(element)[2] === undefined) {
                            tmpSeries.push('0')
                        }
                        else {
                            tmpSeries.push(Object.values(element)[2])
                        }
                    }
                    else {
                        return
                    }
                })

                state.mLocationData.labels = tmpLabels
                state.mLocationData.series = tmpSeries
            }
        },
        setAgeData (state, payload) {
            let tmpLabels = []
            let tmpSeries = []

            if (Object.keys(payload).length !== 0) {
                payload.sort((a, b) => b.count - a.count)

                payload.forEach((element, index) => {
                    if (index < 6) {
                        tmpLabels.push(Object.values(element)[1] + '대')
                        if (Object.values(element)[0] === undefined) {
                            tmpSeries.push('0')
                        }
                        else {
                            tmpSeries.push(Object.values(element)[0])
                        }
                    }
                    else {
                        return
                    }
                })

                state.mAgeData.labels = tmpLabels
                state.mAgeData.series = tmpSeries
            }
        },
        setChannelData (state, payload) {
            let tmpLabels = []
            let tmpSeries = []

            if (Object.keys(payload).length !== 0) {
                payload.data.sort((a, b) => b.rate - a.rate)

                payload.data.forEach((element) => {
                    tmpLabels.push(element.dpName)
                    if (element.rate === undefined) {
                        tmpSeries.push('0')
                    }
                    else {
                        tmpSeries.push(element.rate)
                    }
                })

                state.channelData.labels = tmpLabels
                state.channelData.series = tmpSeries
            }
        }
    },
    actions: {
        async getInfo (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await API.info(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setInfo', res.data)
                }
            })
        },
        async getActiveUser (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await API.activeUser(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setActiveUserData', res.data)
                }
            })
        },
        async getDevice (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await API.device(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setDeviceData', res.data)
                }
            })
        },
        async getLocation (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await API.location(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setLocationData', res.data)
                }
            })
        },
        async getVisitedPath (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await API.visitedPath(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setVisitedPathData', res.data)
                }
            })
        },
        async getTdReg (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await APIM.tdreg(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setTdRegData', res.data)
                }
            })
        },
        async getMLocation (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await APIM.location(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setMLocationData', res.data)
                }
            })
        },
        async getMAge (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await APIM.age(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setAgeData', res.data)
                }
            })
        },
        async getChannel (context) {
            let reqParam = {
                accessToken: context.rootGetters['loginStore/getAccessToken']
            }
            await API.channel(reqParam).then(res => {
                if (res.message) {
                    throw res.message
                }
                else {
                    context.commit('setChannelData', res.data)
                }
            })
        }
    }
}

export default dashboardStore
