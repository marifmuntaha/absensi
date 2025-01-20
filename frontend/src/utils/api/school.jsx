import {APICore} from './APICore'

const api = new APICore()

function show(params) {
    const baseUrl = `/master/school/${params.id}`
    return api.get(`${baseUrl}`)
}
function update(params: {id: string, name: string, phone: string, address: string, email: string, image: {}}) {
    const baseUrl = `/master/school/${params.id}`
    return api.updateWithFile(`${baseUrl}`, params)
}

export {show, update}