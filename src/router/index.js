import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriaView from '../views/CategoriaView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import CorView from '../views/CorView.vue'
import MarcaView from '../views/MarcaView.vue'
import AcessorioView from '../views/AcessorioView.vue'
import LayoutFull from '@/layouts/LayoutFull.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: LayoutFull,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/categorias',
          name: 'categorias',
          component: CategoriaView
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView
        },
        {
          path: '/logout',
          name: 'logout',
          component: LogoutView
        },
        {
          path: '/cor',
          name: 'cor',
          component: CorView
        },
        {
          path: '/marca',
          name: 'marca',
          component: MarcaView
        },
        {
          path: '/acessorio',
          name: 'acessorio',
          component: AcessorioView
        }
      ]
    }
  ]
})

export default router
