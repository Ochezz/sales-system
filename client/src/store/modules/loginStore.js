import * as AUTH from '../../api/auth'
const loginStore = {
    namespaced: true,
    state: {
        nickName: '',
        profile: '',
        accessToken: '',
        loginSuccess: null
    },
    getters: {
        getAccessToken (state) {
            return state.accessToken
        }
    },
    mutations: {
        loginOK (state, payload) {
            state.nickName = payload.nickName
            state.profile = payload.profile
            state.accessToken = payload.accessToken
            state.loginSuccess = payload.loginSuccess
        },
        loginFail (state, payload) {
            state.loginSuccess = payload
        },
        logoutStateReset (state) {
            state.nickName = ''
            state.profile = ''
            state.accessToken = ''
            state.loginSuccess = null
        }
    },
    actions: {
        async login (context, {id, password}) {
            let reqParam = {
                id: id,
                password: password
            }

            await fetch('https://api.ipify.org?format=json')
            .then(x => x.json()).then(({ ip }) => {
                reqParam.address = ip
            })

            await AUTH.signIn(reqParam).then(res => {
                context.commit('loginOK', res.data)
            }).catch(e => {
                context.commit('loginFail', false)
            })
        }
    }
}

export default loginStore
