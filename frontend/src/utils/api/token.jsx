import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/token'
    return api.get(`${baseUrl}`, params)
}

export {get}