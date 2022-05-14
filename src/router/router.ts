import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Blog from "../views/Blog.vue";
import BlogSearch from "../views/BlogSearch.vue"
import BlogEdit from "../views/BlogEdit.vue";
import BlogCreate from "../views/BlogCreate.vue";
import BlogView from "../views/BlogView.vue";
export const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/blog",
        name: "Blog",
        component: Blog
    },
    {
        path: "/blog/search",
        name: "BlogSearch",
        component: BlogSearch
    },
    {
        path: "/blog/edit/:id",
        name: "BlogEdit",
        component: BlogEdit
    },
    {
        path: "/blog/create",
        name: "BlogCreate",
        component: BlogCreate
    },
    {
        path: "/blog/view/:id",
        name: "BlogView",
        component: BlogView
    },
    {
        path: "/",
        redirect: "/home"
    }

]