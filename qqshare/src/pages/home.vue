<template>
    <div class="user-home">
        <el-container>
            <el-header class="header"><app-header @setting='set'/></el-header>
            <el-container>
                <app-sider/>
                <el-main class="main">
                    <!--search/-->
                    <el-dialog
                        title="设置个人信息"
                        :visible.sync="dialogVisible"
                        width="30%">
                        <el-form :inline="false" :model="form_set">
                            <el-form-item label="新昵称" style="margin-right:3%">
                                    <el-input v-model="form_set.name" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" style="margin-right:3%">
                                    <el-input v-model="form_set.newpwd" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="旧密码" style="margin-right:3%">
                                    <el-input v-model="form_set.oldpwd" placeholder=""></el-input>
                                </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消修改</el-button>
                            <el-button type="primary" @click="modifyname">确定修改</el-button>
                        </span>
                    </el-dialog>
                    <router-view/>
                </el-main>
            </el-container>
            <app-footer/>
        </el-container>
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
            dialogVisible:false,
            form_set:{
                name:"",
                newpwd:"",
                oldpwd:"",
            }
        }
    },
    methods:{
        set(){
            //this.$message.info("shehzi");
            //console.log(this.dialogVisible);
            //this.$message.info(this.dialogVisible);
            this.dialogVisible = true;
        },
        modifyname(){
            if(this.form_set.name == ""){
                this.$message.warning("请输入新昵称！");
                return;
            }
            const self = this;
            this.axios.post('/changename',qs.stringify({
               id: sessionStorage.getItem("user_id"),
               newname: self.form_set.name,
             })
           ).then(function (response){
               let flag = ""+response.data['flag'];
               if(flag == '1'){
                   //console.log("before",self.GLOBAL.user_name);
                   self.$message.success("修改成功")
                   //Vue.set(self.GLOBAL,'user_name',self.form_set.name);
                   sessionStorage.setItem("user_name",self.form_set.name);
                   //console.log(self.GLOBAL.user_name);
                   document.getElementById("name").innerHTML='<i class="el-icon-user-solid"></i>&nbsp;'+self.form_set.name;
                   self.form_set.name = "";
                   self.dialogVisible = false;
                   //console.log("after",self.GLOBAL.user_name);
               }
               else{
                   self.$message.error("修改失败，名字不合法！");
               }
            }
            ).catch(function(error){console.log(error)});
        }
        
    },
    created(){
        this.$router.push('./searchhome');
    }
    
}
</script>

<style scoped>
  .user-home{
      display: flex;
      flex-direction: row;
      font-size: 100%;
      margin-left: 5%;
      min-height: 900px;
  }

  .header{
      height: 10%;
      width: 95%;
  }

  .main{
      width:95%;
  }

</style>
