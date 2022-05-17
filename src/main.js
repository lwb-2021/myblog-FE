import { createApp } from 'vue'
import App from "./App"
import {createRouter,createWebHistory} from "vue-router";
import "./axios"
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import 'tdesign-vue-next/es/style/index.css';
import {routes} from "./router/router";
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
})


const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

const app = createApp(App)
app.use(router)
app.use(VueMarkdownEditor);
app.mount('#app')