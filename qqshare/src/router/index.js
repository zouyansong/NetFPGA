import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/login'
import home from '@/pages/home'
import searchhome from '@/pages/searchhome'
import search from '@/pages/search'
import upload from '@/pages/upload'
import download from '@/pages/download'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/login',
            name: 'login1',
            component: login
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [{
                    path: '/searchhome',
                    name: 'searchhome',
                    component: searchhome
                },
                {
                    path: '/search',
                    name: 'search',
                    component: search
                },
                {
                    path: '/upload',
                    name: 'updoad',
                    component: upload
                }, {
                    path: '/download',
                    name: 'download',
                    component: download
                }
            ]
        },
    ]
})