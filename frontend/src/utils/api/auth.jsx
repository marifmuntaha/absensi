import {APICore} from './APICore'

const api = new APICore()

function login(params: { username: string; password: string }) {
    const baseUrl = '/auth/login/'
    return api.create(`${baseUrl}`, params)
}

function logout(params) {
    const baseUrl = '/auth/logout'
    return api.create(`${baseUrl}`, params)
}

function forgotPassword(params: { username: string }) {
    const baseUrl = '/forgot-password/'
    return api.create(`${baseUrl}`, params)
}

export {login, logout, forgotPassword}