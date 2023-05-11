import http_client, { type AxiosHeaders } from "axios"

const api = {
  get: async (path: string, params?: object) => {
    return await http_client.get(path, { params })
  },
  post: async (path: string, params: object, headers?: AxiosHeaders) => {
    return await http_client.post(path, params, { headers })
  },
  put: async (path: string, params: object, headers?: AxiosHeaders) => {
    return await http_client.put(path, params, { headers })
  },
  delete: async (path: string, headers?: AxiosHeaders) => {
    return await http_client.delete(path, { headers })
  },
}

export default api
