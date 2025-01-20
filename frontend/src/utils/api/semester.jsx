import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/master/semester'
    return api.get(`${baseUrl}`, params)
}

function store(params: {year_id: string, name: string, start: string, end: string, active: string}) {
    const baseUrl = '/master/semester'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/master/semester/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, year_id: string, name: string, start: string, end: string, active: string}) {
    const baseUrl = `/master/semester/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/master/semester/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}