import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/signature'
    return api.get(`${baseUrl}`, params)
}

function store(params: {commonName: string, email: string, countryName: string, localityName: string, organizationName: string, password: string, active: boolean}) {
    const baseUrl = '/signature'
    return api.createWithFile(baseUrl, params)
}

function show(params) {
    const baseUrl = `/signature/${params.id}`
    return api.get(`${baseUrl}`)
}

function destroy(params) {
    const baseUrl = `/signature/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, destroy}