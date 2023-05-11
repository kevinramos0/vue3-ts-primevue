export default [
  {
    path: "/modules",
    name: "modules",
    component: () => import("@/views/Modules/ModulesView.vue"),
    meta: { requireAuth: true },
  },
]
