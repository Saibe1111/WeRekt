import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile/edit",
    name: "ProfileEdition",
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profileEdit" */ "../views/ProfileEdit.vue"),
  },
  {
    path: "/profile/:id",
    name: "Profile",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },

  {
    path: "/play",
    name: "Play",
    // route level code-splitting
    // this generates a separate chunk (play.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "play" */ "../views/Play.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    // route level code-splitting
    // this generates a separate chunk (play.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "chat" */ "../views/Chat.vue"),
  },
  {
    path: "/PageNotFound",
    alias: "*",
    component: () =>
      import(/* webpackChunkName: "PageNotFound" */ "../views/PageNotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Home") {
    let url = process.env.VUE_APP_API_URL;
    fetch(`${url}/api/auth/state`, {
      method: "GET",
      credentials: "include",
    }
    ).then(
      (response) => {
        if (response.status === 200) {
          next();
        }
        else {
          next({ name: 'Home' });
        }
      }
    )
  }
  else next();
})

export default router;
