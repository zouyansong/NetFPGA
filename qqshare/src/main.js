// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Router from 'vue-router'

import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
axios.defaults.baseURL = '/api'
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
global.axios = axios;
global.qs = qs;
global.Vue = Vue;
Vue.use(VueAxios, axios);
import global_ from './components/AppGlobal'
Vue.prototype.GLOBAL = global_

import WebTorrent from 'webtorrent'
import VueRouter from 'vue-router'
//import SimplePeer from 'simple-peer'

Vue.config.productionTip = false
Vue.use(ElementUI)

/*var rtcConfig = {
    "iceServers": [
        {
            "urls": [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478"
            ]
        },
        {
            "urls": [
                "turn:relay.instant.io:443?transport=udp",
                "turn:relay.instant.io:443?transport=tcp",
                "turns:relay.instant.io:443?transport=tcp"
            ],
            "username": "relay.instant.io",
            "credential": "nepal-cheddar-baize-oleander"
        }
    ]
}
export var client = new WebTorrent({
    tracker: {
        rtcConfig: {
             ...SimplePeer.config,
             ...rtcConfig
        }
    }
})*/

export var client = new WebTorrent({
    tracker: {
        rtcConfig: {
            iceServers: [{
                    urls: [
                        'stun:stun.l.google.com:19302',
                        'stun:global.stun.twilio.com:3478'
                    ]
                },
                {
                    urls: [
                        "turn:relay.instant.io:443?transport=udp",
                        "turn:relay.instant.io:443?transport=tcp",
                        "turns:relay.instant.io:443?transport=tcp"
                    ],
                    username: 'relay.instant.io',
                    credential: 'nepal-cheddar-baize-oleander'
                }
            ],
            sdpSemantics: 'unified-plan'
        }
    }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//export var downloadingTorrents = []

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})