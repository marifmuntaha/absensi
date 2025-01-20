import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/present'
    return api.get(`${baseUrl}`, params)
}

function store(params: { teacher_id: string, date: string, in: string, out: string, status: string, description: string, letter: string }) {
    const baseUrl = '/present'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/present/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: { id: string, teacher_id: string, date: string, in: string, out: string, status: string, description: string, letter: string }) {
    const baseUrl = `/present/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/present/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}