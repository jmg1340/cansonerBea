
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: "/cercaNumero",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "NumeroCerca",
        path: "",
        component: () => import("pages/BuscarPerNumero.vue"),
      },
    ],
  },
  {
    path: "/cercaText",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "textCerca",
        path: "",
        component: () => import("pages/BuscarPerText.vue"),
      },
    ],
  },
  {
      path: "/canso",
      component: () => import("layouts/layoutCanso.vue"),
      children: [
        {
          name: "canso",
          path: "",
          component: () => import("pages/canso.vue"),
        },
      ],
    },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
