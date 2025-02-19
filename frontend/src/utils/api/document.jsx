import {APICore} from './APICore'

const api = new APICore()

function create(params) {
    const baseUrl = '/document/create'
    return api.create(baseUrl, params)
}

function signed(params) {
    const baseUrl = '/document/signed'
    return api.create(baseUrl, params)
}

export {create, signed}