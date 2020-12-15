<template>
  <div>
      <div class="demo-home">
        <el-form :inline="true" :model="form" class="demo-form">
          <el-form-item label="文件名" style="margin-right:3%">
                <el-input v-model="form.filename" placeholder="请输入文件名"></el-input>
            </el-form-item>
            <el-form-item label="课程名" style="margin-right:3%">
                <el-input v-model="form.course" placeholder="请输入课程名"></el-input>
            </el-form-item>
            <el-form-item label="教师名" style="margin-right:3%">
                <el-input style="width:180px" v-model="form.teacher" placeholder="请输入教师名"></el-input>
            </el-form-item>
            <el-form-item style="margin-right:5%">
                <el-button type="primary" icon="el-icon-search" @click="onSubmit()">查询</el-button>
            </el-form-item>
        </el-form>
        <div id = 'loading'>
          <el-card style="margin:0 9% 20px 9%">
            <div>
              <span>找到&nbsp;<strong>{{query_mode}}</strong>&nbsp;的相关结果{{len}}个</span>
              <el-button class="button1" id="b_2" type="text" @click="sortby(2)">大小</el-button>
              <el-button class="button1" id="b_1" type="text" @click="sortby(1)">时间</el-button>
              <el-button class="button1" id="b_0" type="text" @click="sortby(0)">热门</el-button>
            </div>
          </el-card>
          <el-card style="margin:0 9% 20px 9%" v-for="(item,index) in data_show" :key="index">
              <div>
                <p><span style="color:#409eff">{{item.filename}}</span> &nbsp;&nbsp;&nbsp;&nbsp;{{item.show_info}}</p>
              </div>
              <div>
                <span>下载次数:{{item.downloadtime}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>上传时间:{{item.uploadtime}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>文件大小:{{toFilesize(item.filesize)}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>文件格式:{{item.fileformat}}</span>
                <el-button class="button1" type="text" @click="download(item)"><i class="el-icon-download"></i>下载</el-button>
              </div>
            </el-card>
          </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current_page+1"
            :page-sizes="[8, 16, 24, 32]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="len">
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import AppSider from '../components/AppSider.vue';
import {client} from '../main';
//import {downloadingTorrents} from '../main';
export default {
  components: { AppHeader, AppSider, AppFooter},
    data(){
        return{
          form: {
          filename: '',
          course: '',
          teacher: ''
          },
          res:[],
          query_mode:"",
          len:0,
          page_size:8,
          page_num:1,
          current_page:0,
          total_page:[],//所有页面数据
          data_show:[],//当前显示数据
          UNITS: ['B','KB','MB','GB','TB','PB','EB','ZB','YB'],
          STEP: 1024,
          downTorrents: this.GLOBAL.downTorrents,
        }
    },
    methods:{
      async onSubmit(){
        var q = this.$route.query;
          this.form = q;
          const self = this;
          this.query_mode = "";
          for (let key in q){
            if(this.$route.query[key] != '')
              this.query_mode += key + ":" + this.$route.query[key] + " ";
          }
          //发送请求，得到response
          await this.axios.get("/search",{params:q}).then(function (response){
                //console.log(response)
                self.len = response.data.length;
                //console.log(response.data.length);
                for(let _file of response.data){
                  //console.log(_file,self.res);
                  self.res.push(_file);
                }
              }).catch(function(error){console.log(error)});
            for (let i in this.res){
              //console.log(i);
              let t= "";
              if(this.res[parseInt(i)].course != "") t += "课程: "+this.res[parseInt(i)].course;
              if(this.res[parseInt(i)].teacher != "") t += "教师: " + this.res[parseInt(i)].teacher;
              //console.log(t);
              this.res[parseInt(i)].show_info = t;
            }
            this.page_size = 8;
            this.page_num = Math.ceil(this.len / this.page_size) ||  1;
            this.sortby(0);
        },
        sortby(num){
          let key_l = ["downloadtime","uploadtime","filesize"];
          document.getElementById("b_0").style.color="black";
          document.getElementById("b_1").style.color="black";
          document.getElementById("b_2").style.color="black";
          document.getElementById("b_"+num).style.color="blue";
          //console.log(this.res.data);
          this.res.sort(function(a,b){if(b[key_l[num]]<a[key_l[num]]){return -1;}
          else return 1});
          //console.log(this.res.data);
          for (let i = 0; i < this.page_num; i++){
            this.total_page[i] = this.res.slice(this.page_size*i, this.page_size*(i+1));
          }
          this.current_page = 0;
          this.data_show = this.total_page[this.current_page];
        },
        handleSizeChange(val) {
          this.page_size = val;
          this.page_num = Math.ceil(this.res.len / this.page_size) ||  1;
          for (let i = 0; i < this.page_num; i++){
            this.total_page[i] = this.res.slice(this.page_size*i, this.page_size*(i+1));
          }
          this.data_show = this.total_page[this.current_page];
        },
        handleCurrentChange(val) {
          this.current_page = val-1;
          this.data_show = this.total_page[this.current_page];
        },
        format: function format(value, power) {
          return (value / Math.pow(this.STEP, power)).toFixed(2) + this.UNITS[power];
        },
        toFilesize: function(value) {
          value = parseFloat(value, 10);
          for (var i = 0; i < this.UNITS.length; i++) {
            if (value < Math.pow(this.STEP, i)) {
              if (this.UNITS[i - 1]) {
                return this.format(value, i - 1);
              }
              return value + this.UNITS[i];
            }
          }
          return this.format(value, i - 1);
        },
        download: function(item){
          if (item.magnetURI==undefined) {
            this.$message.warning("下载文件的磁力链接不存在！");
            return;
          }
          console.log(`Start to download file ${item.filename} `);
          this.$message.success("已将文件"+item.filename+"添加到下载列表");
          //const self = this;
           this.axios.post('/download',qs.stringify({
              id: this.GLOBAL.user_id,
               downloadfileurl: item.magnetURI,
             })
           ).then(function (response){
             let flag = response.data['flag'];
             if (flag == '1'){
               //console.log(typeof(self));
               console.log("已将下载记录上传至服务器！");
             }
             else if(flag == '0'){
               console.log("下载记录上传至服务器失败！");
             }
           })
           .catch(function(error){console.log(error)});
          console.log(item.magnetURI);
          let torrent = client.add(item.magnetURI, {path: 'D:/user/Downloads/'}, this.onTorrent);
          console.log(torrent);
          /*
          this.downTorrents.push({
            hash: torrent.infoHash,
            name: torrent.name, 
            path: torrent.path, 
            progress: 0, 
            numPeers: torrent.numPeers, 
            downloadSpeed: torrent.downloadSpeed,
            uploadSpeed: torrent.uploadSpeed,
            remaining: torrent.timeRemaining
          });
          */
          this.downTorrents.push(torrent);
        },
        onTorrent: function(torrent) {
          console.log('Got torrent metadata!');
          console.log(
              'Torrent info hash: ' + torrent.infoHash + ' ' +
              '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
              '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
          );
          let interval = setInterval(function (){
            console.log('Downloading file: ' + torrent.name + ', Progress: ' + (torrent.progress * 100).toFixed(1) + '%');
            /*
            let tmp = this.downTorrents.filter(entry => entry.infoHash == torrent.infoHash)[0];
            tmp.progress = (100 * torrent.progress).toFixed(1)
            tmp.numPeers = torrent.numPeers;
            tmp.downloadSpeed = torrent.downloadSpeed;
            tmp.uploadSpeed = torrent.uploadSpeed;
            */
          }, 5000);
          torrent.on('done', function () {
            console.log(`Finish downloading ${torrent.name} `);
            clearInterval(interval);
            //let pos = this.downTorrents.indexOf(torrent);
            //let tmp = this.downTorrents.filter(entry => entry.infoHash == torrent.infoHash)[0];
            //let pos = this.downTorrents.indexOf(tmp);
            //this.downTorrents.splice(pos, 1);
            let file = torrent.files[0];//assume only one file per torrent
            file.getBlobURL(function (err, url) {
              if (err) return util.error(err)
              let a = document.createElement('a');
              a.target = '_blank';
              a.download = file.name;
              a.href = url;
              a.textContent = 'Download ' + file.name;
              a.click();
            })
          });
      }
    },
    async created(){
      this.onSubmit();
    },
    mounted(){this.sortby(0)},
  }
</script>

<style scoped>
  .demo-home{
      font-size: 20px;
      align-content: flex-start;
      margin-right: 5%;
    }
  .demo-form{
        margin-top: 30px;
        margin-left: 3%;
        overflow-y: auto;
    }
  .el-input{
        width: 300px;
    }
  .button1{
    float: right;
    margin-left: 20px; 
    font-size:16px;
    color: black;
  }
</style>
