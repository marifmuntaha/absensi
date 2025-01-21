import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/teacher'
    return api.get(baseUrl, params)
}

function store(params: {user_id: string, name: string, nip: string, nuptk: string, gender: string, phone: string, address: string, image: string}) {
    const baseUrl = '/teacher'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/teacher/${params}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, user_id: string, name: string, nip: string, nuptk: string, gender: string, phone: string, address: string, image: string}) {
    const baseUrl = `/teacher/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/teacher/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}