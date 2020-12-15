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
                        :on-error="handleError"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <el-button style="margin-top:2%"  type="success" @click="submitUpload">确认上传</el-button>
                    <!--<el-progress style="margin-top:0.1rem"  v-if="beginUpload == true" :text-inside="true" :stroke-width="18"
                    :percentage="uploadPercent"></el-progress>-->
                </div>
                <div class='right'>
                    <el-form :model="form" style="width:100%">
                        <el-form-item label= "课程名字">
                            <el-input style="width:80%" v-model="form.course" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label = "授课老师">
                            <el-input style="width:80%" v-model="form.teacher" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label = "其它描述">
                            <el-input style="width:80%" v-model="form.description" placeholder="选填，有关描述信息"></el-input>
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
          upload_num: 0,
          //beginUpload: false,
          form: {
          course: '',
          teacher: '',
          description: ''
          },
          upload_file_record:[],
          file_List:[],
          fileList:[],
          magnetURI:"",
        }
    },
    methods:{
        chooseup(){
            this.cur = 0;
        },
        async uploadrecord(){
            const self = this;
            this.cur = 1;
            self.upload_file_record = [];
            await this.axios.get("/uploadrecord",{params:{id:this.GLOBAL.user_id}}).then(function (response){
                //console.log(response)
                self.upload_num = response.data.length;
                //console.log(response.data.length);
                for(let _file of response.data){
                  //console.log(_file,self.res);
                  self.upload_file_record.push(_file);
                }
              }).catch(function(error){console.log(error)});
        },
        beforeRemove(file,fileList){
            return this.$confirm('确定取消上传文件'+file.name+'吗?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                  }); 
        },
        handleExceed(file,fileList){
            console.log(fileList.length);
            this.$message.warning("最多一次上传1个文件，请分多次上传");
        },
        handleError(err, file, fileList){
            console.log(err);
            this.$message.error("文件上传失败")
        },
        handleRemove(file,fileList){
            console.log(file);
            this.file_List = [];
        },
        handleChange(file,fileList){
            if(file){
                console.log('Upload file '+ file.name);
                console.log(this.form,this.file_List);
                this.file_List.push(file);
                //fileList.push(file.name);
            }
        },
        submitUpload(){
            //console.log(this.file)
            //console.log(this.)
            const self = this;
           // console.log(this.file_List,this.file_List[0]);
           let upfile = this.file_List[0];
            if(this.file_List.length == 0){ this.$message.warning("请选择一个文件")}
            else if(this.form.course == ''){ this.$message.warning("请输入对应课程")}
            else if(this.form.teacher == ''){ this.$message.warning("请输入授课教师")}
            else{
                client.seed(upfile.raw, function (torrent) {
                    console.log('Client is seeding ' + torrent.magnetURI);
                    self.magnetURI = torrent.magnetURI;
                    console.log("123",self.magnetURI);
                    self.axios.post('/upload',qs.stringify({
                        id:self.GLOBAL.user_id,
                        filename:upfile.name.slice(0,upfile.name.lastIndexOf('.')), 
                        course:self.form.course, 
                        teacher:self.form.teacher,
                        fileformat:upfile.name.slice(upfile.name.lastIndexOf('.')),
                        filesize:upfile.size,
                        description:self.form.description,
                        magnetURI:self.magnetURI,
                    })).then(function (response){
                        let flag = ""+response.data['flag'];
                        if(flag == 1){
                            self.$message.success(upfile.name + "上传成功！");
                            self.file_List = [];
                            self.fileList = [];
                            self.form.description = "";
                            self.form.teacher = "";
                            self.form.course = "";
                        }
                        else{
                            self.$message.warning(upfile.name + "上传失败！")
                        }
                    }).catch(function(error){console.log(error)});
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
        margin-top: 5%;
        margin-left: 5%;
        width:60%;
    }
    .left{
        float: left;
        width:40%;
        margin-right: 0;
    }
    .right{
        float: right;
        margin-left: 0;
        width:55%;
    }
</style>