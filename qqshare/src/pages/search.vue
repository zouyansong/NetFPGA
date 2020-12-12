<template>
  <div>
      <div class="demo-home">
        <el-form :inline="true" :model="form" class="demo-form">
          <el-form-item label="文件名" style="margin-right:30px">
            <el-input v-model="form.filename" placeholder="请输入文件名"></el-input>
        </el-form-item>
        <el-form-item label="课程名" style="margin-right:30px">
          <el-input v-model="form.course" placeholder="请输入课程名"></el-input>
        </el-form-item>
        <el-form-item label="教师名" style="margin-right:30px">
          <el-input v-model="form.teacher" placeholder="请输入教师名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit()">查询</el-button>
        </el-form-item>
        </el-form>
        <el-card style="margin:0 5% 20px 12%">
          <div>
            <span>找到&nbsp;<strong>{{query_mode}}</strong>&nbsp;的相关结果{{res.length}}个</span>
            <el-button class="button1" id="b_2" type="text" @click="sortby(2)">大小</el-button>
            <el-button class="button1" id="b_1" type="text" @click="sortby(1)">时间</el-button>
            <el-button class="button1" id="b_0" type="text" @click="sortby(0)">热门</el-button>
          </div>
        </el-card>
        <el-card style="margin:0 5% 20px 12%" v-for="item in data_show" :key="item">
            <div>
              <p><span style="color:#409eff">{{item.filename}}</span> &nbsp;&nbsp;&nbsp;&nbsp;{{item.show_info}}</p>
            </div>
            <div>
              <span>下载次数:{{item.downloadtime}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>上传时间:{{item.uploadtime}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>文件大小:{{toFilesize(item.filesize)}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>文件格式:{{item.fileformat}}</span>
              <el-button class="button1" type="text" :click="download(item)"><i class="el-icon-download"></i>下载</el-button>
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
          :total="res.length">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import AppSider from '../components/AppSider.vue';
import {client} from '../main';
import {downloadingTorrents} from '../main';
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
          page_size:8,
          page_num:1,
          current_page:0,
          total_page:[],//所有页面数据
          data_show:[],//当前显示数据
          UNITS: ['B','KB','MB','GB','TB','PB','EB','ZB','YB'],
          STEP: 1024,
        }
    },
    methods:{
        sortby(num){
          let key_l = ["downloadtime","uploadtime","filesize"];
          document.getElementById("b_0").style.color="black";
          document.getElementById("b_1").style.color="black";
          document.getElementById("b_2").style.color="black";
          document.getElementById("b_"+num).style.color="blue";
          console.log(this.res.data);
          this.res.data.sort(function(a,b){if(b[key_l[num]]<a[key_l[num]]){return -1;}
          else return 1});
          console.log(this.res.data);
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
          console.log(`Start to download file {item.filename}`);
          let torrent = client.add(item.magnetURI, this.onTorrent(torrent));
          downloadingTorrents.append(torrent);
        },
        onTorrent: function(torrent) {
          console.log('Got torrent metadata!');
          console.log(
              'Torrent info hash: ' + torrent.infoHash + ' ' +
              '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
              '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
          );
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
            length: 11,
            data:[
                {
                    filename:"组合数学2020期末A1",
                    course:"",
                    teacher:"马昱春",
                    downloadtime:12,
                    filesize:13*1024,
                    uploadtime: "2020-12-10",
                    fileformat: ".docx",
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
                }
            ]
        };
        let items = this.res.data;
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
      margin-left: -10%;
      align-content: flex-start;
      margin-right: 5%;
    }
  .demo-form{
        margin-top: 30px;
        height: 80px;
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
