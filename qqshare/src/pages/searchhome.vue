<template>
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
        <div class='hot'><p style="font-weight: bold">热门推荐:</p>
            <a v-for="file in filenames" v-bind:key="file" @click="search(file)">{{file}}&nbsp;&nbsp;&nbsp;</a>
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
        console.log('submit!');
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
      font-size: 20px;
      margin-left: -10%;
      align-content: flex-start;
    }
    .demo-form{
        margin-top: 100px;
        height: 100px;
    }
    .el-input{
        width: 300px;
    }
    .hot{
        margin-left: 14%;
        text-align: left;
        margin-right: 14%;
        word-break: keep-all;
        word-wrap: break-word;
    }
</style>