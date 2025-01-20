import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/master/work'
    return api.get(`${baseUrl}`, params)
}

function store(params: {day: string, in: string, out: string}) {
    const baseUrl = '/master/work'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/master/work/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, day: string, in: string, out: string}) {
    const baseUrl = `/master/work/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/master/work/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}