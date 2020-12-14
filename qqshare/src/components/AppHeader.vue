<template>
    <div class='header'>
        <el-row>
            <el-col :span="15"><div class="grid-content1">清清共享</div></el-col>
            <el-col :span="4"><div class="grid-content2" style="float:right" id ="name"> <i class="el-icon-user-solid"></i>
            &nbsp;{{this.GLOBAL.user_name}}</div></el-col>
            <el-col :span="2"><div class="grid-content2" style="float:right" id ="setting"  @click="dosomething()">
                <i class="el-icon-setting"></i>&nbsp;设置</div></el-col>
            <el-col :span="3"><div class="grid-content2" id = "quit" @click="safequit()">
                退出登录</div></el-col>
        </el-row>
        <hr/>
    </div>
</template>

<script>
export default {
    methods:{
        dosomething () {
            alert("shezhi");
        },
        safequit(){
            this.$router.replace('/login');
        }
    }
}
</script>

<style scoped>
    .header{
        margin-right: 5%;
    }
    .el-row {
    margin-bottom: 1%;
  }
  .el-col {
    border-radius: 100%;
  }
  .grid-content1 {
    border-radius: 100%;
    color:black;
    float: left;
    margin-left: 5%;
    font-size: 0.12rem;
    font-weight: bold;
  }
  .grid-content2 {
    border-radius: 100%;
    color:black;
    float: none;
    font-size: 0.1rem;
    cursor:pointer;
  }
</style>