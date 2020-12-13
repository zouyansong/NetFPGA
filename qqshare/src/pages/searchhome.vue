<template>
    <div class="demo-home">
        <el-form :inline="true" :model="form" class="demo-form">
            <el-form-item label="文件名" style="margin-right:3%">
                <el-input v-model="form.filename" placeholder="请输入文件名"></el-input>
            </el-form-item>
            <el-form-item label="课程名" style="margin-right:3%">
                <el-input v-model="form.course" placeholder="请输入课程名"></el-input>
            </el-form-item>
            <el-form-item label="教师名" style="margin-right:3%">
                <el-input style="width:210px" v-model="form.teacher" placeholder="请输入教师名"></el-input>
            </el-form-item>
            <el-form-item style="margin-right:5%;float:auto">
                <el-button type="primary" icon="el-icon-search" @click="onSubmit()">查询</el-button>
            </el-form-item>
        </el-form>
        <div class='hot'><p style="font-weight: bold;overflow-y:auto">热门推荐:</p>
            <a class='hot-item' v-for="file in filenames" v-bind:key="file" @click="search(file)">{{file}}&nbsp;&nbsp;&nbsp;</a>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        filenames:[
            "组合数学2019年期末", "微积分A2018年春期末","线性代数2018年秋",
            "人工智能导论大作业","高等计算机网络课件","操作系统2020年期中A卷",
            "离散数学A课件",'复变函数期末总结','数电A4小抄'
        ],
        form: {
          filename: '',
          course: '',
          teacher: ''
        }
      }
    },
    methods: {
      onSubmit() {
        //console.log('submit!');
        this.$router.push({path:"/search",query:this.form});
      },
      search(f){
          alert("search file"+f);
      }
    }
  }
</script>

<style scoped>
    .demo-home{
      font-size: 180%;
    }
    .demo-form{
        margin-top: 0.5rem;
        margin-right: 10%;
        overflow-y:auto;
    }
    .el-input{
        width: 300px;
    }
    .hot{
        margin-left: 4%;
        text-align: left;
        margin-right: 14%;
        word-break: keep-all;
        word-wrap: break-word;
    }
    .hot-item:hover{
        cursor: pointer;
        text-decoration: underline;
        color:#409eff;
    }
</style>