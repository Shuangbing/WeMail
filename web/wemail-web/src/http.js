import axios from 'axios'

const http = axios.create({
    baseURL: 'https://note.shuangbing.me'
})

export default http