import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/report'
    return api.get(`${baseUrl}`, params)
}

function print(params: { id: string, teacherId: string, value: string, month: string, year: string }) {
    const baseUrl = '/generate'
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

export {get, print, show, update, destroy}