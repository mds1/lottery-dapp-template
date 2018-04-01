import Home from '@pages/Home.vue'
import Contact from '@pages/Contact.vue'
import Error404 from '@pages/Error404.vue'

export default [
  { path: '/', component: Home },
  { path: '/contact', component: Contact },

  { // Always leave this as last one
    path: '*', component: Error404,
  },
]
