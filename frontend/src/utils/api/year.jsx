import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/master/year'
    return api.get(`${baseUrl}`, params)
}

function store(params: {name: string, description: string, active: string}) {
    const baseUrl = '/master/year'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/master/year/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, name: string, description: string, active: string}) {
    const baseUrl = `/master/year/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/master/year/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}