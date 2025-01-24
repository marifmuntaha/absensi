import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/report'
    return api.get(`${baseUrl}`, params)
}

function store(params: { teacherId: string, date: string, value: string, }) {
    const baseUrl = '/report'
    return api.create(baseUrl, params)
}

function show(params) {
    const baseUrl = `/report/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, name: string, description: string, active: string}) {
    const baseUrl = `/report/${params.id}`
    return api.update(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/report/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, store, show, update, destroy}