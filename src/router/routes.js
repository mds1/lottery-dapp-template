import Home from '@pages/Home.vue'
import Tools from '@pages/Tools.vue'
import Contact from '@pages/Contact.vue'

export default [
  { path: '/', component: Home, },
  { path: '/tools', component: Tools },
  { path: '/contact', component: Contact },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/Error404')
  }
]
