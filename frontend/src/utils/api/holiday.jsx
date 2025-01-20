import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/master/holiday'
    return api.get(`${baseUrl}`, params)
}

function store(params : {year_id: string, name: string, date: string, description: string}) {
    const baseUrl = '/master/holiday'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/master/holiday/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, year_id: string, name: string, date: string, description: string}) {
    const baseUrl = `/master/holiday/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/master/holiday/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}