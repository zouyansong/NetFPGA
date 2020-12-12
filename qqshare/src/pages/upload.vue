<template>
    <div class="demo-home">
        <el-menu id = "sider" class="el-menu-demo" default-active="1" text-color="black"
         active-text-color="#409eff" style="padding:5px;padding-top:0px" mode="horizontal">
            <el-menu-item index="1" class="title" @click="chooseup()"><i class="el-icon-plus"></i>选择上传</el-menu-item>
            <el-menu-item index="2" class="title" @click="uploadrecord()"><i class="el-icon-success"></i>上传记录</el-menu-item>
        </el-menu>
        <div class="tab-content">
            <div v-show="cur==0" class="chooseup">
                <el-upload
                    class="upload-demo"
                    drag = "true"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="filelist"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </div>
            <div v-show="cur==1">
                <p style="text-align:left;margin-left:3%">您共上传完成{{upload_num}}个文件</p>
                <el-table
                    :data="upload_file_record"
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
          upload_num: 9,
          upload_file_record:[
            {
                    filename:"组合数学2020期末A1",
                    downloadtime:12,
                    uploadtime: "2020-12-10",
                },
                {
                    filename:"组合数学2017期末A2我觉得很无聊",
                    downloadtime:19,
                    uploadtime: "2017-12-18",
                },
                {
                    filename:"高等计算机网络课件",
                    downloadtime:29,
                    uploadtime: "2020-11-11",
                },
                {
                    filename:"微积分A2020期末答案",
                    downloadtime:129,
                    uploadtime: "2020-10-11",
                },
                {
                    filename:"毛概展示PPT",
                    downloadtime:9,
                    uploadtime: "2014-12-11",
                },
                {
                    filename:"高等计算机网络项目1",
                    downloadtime:39,
                    uploadtime: "2020-11-18",
                },
                {
                    filename:"高等计算机网络项目2",
                    downloadtime:12,
                    uploadtime: "2020-11-18",
                },
            ],
        }
    },
    methods:{
        chooseup(){
            this.cur = 0;
        },
        uploadrecord(){
            this.cur = 1;
        },
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