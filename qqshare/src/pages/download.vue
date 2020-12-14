<template>
    <div class="demo-home">
        <el-menu id = "sider" class="el-menu-demo" default-active="1" text-color="black"
         active-text-color="#409eff" style="padding:5px;padding-top:0px" mode="horizontal">
            <el-menu-item index="1" class="title" @click="downloadnow()"><i class="el-icon-download"></i>正在下载</el-menu-item>
            <el-menu-item index="2" class="title" @click="downloadrecord()"><i class="el-icon-success"></i>下载记录</el-menu-item>
        </el-menu>
        <div class="tab-content">
            <div v-show="cur==0" class="chooseup">
               <p>正在下载列表</p>
               <div v-html="downloadInfo"></div>
               <!--<ul>
                   <li v-for="torrent in this.downloadingTorrents" :key="torrent.infoHash">
                       <p>  
                            Downloading {{ torrent.name }}, 
                            Progress: {{ (100 * torrent.progress).toFixed(1) }}
                            Download Speed: {{ torrent.downloadSpeed }}
                            Upload Speed: {{ torrent.uploadSpeed }}
                       </p>
                    </li>
                </ul>
                -->
            </div>
            <div v-show="cur==1">
                <p style="text-align:left;margin-left:3%">您共下载完成{{download_num}}个文件</p>
                <el-table
                    :data="download_file_record"
                    stripe
                    style="width: 100%; margin-left:2%">
                    <el-table-column
                    prop="filename"
                    label="文件名"
                    width="400">
                    </el-table-column>
                    <el-table-column
                    prop="downloadtime"
                    label="下载次数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="uploadtime"
                    label="上传日期">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>

import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import AppSider from '../components/AppSider.vue';

export default {
    components: { AppHeader, AppSider, AppFooter},
    data(){
        return{
          cur: 0,
          download_num: 4,
          downTorrents: this.GLOBAL.downTorrents,
          download_file_record:[
                {
                    filename:"高等计算机网络项目3",
                    course:"高等计算机网络",
                    teacher:"",
                    downloadtime:32,
                    filesize:1.43*1024*1024,
                    uploadtime: "2020-11-19",
                    fileformat: ".pdf",
                },
                {
                    filename:"高等计算机网络项目4",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:15,
                    filesize:13*1024*1024*1024,
                    uploadtime: "2018-11-18",
                    fileformat: ".zip",
                },
                {
                    filename:"高等计算机网络项目10",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:18,
                    filesize:12*1024*1024,
                    uploadtime: "2020-11-13",
                    fileformat: ".zip",
                },
                {
                    filename:"高等计算机网络报告",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:4,
                    filesize:11,
                    uploadtime: "2020-11-20",
                    fileformat: ".zip",
                },
            ],
        }
    },
    methods:{
        downloadnow(){
            this.cur = 0;
        },
        downloadrecord(){
            this.cur = 1;
        },
    },
    computed:{
        downloadInfo: function(){
            let info =  '<div>您正在下载' + this.downTorrents.length + '个文件';
            info += '<ul>';
            for(let torrent of this.downTorrents){
                info += '<li>';
                info += 'Downloading ' + torrent.name + 
                        ', Progress: ' + (100 * torrent.progress).toFixed(1) + 
                        ', Download Speed: ' + torrent.downloadSpeed +
                        ', Upload Speed: ' + torrent.uploadSpeed;
                info += '</li>';
            }
            info += '</ul></div>';
            return info;
        }
    },
    created(){
    },
    mounted(){
    }
}
</script>

<style scoped>
    .demo-home{
      font-size: 20px;
      align-content: flex-start;
      margin-right: 5%;
    }
    .grid-content2 {
    border-radius: 4px;
    color:black;
    float: none;
    font-size: 20px;
    cursor:pointer;
  }
  .tab-tilte{
            width: 90%;
    }
    .tab-tilte li{
        float: left;
        width: 25%;
        padding: 10px 0;
        text-align: center;
        background-color:#f4f4f4;
        cursor: pointer;
    }
     /* 点击对应的标题添加对应的背景颜色 */
    .tab-tilte .active{
        background-color: #09f;
         color: #fff;
    }
    /* .tab-content{
        float: left;
        width: 25%;
        line-height: 100px;
        text-align: center;
    } */
    .chooseup{
        margin-top: 10%;
    }
</style>