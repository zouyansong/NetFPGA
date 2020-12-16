<template>
    <div class="demo-home">
        <el-menu id = "sider" class="el-menu-demo" default-active="1" text-color="black"
         active-text-color="#409eff" style="padding:5px;padding-top:0px" mode="horizontal">
            <el-menu-item index="1" class="title" @click="downloadnow()"><i class="el-icon-download"></i>正在下载</el-menu-item>
            <el-menu-item index="2" class="title" @click="downloadrecord()"><i class="el-icon-success"></i>下载记录</el-menu-item>
        </el-menu>
        <div class="tab-content">
            <div v-show="cur==0" class="chooseup">
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
          download_num: 0,
          download_file_record:[],
          downTorrents:this.GLOBAL.downTorrents,
        }
    },
    methods:{
        downloadnow(){
            this.cur = 0;
        },
        async downloadrecord(){
            const self = this;
            this.cur = 1;
            self.download_file_record = [];
            await this.axios.get("/downloadrecord",{params:{id:sessionStorage.getItem("user_id")}}).then(function (response){
                //console.log(response)
                self.download_num = response.data.length;
                //console.log(response.data.length);
                for(let _file of response.data){
                  //console.log(_file,self.res);
                  self.download_file_record.push(_file);
                }
              }).catch(function(error){console.log(error)});
        },
    },
    computed:{
        downloadInfo: function(){
            //console.log(sessionStorage.getItem("downTorrents"));
            //var down_torrents = JSON.parse(sessionStorage.getItem("downTorrents"));
            //console.log(down_torrents);
            let info =  '<div>您正在下载' + this.downTorrents.length + '个文件</div></br></br>';
            //info += '<ul>';\
            var index = 1;
            for(let torrent of this.downTorrents){
                info += '<el-card><div style="float:left;color:#409eff">' + index+ ".&nbsp;" + torrent.name + '</div>'
                info += '</br><div style="float:left">'+'Progress: ' + (100 * torrent.progress).toFixed(1) + 
                        '&nbsp;&nbsp;&nbsp;&nbsp;Download Speed: ' + torrent.downloadSpeed +
                        '&nbsp;&nbsp;&nbsp;&nbsp;Upload Speed: ' + torrent.uploadSpeed +'</div>';
                //info + '<el-progress :percentage="50"></el-progress>'
                info += '</el-card></br></br>';
                index += 1;
            }
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
      font-size: 180%;
      align-content: flex-start;
      margin-right: 5%;
    }
    .grid-content2 {
    border-radius: 4px;
    color:black;
    float: none;
    font-size: 180%;
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
        float: left;
        margin-left: 3%;
        margin-top: 3%;
    }
</style>