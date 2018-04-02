import Home from '@pages/Home.vue'
import ContractSource from '@pages/ContractSource.vue'
import Error404 from '@pages/Error404.vue'

export default [
  { path: '/', component: Home },
  { path: '/contract', component: ContractSource, name: 'contractSource' },
  { path: '/faq', component: ContractSource, name: 'faq' },

  { // Always leave this as last one
    path: '*', component: Error404,
  },
]
