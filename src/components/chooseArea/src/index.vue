<template>
  <div class="selector">
    <el-select placeholder="请选择省份" v-model="province">
      <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
    <el-select  :disabled="!province" style="margin: 0 10px" placeholder="请选择城市" v-model="city">
      <el-option v-for="item in selectCitys":key="item.code" :value="item.code" :label="item.name" ></el-option>
    </el-select>
    <el-select :disabled="!province || !city" placeholder="请选择区域" v-model="area">
      <el-option v-for="item in selectAreas" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>

  </div>
</template>

<script lang='ts' setup>
import { ref, computed, watch } from 'vue'
import allAreas from '../lib/pca-code.json'
export interface Data {
  name: string,
  code: String
}
// 下拉框选择省份的值
let province = ref('')
// 下拉框选择城市的值
let city = ref('')
// 下拉框选择区域的值
let area = ref('')
// 所有的省市区数据
let areas = ref(allAreas)
// 城市下拉框所有的值
let selectCitys = computed(() => {
  if(!province.value) return []
  else {
    let citys = areas.value.find(item => item.code === province.value)?.children
    return [...(citys || [])]
  }
})
// 区域下拉框所有的值
let selectAreas = computed(() => {
  if(!city.value) return []
  else {
    let area = selectCitys.value?.find(item => item.code === city.value)?.children
    return [...(area || [])]
  }
})
watch(province, () => {
  city.value = ''
  area.value = ''
})

watch(city, () => {
  area.value = ''
})

// 监听选择区域
watch(() => area.value, val => {
  if(val) {
    let provinceData: Data = {
      code: province.value,
      name: province && allAreas.find(item => item.code === province.value)!.name
    }
    let cityData: Data = {
      code: city.value,
      name: city.value && selectCitys.value.find(item => item.code === city.value)!.name
    }
    let areaData: Data = {
      code: val,
      name: val && selectAreas.value.find(item => item.code === val)!.name
    }
    emits('change',{
      province: provinceData,
      city: cityData,
      area: areaData
    })
  }
})
// 分发事件给父组件
let emits = defineEmits(['change'])


</script>

<style lang='scss' scoped>
.selector {
  display: flex;
  width: 500px;
  margin: 20px 20px;
}

</style>