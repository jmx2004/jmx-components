<template>
  <el-container>
    <el-aside width="auto">
      <nav-side v-model:collapse="isCollapse"></nav-side>
    </el-aside>
    
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import NavHeader from './navHeader/index.vue'
import NavSide from './navSide/index.vue'
import { ref } from 'vue';
let isCollapse = ref(false)


</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}

</style>