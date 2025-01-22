import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/notification'
    return api.get(`${baseUrl}`, params)
}

function show(params) {
    const baseUrl = `/notification/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: { id: string, fromUser: string, toUser: string, type: string, status: string, message: string, read: string }){
    const baseUrl = `/notification/${params.id}`
    return api.updateWithFile(`${baseUrl}`, params)
}
function destroy(params) {
    const baseUrl = `/notification/${params}`
    return api.delete(`${baseUrl}`)
}

export {get, show, update, destroy}