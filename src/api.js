import axios from 'axios'
import { getUrl, getKey } from './helper'

export default axios.create({
    baseURL: getUrl.baseApi,
    headers: {
        'apiKey': getKey.apiKey
    }
    // baseURL:process.env.REACT_APP_BASE_API
})