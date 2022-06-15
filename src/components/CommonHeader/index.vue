<template>
  <header>
    <div class="l-conten">
      <el-button icon="el-icon-menu" plain size="mini" @click="haddleMenu"></el-button>
      <h3 style="color: #fff">{{this.$route.meta.name}}</h3>
    </div>
    <div class="r-conten">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "headerPage",
  data() {
    return {
      userImg: require("@/assets/images/wind.png"),
    };
  },
  methods: {
    haddleMenu(){
      this.$store.commit("collapseMenu")
    },
    logout(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login")
    }
  },

};
</script>

<style lang="less" scoped>

header {
  display: flex;
  height: 100%;

  justify-content: space-between;
  align-items: center;
}
.l-conten {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-conten {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>