import {APICore} from './APICore'

const api = new APICore()

function pdf(params) {
    const baseUrl = '/document/absensi'
    return api.create(baseUrl, params)
}

export {pdf}