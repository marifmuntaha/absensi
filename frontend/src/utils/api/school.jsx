import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/master/school'
    return api.get(`${baseUrl}`, params)
}

function store() {
    const baseUrl = '/master/school/'
    return api.create(`${baseUrl}`, {})
}

function show(params) {
    const baseUrl = `/master/school/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, name: string, phone: string, address: string, email: string, image: {}}) {
    const baseUrl = `/master/school/${params.id}`
    return api.updateWithFile(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/master/school/${params.id}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}