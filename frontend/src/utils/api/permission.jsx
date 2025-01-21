import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/permission'
    return api.get(`${baseUrl}`, params)
}

function store(params: {teacherId: string, date: string, status: string, description: string, letter: string, accept: string}) {
    const baseUrl = '/permission'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/permission/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, teacherId: string, date: string, status: string, description: string, letter: string, accept: string}) {
    const baseUrl = `/permission/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/permission/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}