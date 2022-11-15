export default {
    numberWithCommas (value) {
        // 3자리마다 , 표시
        if (value >= 1000) {
            value = value.toString()
            value = value.split(/(?=(?:...)*$)/)
            value = value.join(',')
        }

        return value
    },
    changeDateFormat (value) {
        // date format change (yyyy-mm-dd)
        let dd = value.getDate()
        let mm = value.getMonth() + 1
        let yyyy = value.getFullYear()

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        let date = yyyy + '-' + mm + '-' + dd

        return date
    },
    emptyCheckString (value) {
        // String data empty Check

        return value === undefined ? '' : value
    },
    emptyCheckInt (value) {
        // int data empty Check

        return value === undefined ? 0 : this.numberWithCommas(value)
    },
    emptyCheckTime (value) {
        // time data empty Check

        return value === undefined ? '00:00:00' : value
    },
    emptyCheckPer (value) {
        // per data empty Check
        if (value === undefined || value === 'NaN' || value === '0') {
            return '0.00%'
        }
        else {
            return parseFloat(Math.round(value * 100) / 100).toFixed(2) + '%'
        }
    },
    emptyCheckMoney (value) {
        // per data empty Check

        return value === undefined ? '￦0' : '￦' + this.numberWithCommas(parseInt(value))
    },
    addTextRate (value) {
        // add text rate

        return '전체 대비 비율(%):' + value
    },
    addTextHits (value) {
        // add text hits

        return '평균 조회:' + value
    },
    addTextparentheses (value) {
        // add text parentheses

        return '(' + value + ')'
    },
    changeDateTimeFormat (value) {
        // date format change (yyyy-mm-dd hh:MM:ss)
        let dd = value.getDate()
        let mm = value.getMonth() + 1
        let yyyy = value.getFullYear()
        let hh = value.getHours()
        let MM = value.getMinutes()
        let ss = value.getSeconds()

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (hh < 10) {
            hh = '0' + hh
        }
        if (MM < 10) {
            MM = '0' + MM
        }
        if (ss < 10) {
            ss = '0' + ss
        }

        let date = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss

        return date
    },
    changeHourMinFormat (value) {
        // input data : 'hh:MM:ss'
        // date format change (hh:MM)

        let time = value.substring(0, 5)

        return time
    },
    isCheckElementIntValue (ele) {
        // input data : Array data
        // return : int value
        const element = ele
        let flag = 0
        if (element.length !== 0) {
            element.forEach((node) => {
              if (node.checked) {
                flag = parseInt(node.value)
              }
            })
        }

        return flag
    },
    isCheckElementStrValue (ele) {
        // input data : Array data
        // return : string value
        const element = ele
        let flag = 0
        if (element.length !== 0) {
            element.forEach((node) => {
              if (node.checked) {
                flag = node.value
              }
            })
        }

        return flag
    },
    inNumber (event) {
        // input data : event
        // return : boolean
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.returnValue = false
        }
    },
    changeDeviceName (device) {
        // input data : string
        // return : string
        let returnValue = ''
        if (device === 'Moblie') {
            returnValue = '모바일'
        }
        else if (device === 'tablet') {
            returnValue = '태블릿'
        }
        else if (device === 'PC') {
            returnValue = 'PC'
        }

        return returnValue
    },
    changePhoneFormat (value) {
        // input data : string
        // return : string
         return value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
    },
    changeProfileName (profile) {
        // input data : number
        // return : string
        let returnValue = ''
        if (profile === 0) {
            returnValue = '최고관리자'
        }
        else if (profile === 1) {
            returnValue = '사이트관리자'
        }

        return returnValue
    }
}
