import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/user'
    return api.get(baseUrl, params)
}

function store(params: {name: string, username: string, password: string, email: string, role: string}) {
    const baseUrl = '/user'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/user/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, name: string, username: string, password: string, email: string, role: string}) {
    const baseUrl = `/user/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/user/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}