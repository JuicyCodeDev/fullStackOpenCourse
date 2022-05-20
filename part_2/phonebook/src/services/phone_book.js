import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => axios.get(baseURL)

const create = (newObj) => axios.post(baseURL, newObj)

export default { getAll, create }

