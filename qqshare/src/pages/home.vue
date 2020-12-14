<template>
    <div class="user-home">
        <el-container>
            <el-header class="header"><app-header/></el-header>
            <el-container>
                <app-sider/>
                <el-main class="main">
                    <!--search/-->
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
        }
    },
    methods:{

        
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
      margin-left: 0.8rem;
      width: 9rem;
      min-height: 900px;
  }

  .header{
      height: 1rem;
      width: 8rem;
  }

  .main{
      width:7rem;
  }

</style>
