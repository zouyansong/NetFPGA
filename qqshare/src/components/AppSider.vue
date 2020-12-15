<template>
    <div class = "app-sider">
        <el-menu id = "sider" class="el-menu-demo" default-active="1" text-color="black"
         active-text-color="#409eff">
            <el-menu-item index="1" class="title" @click="gotohome()"><i class="el-icon-s-home"></i>首页</el-menu-item>
            <el-menu-item index="2" class="title" @click="gotoupload()"><i class="el-icon-upload2"></i>上传</el-menu-item>
            <el-menu-item index="3" class="title" @click="gotodownload()"><i class="el-icon-download"></i>下载</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    methods:{
        gotohome(){
            this.$router.push('/searchhome');
        },
        gotoupload(){
            this.$router.push('/upload');
        },
        gotodownload(){
            this.$router.push('/download');
        }
    }
}
</script>

<style scoped>
 .app-sider{
    width: 1rem;
 }
 .title {
    margin-top: 12%;
    margin-bottom: 12%;
    font-size: 150%;
    text-align: center;
  }
</style>