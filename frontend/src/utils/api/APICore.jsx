import axios from 'axios'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        let message

        if (error && error.response && error.response.status === 404) {
            message = 'Maaf! data yang anda cari tidak ditemukan'
        } else if (error && error.response && error.response.status === 403) {
            message = 'Anda tidak memiliki akses ke halaman tersebut'
        } else {
            switch (error.response.status) {
                case 401:
                    message = 'Nama Pengguna atau sandi salah'
                    break
                case 403:
                    message = 'Anda tidak memiliki akses ke halaman tersebut'
                    break
                case 404:
                    message = 'Maaf! data yang anda cari tidak ditemukan'
                    break
                default: {
                    message = error.response && error.response.data ? error.response.data['message'] : error.message || error
                }
            }
        }
        return Promise.reject(message)
    }
)

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    else delete axios.defaults.headers.common['Authorization']
}

const getUserFromCookie = () => {
    const user = localStorage.getItem('user')
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
}

class APICore {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let response
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
            response = axios.get(`${url}?${queryString}`, params)
        } else {
            response = axios.get(`${url}`, params)
        }
        return response
    }

    getFile = (url, params) => {
        let response
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
            response = axios.get(`${url}?${queryString}`, {responseType: 'blob'})
        } else {
            response = axios.get(`${url}`, {responseType: 'blob'})
        }
        return response
    }

    getMultiple = (urls, params) => {
        const reqs = []
        let queryString = ''
        if (params) {
            queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`))
        }
        return axios.all(reqs)
    }

    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data)
    }

    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(url, data)
    }

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(url, data)
    }

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(url)
    }

    /**
     * post given data to url with file
     */
    createWithFile = (url, data) => {
        const formData = new FormData()
        for (const k in data) {
            formData.append(k, data[k])
        }

        const config = {
            headers: {
                ...axios.defaults.headers.common,
                'content-type': 'multipart/form-data',
            },
        }
        return axios.post(url, formData, config)
    }

    /**
     * post given data to url with file
     */
    updateWithFile = (url, data) => {
        const formData = new FormData()
        for (const k in data) {
            formData.append(k, data[k])
        }

        const config = {
            headers: {
                ...axios.defaults.headers.common,
                'content-type': 'multipart/form-data',
            },
        }
        return axios.put(url, formData, config)
    }

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser()
        if (!user) {
            return false
        }
        const decoded = new Date(user.expired)
        const currentTime = new Date()
        if (decoded < currentTime) {
            console.warn('access token expired')
            return false
        } else {
            return true
        }
    }

    setLoggedInUser = (session) => {
        session
            ? localStorage.setItem('user', JSON.stringify(session))
            : localStorage.removeItem('user')
    }
    /**
     * Returns the logged-in user
     */
    getLoggedInUser = () => {
        return getUserFromCookie();
    }

    setUserInSession = (modifiedUser) => {
        const userInfo = localStorage.getItem('user')
        if (userInfo) {
            const {token, user} = JSON.parse(userInfo)
            this.setLoggedInUser({token, ...user, ...modifiedUser})
        }
    }
}

/*
Check if token available in session
*/
const user = getUserFromCookie()
if (user) {
    const {token} = user
    if (token) {
        setAuthorization(token)
    }
}

export {APICore, setAuthorization}