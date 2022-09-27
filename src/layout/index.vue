<template>
  <div :class="classObj" class="app-wrapper">

    <navbar style="width: 100%;" />

    <el-aside>
      <sidebar class="sidebar-container" style="margin-top:calc(100vh- 50px) " />
    </el-aside>
    <el-main>Main</el-main>

      <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" /> -->

    </el-header></div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    } },
  // classObj() {
  //   return {
  //     hideSidebar: !this.sidebar.opened,
  //     openSidebar: this.sidebar.opened,
  //     withoutAnimation: this.sidebar.withoutAnimation,
  //     mobile: this.device === 'mobile'
  //   }
  // }

  created() {
    // this.$store.dispatch('user/getUserInfo')
  }
  // methods: {
  //   handleClickOutside() {
  //     this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
  //   }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
