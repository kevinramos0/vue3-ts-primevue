export default [
  {
    path: "/rols",
    name: "rols",
    component: () => import("@/views/Rols/RolsView.vue"),
    meta: { requireAuth: true },
  },
]
