import axios from 'axios'
//创建一个axios实例
const instance = axios.create({
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:2000,
  headers:{

  }
})

export default instance
