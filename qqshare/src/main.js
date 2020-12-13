// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
//import axios from 'axios'
//import VueAxios from 'vue-axios'
//axios.defaults.baseURL = '/api'
//Vue.use(VueAxios, axios)

import WebTorrent from 'webtorrent'
import SimplePeer from 'simple-peer'

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

export var downloadingTorrents = []

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})