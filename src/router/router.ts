import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Blog from "../views/Blog.vue";
import User from "../views/User.vue"
import Admin from "../views/Admin.vue";
import BlogSearch from "../views/BlogSearch.vue";
import BlogEdit from "../views/BlogEdit.vue";
import BlogCreate from "../views/BlogCreate.vue";
import BlogView from "../views/BlogView.vue";
import BlogDelete from "../views/BlogDelete.vue";
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
        path: "/user/:id",
        name: "User",
        component: User
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin
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
        path: "/blog/delete/:id",
        name: "BlogDelete",
        component: BlogDelete
    },
    {
        path: "/",
        redirect: "/home"
    }

]