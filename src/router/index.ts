import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '首页',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/ref',
    name: 'ref',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ref/index.vue'),
    meta: {
      title: 'ref 全家桶',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/reactive',
    name: 'reactive',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/reactive/index.vue'),
    meta: {
      title: 'reactive 全家桶',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/toRef',
    name: 'toRef',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/toRef/index.vue'),
    meta: {
      title: 'toRef 全家桶',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/watch',
    name: 'watch',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/watch/index.vue'),
    meta: {
      title: 'watch 全家桶',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/watcheffect',
    name: 'watcheffect',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/watcheffect/index.vue'),
    meta: {
      title: 'watcheffect 全家桶',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/defineEmits',
    name: 'defineEmits',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/defineEmits/index.vue'),
    meta: {
      title: 'defineEmits 全家桶',
      showTab: true,
      keepAlive: true
    }
  },
  {
    path: '/defineEmitsParent',
    name: 'defineEmitsParent',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/defineEmitsParent/index.vue'),
    meta: {
      title: 'defineEmitsParent 全家桶',
      showTab: true,
      keepAlive: true
    }
  },
  // {
  //   path: '/signin',
  //   name: 'Signin',
  //   component: () => import('../views/login/signin.vue'),
  //   meta: {
  //     title: '登录'
  //   }
  // },
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: () => import('../views/login/signup.vue'),
  //   meta: {
  //     title: '注册'
  //   }
  // },
  // {
  //   path: '/power',
  //   name: 'Power',
  //   component: () => import('../views/power/index.vue'),
  //   meta: {
  //     title: '扩展功能',
  //     showTab: true
  //   }
  // },
  // {
  //   path: '/power/svg-icon',
  //   name: 'SvgIcon',
  //   component: () => import('../views/power/demo/svgicon.vue'),
  //   meta: {
  //     title: '图标组件'
  //   }
  // },
  // {
  //   path: '/user',
  //   name: 'User',
  //   component: () => import('../views/user/index.vue'),
  //   meta: {
  //     title: '个人中心',
  //     showTab: true
  //   }
  // },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHistory('/activityCenter/'),
  routes
})

export default router
