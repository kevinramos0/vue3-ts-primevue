export default [
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/Users/pages/UserView.vue"),
    meta: { requireAuth: true },
  },
  //   {
  //     path: "/user/profile",
  //     name: "user-profile",
  //     // component: () => import("@/views/Users/UserProfile.vue"),
  //     meta: { requireAuth: true },
  //   },
]
