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
            <a class='hot-item' v-for="i in 10" v-bind:key="i"  @click="search(filenames[i-1])"
            @mouseover="function(event){mouse(event,i)}" @mouseout="hover=-1">
              &nbsp;&nbsp;{{filenames[i-1]}}&nbsp;&nbsp;</a>
            <div>
              <p></p>
              <el-card v-if="hover>=0" style="z-index:999;color:#409eff">{{descriptions[hover-1]}}</el-card>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        x:0,
        y:0,
        hover:-1,
        filenames:[],
        descriptions:[],
        //card_id:['card0','card1','card2','card3','card4','card5','card6','card7','card8','card9'],
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
      mouse(event,i){
        this.hover = i;
        this.x = event.offsetX;
        this.y = event.offsetY;
        console.log(i,this.x,this.y);
      },
      search(f){
        //console.log('search'+f);
        this.$router.push({path:"/search",query:{filename:f}});
      }
    },
    created(){
      //向服务器请求热点文件
      const self = this;
      this.axios.get('/hotfile').then(function(response){
        var l = response.data.length;
        for(let _file of response.data){
          self.filenames.push(_file['filename']);
          self.descriptions.push(_file['description']);
        }
      }).catch(function(error){console.log(error)});
      //console.log(this.filenames);
      //console.log(this.descriptions);
    },
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
        z-index: -1;
    }
    .hot-item:hover{
        cursor: pointer;
        text-decoration: underline;
        color:#409eff;
    }
</style>