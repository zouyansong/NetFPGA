<template>
    <div class="demo-home">
        <el-menu id = "sider" class="el-menu-demo" default-active="1" text-color="black"
         active-text-color="#409eff" style="padding:5px;padding-top:0px" mode="horizontal">
            <el-menu-item index="1" class="title" @click="chooseup()"><i class="el-icon-plus"></i>选择上传</el-menu-item>
            <el-menu-item index="2" class="title" @click="uploadrecord()"><i class="el-icon-success"></i>上传记录</el-menu-item>
        </el-menu>
        <div class="tab-content">
            <div v-show="cur==0" class="chooseup">
                <div class = 'left'>
                    <el-upload
                        class = "upload-demo"
                        drag
                        action
                        :file-list = "fileList"
                        :auto-upload = "false"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-progress="handleProcess"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <el-button style="margin-top:0.1rem"  type="success" @click="submitUpload">确认上传</el-button>
                    <el-progress style="margin-top:0.1rem"  v-if="beginUpload == true" :text-inside="true" :stroke-width="18"
                    :percentage="uploadPercent"></el-progress>
                </div>
                <div class='right'>
                    <el-form :model="form">
                        <el-form-item label= "课程名字">
                            <el-input style="width:2.5rem" v-model="form.course" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label = "授课老师">
                            <el-input style="width:2.5rem" v-model="form.teacher" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label = "其它描述">
                            <el-input style="width:2.5rem" v-model="form.description" placeholder="选填，有关描述信息"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            
            <div v-show="cur==1">
                <p style="text-align:left;margin-left:3%">您累计上传完成{{upload_num}}个文件</p>
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
import {client} from '../main'
export default {
    components: { AppHeader, AppSider, AppFooter},
    data(){
        return{
          cur: 0,
          fileList:[],
          upload_num: 0,
          beginUpload: false,
          uploadPercent: 0,
          form: {
          course: '',
          teacher: '',
          description: ''
          },
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
        beforeRemove(file,fileList){
            return this.$confirm('确定移除'+file.name+'?');
        },
        handleExceed(file,fileList){
            this.$message.warning("最多一次上传1个文件，请分多次上传");
        },
        handleSuccess(response, file, fileList){
            console.log(response)
            this.$message.success('文件[' + file.name + ']上传成功')
        },
        handleError(err, file, fileList){
            console.log(err);
            this.$message.error("文件上传失败")
        },
        handleRemove(file,fileList){
            console.log(file)
            this.fileList = []
        },
        handleChange(file,fileList){
            if(file){
                this.fileList = fileList.slice(-3);
                this.file = file;
                console.log('Upload file '+ file.name);
            }
        },
        handleProcess(event, file, fileList){
            console.log("process bar")
            this.beginUpload = true;
            this.uploadPercent = file.percentage.toFixed(0);
        },
        uploadFile(param){
            console.log(param.file.name)
            const fileObj = param.file
            const formData = new FormData()
            formData.append('file',fileObj)
            formData.append('filename',param.file.name)
            formData.append('course',this.form.course)
            formData.append('teacher',this.form.teacher)
            formData.append('description',this.form.description)
            console.log(formData.get('teacher'))
            //请求后台上传数据
            this.$http.post('',formData
            ).then(res => {
                console.log(res)
                if(res.data.meta.status == '200'){
                    this.$message.success(res.data.meta.msg)
                    this.fileList = []
                    this.form.teacher = ""
                    this.form.course = ""
                    this.form.description = ""
                }else{
                    this.$message.error(res.data.meta.msg)
                }
            },err => {
                console.log(err)
                this.$message.error("上传文件有问题，请检查重传")
            })
            //this.beginUpload = false//之后进度条真正使用的时候需要改回来
        },
        submitUpload(){
            if(this.fileList.length == 0){ this.$message.warning("请选择一个文件")}
            else if(this.form.course == ''){ this.$message.warning("请输入对应课程")}
            else if(this.form.teacher == ''){ this.$message.warning("请输入授课教师")}
            else{
                //this.$refs.upload.submit()
                //console.log(client);
                //console.log(this.file);
                client.seed(this.file.raw, function (torrent) {
                    console.log('Client is seeding ' + torrent.magnetURI);
                    //uploadFile(torrent);
                });
            }
        }
    },
    created(){
        this.upload_num = this.upload_file_record.length;
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
        margin-top: 5%;
        margin-left: 5%;
        width:5rem;
    }
    .left{
        float: left;
        width:2rem;
        margin-right: 0;
    }
    .right{
        float: right;
        margin-left: 0;
        width:3rem;
    }
</style>