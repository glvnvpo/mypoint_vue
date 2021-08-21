import Vue from "vue";
import VueRouter from "vue-router";
import * as routeNames from "../Permission";
import Vuex from "vuex";

Vue.use(Vuex);

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: () => import("../BasePage"),
            redirect: routeNames.PATH_ORDERS,
            children: [
                {
                    path: routeNames.PATH_NEW_ORDER,
                    name: routeNames.NEW_ORDER,
                    component: () => import("../views/NewOrder/index")
                },
                {
                    path: routeNames.PATH_ORDERS,
                    name: routeNames.ORDERS,
                    component: () => import("../views/Orders/index")
                }
            ]
        },
        {
            path :'*',
            redirect: "/"
        }
    ]
});

export default router;
