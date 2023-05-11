import { createRouter, createWebHistory } from "vue-router"
import AppLayout from "@/layout/AppLayout.vue"
import tokenService from "@/services/users/token"
import usersRouter from "@/views/Users/UsersRoute"
import profilesRouter from "@/views/Profiles/ProfilesRoute"
import rolsRouter from "@/views/Rols/rolsRouter"
import modulesRouter from "@/views/Modules/modulesRouter"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
          meta: { requireAuth: true },
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/Common/AboutView.vue"),
          meta: { requireAuth: false },
        },
        ...usersRouter,
        ...profilesRouter,
        ...rolsRouter,
        ...modulesRouter,
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Auth/LoginView.vue"),
      meta: { requireAuth: false, onlyLogout: true },
    },
    {
      path: "/password",
      name: "password",
      children: [
        {
          path: "reset",
          name: "resetPassword",
          component: () => import("@/views/Auth/ResetPassword.vue"),
        },
        {
          path: "create",
          name: "createPassword",
          component: () => import("@/views/Auth/CreatePassword.vue"),
        },
      ],
      meta: { requireAuth: false, onlyLogout: true },
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: () => import("@/views/Common/BadRequest.vue"),
      meta: { requireAuth: false, onlyLogout: false },
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: () => import("@/views/Common/NotFound.vue"),
      meta: { requireAuth: false, onlyLogout: false },
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  const authRequired = to.matched.some((record) => record.meta.requireAuth)
  const onlyLogout = to.matched.some((record) => record.meta.onlyLogout)
  const loggedIn = await tokenService.getUser()
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (onlyLogout && loggedIn.token) {
    next({ name: "home" })
  } else if (authRequired && !loggedIn.token) {
    next({ name: "login" })
  } else {
    next()
  }
})

export default router
