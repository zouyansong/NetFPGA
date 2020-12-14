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
        <el-card style="margin:0 9% 20px 9%">
          <div>
            <span>找到&nbsp;<strong>{{query_mode}}</strong>&nbsp;的相关结果{{length}}个</span>
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
          :total="length">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import AppSider from '../components/AppSider.vue';
import {client} from '../main';
//import {this.this.downTorrents} from '../main';
export default {
  components: { AppHeader, AppSider, AppFooter},
    data(){
        return{
          form: {
          filename: '',
          course: '',
          teacher: ''
          },
          res:{

          },
          query_mode:"",
          length:0,
          page_size:8,
          page_num:1,
          current_page:0,
          total_page:[],//所有页面数据
          data_show:[],//当前显示数据
          UNITS: ['B','KB','MB','GB','TB','PB','EB','ZB','YB'],
          STEP: 1024,
          downTorrents: this.GLOBAL.downTorrents
        }
    },
    methods:{
        sortby(num){
          let key_l = ["downloadtime","uploadtime","filesize"];
          document.getElementById("b_0").style.color="black";
          document.getElementById("b_1").style.color="black";
          document.getElementById("b_2").style.color="black";
          document.getElementById("b_"+num).style.color="blue";
          //console.log(this.res.data);
          this.res.data.sort(function(a,b){if(b[key_l[num]]<a[key_l[num]]){return -1;}
          else return 1});
          //console.log(this.res.data);
          for (let i = 0; i < this.page_num; i++){
            this.total_page[i] = this.res.data.slice(this.page_size*i, this.page_size*(i+1));
          }
          this.current_page = 0;
          this.data_show = this.total_page[this.current_page];
        },
        handleSizeChange(val) {
          this.page_size = val;
          this.page_num = Math.ceil(this.res.data.length / this.page_size) ||  1;
          for (let i = 0; i < this.page_num; i++){
            this.total_page[i] = this.res.data.slice(this.page_size*i, this.page_size*(i+1));
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
          console.log(`Start to download file ${item.filename} `);
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
    created(){
      let q = this.$route.query;
      this.form = q;
      for (let key in q){
        if(this.$route.query[key] != '')
          this.query_mode += key + ":" + this.$route.query[key] + " ";
      }
      //发送请求，得到response
      this.res = {
            status: true,
            data:[
                {
                    filename:"组合数学2020期末A1",
                    course:"",
                    teacher:"马昱春",
                    downloadtime:12,
                    filesize:13*1024,
                    uploadtime: "2020-12-10",
                    fileformat: ".docx",
                    magnetURI: "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent",
                },
                {
                    filename:"组合数学2017期末A2我觉得很无聊",
                    course:"组合数学",
                    teacher:"",
                    downloadtime:19,
                    filesize:14*1024,
                    uploadtime: "2017-12-18",
                    fileformat: ".pdf",
                },
                {
                    filename:"高等计算机网络课件",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:29,
                    filesize:13*1024*1024-234,
                    uploadtime: "2020-11-11",
                    fileformat: ".zip",
                },
                {
                    filename:"微积分A2020期末答案",
                    course:"",
                    teacher:"苏爷爷",
                    downloadtime:129,
                    filesize:1.2 *1024*1024,
                    uploadtime: "2020-10-11",
                    fileformat: ".docx",
                },
                {
                    filename:"毛概展示PPT",
                    course:"",
                    teacher:"",
                    downloadtime:9,
                    filesize:3*1024*1024,
                    uploadtime: "2014-12-11",
                    fileformat: ".ppt",
                },
                {
                    filename:"高等计算机网络项目1",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:39,
                    filesize:13*1024*1024,
                    uploadtime: "2020-11-18",
                    fileformat: ".zip",
                },
                {
                    filename:"高等计算机网络项目2",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:12,
                    filesize:110,
                    uploadtime: "2020-11-18",
                    fileformat: ".zip",
                },
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
                {
                    filename:"深入浅出统计学",
                    course:"统计学原理",
                    teacher:"",
                    downloadtime:40,
                    filesize:11*1024*1024,
                    uploadtime: "2020-11-26",
                    fileformat: ".pdf",
                    magnetURI: 'magnet:?xt=urn:btih:94092b324d99391e8ff6407368f4bfa6b1776670&dn=%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BA%E7%BB%9F%E8%AE%A1%E5%AD%A6Head_First_Statistics.pdf&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
                },
                {
                    filename:"TCP SECURITY",
                    course:"高等计算机网络",
                    teacher:"",
                    downloadtime:15,
                    filesize:11*1024*1024,
                    uploadtime: "2020-11-26",
                    fileformat: ".pptx",
                    magnetURI: 'magnet:?xt=urn:btih:b8b803d71078e63dc70d37ac3e1af608ad362e0c&dn=TCP+SECURITY.pptx&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
                    
                },
            ]
        };
        let items = this.res.data;
        this.length = items.length;     
        //console.log(items);
        for (let i in items){
          //console.log(items[i]);
          let t= ""
          if(items[i].course != "") t += "课程: "+items[i].course;
          if(items[i].teacher != "") t += "教师: " + items[i].teacher;
          //console.log(t);
          this.res.data[i].show_info = t;
        }
        this.page_num = Math.ceil(this.res.data.length / this.page_size) ||  1;
        console.log(this.page_num);
        for (let i = 0; i < this.page_num; i++){
          this.total_page[i] = this.res.data.slice(this.page_size*i, this.page_size*(i+1));
        }
        this.data_show = this.total_page[this.current_page];
    },
    mounted(){
      this.sortby(0);
    }
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
