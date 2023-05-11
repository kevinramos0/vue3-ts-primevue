export default [
  {
    path: "/profiles",
    name: "profiles",
    component: () => import("@/views/Profiles/ProfilesView.vue"),
    meta: { requireAuth: true },
  },
]
