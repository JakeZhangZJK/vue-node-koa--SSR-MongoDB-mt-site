export const actions = {
  async nuxtServerInit({
    commit
  },{req,app}) {
    const {status,data: {province,city}} = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})      
    const {status:status2, data: {menu}} = await app.$axios.get('/geo/menu')
    commit('home/setMenu',status2===200?menu:[])
  }
}
