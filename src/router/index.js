import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Reg from '@/components/Reg'
import Login from '@/components/Login'
import Market from '@/components/Market'
import Exchange from '@/components/Exchange'
import Asset from '@/components/Asset'
import News from '@/components/News'
import Tmp from '@/components/Tmp'
import Test from '@/components/Test'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    redirect: '/news',
    children: [
      {
        path: 'market/:coinId',
        name: 'market',
        component: Market,
      },
      {
        path: '/exchange',
        name: 'exchange',
        component: Exchange,
        meta: { requireAuth: true }
      },
      {
        path: '/asset',
        name: 'asset',
        component: Asset,
        meta: { requireAuth: true }
      },
      {
        path: '/news',
        component: News,
        name: 'news'
      },
      {
        path: '/reg',
        component: Reg,
        name: 'reg'
      },
      {
        path: '/login',
        component: Login,
        name: 'login'
      }
    ]
  },
  {
    path: '/tmp',
    name: 'Tmp',
    component: Tmp
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  const logInfo = JSON.parse(localStorage.getItem('logInfo'))
  console.log(logInfo)
  next()
})

export default router

