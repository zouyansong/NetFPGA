<template>
  <div id="login">
    <el-row>
      <el-col :lg="{span: 8, offset: 8}" :sm="24">
        <div class="loginForm">
          <h1 class="title">{{ loginTitle }}</h1>
          <el-form :model="form">
            <el-form-item>
              <el-input v-model="form.id" placeholder="请输入酒井ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item :lg="8" :sm="24">
              <el-button type="primary" @click="login" style="width: 100%;">登录</el-button>
            </el-form-item>
          </el-form>
          <span class="copyright">Copyright &copy; qqshare 2020</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        loginTitle: '清清共享登录',
        form: {
          id: '',
          pwd: ''
        }
      }
    },
    methods: {
      login () {
        const self = this
        //console.log('login',typeof(self),typeof(this))
        this.GLOBAL.user_id = this.form.id;
        if(this.form.id == '' || this.form.pwd == '') {
          this.$message.error("用户名或密码为空!!!")
        }
        else{
          // console.log({
          //     id: this.form.id,
          //     pwd: this.form.pwd,
          //   })
          //   console.log(qs.stringify({
          //     id: this.form.id,
          //     pwd: this.form.pwd,
          //   }))
            this.axios.post('/uservalid',qs.stringify({
              id: this.form.id,
               pwd: this.form.pwd,
             })
           ).then(function (response){
             let flag = ""+response.data['flag'];
             console.log(response.data['flag']);
             if (flag === '1'){
               //console.log(typeof(self));
               self.GLOBAL.user_name = response.data['name'];
               self.$router.push('/home');
             }
             else if(flag === '2'){
               self.$message.error("密码错误");
             }
             else{
               self.$message.error("用户不存在");
             }
           })
           .catch(function(error){console.log(error)});
        }
      }
    }
  }
</script>

<style scoped>
  #login {
    background-color: #E9EEF3;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    margin-top: 12%;
  }

  .loginForm {
    width: 60%;
    min-width: 300px;
    padding: 52px 30px 30px 30px;
    background-color: #fff;
    box-shadow: 10px 10px 5px #888888;
    text-align: center;
  }

  .title {
    color: #505458;
    margin: auto auto 20px auto;
  }

  .copyright {
    color: #c0c4cc;
    text-align: center;
    font-size: 10px;
  }

  .copyright a:link, a:visited, a:active {
    color: #c0c4cc;
  }
</style>
