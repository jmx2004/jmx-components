<template>
  <div class="flex">
    <div style="width: 200px">
      <x-menu :data="data1" defaultActive="2"></x-menu>
    </div>
    <div style="width: 400px">
      <x-infinite-menu :data="data2" defaultActive="2"></x-infinite-menu>
    </div>
  </div>
</template>

<script lang='ts' setup>
let data1 = [
  {
    name: '导航1',
    index: '1',
    icon: 'document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'document'
      },
    ]
  },
]
let data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'document',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3-1-1-1',
                icon: 'document',
                children: [
                  {
                    name: '导航3-1-1-1-1',
                    index: '3-1-1-1-1',
                    icon: 'document'
                  },
                ]
              },
            ]
          },
        ]
      },
      
    ]
  },
]
</script>

<style lang='scss' scoped>
.flex {
  display: flex;
}

</style>