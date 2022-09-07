<template>
  <div class="body">
    <div class="search_header">
      <el-autocomplete
        v-model="searchWord"
        placeholder="搜索专辑"
        popper-class="my-autocomplete"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
      >
        <i
          slot="suffix"
          class="el-icon-search el-input__icon"
        />
      </el-autocomplete>
      <el-select v-model="searchOption" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div v-if="filterList.length !== 0" class="list">
      <AlbumCardVue v-for="item in filterList" :key="item.userId" :info="item" />
    </div>
    <el-empty v-else description="暂无结果" :image-size="270" style="margin-top: 40px" />
  </div>
</template>

<script>

import AlbumCardVue from '@/views/dashboard/AlbumCard'
import { getAllAlbum } from '@/backendApi/api'
export default {
  name: 'Dashboard',
  components: { AlbumCardVue },
  data() {
    return {
      options: [{
        value: 1,
        label: '专辑'
      }, {
        value: 2,
        label: '作者'
      }],
      searchOption: 1,
      album_list: [],
      searchWord: ''
    }
  },
  computed: {
    filterList: function() {
      return this.getFilter(this.album_list, this.searchWord)
    }
  },
  async mounted() {
    const res = await getAllAlbum({ 'username': this.$store.getters.name })
    this.album_list = res.data.result
  },
  methods: {
    querySearch(queryString, cb) {
      const results = this.getFilter(this.album_list, queryString)
      const mySet = new Set()
      const my_list = []
      for (const r of results) {
        const value = this.searchOption === 1 ? r.albumName : r.artist
        if (!mySet.has(value)) my_list.push({ 'value': value })
        mySet.add(value)
      }
      cb(my_list)
    },

    getFilter(my_list, queryString) {
      return (queryString || (queryString === '')) ? my_list.filter(this.createFilter(queryString)) : my_list
    },

    createFilter(queryString) {
      return (album) => {
        const queryString_low = queryString.toLowerCase()
        return this.searchOption === 1 ? (album.albumName.toLowerCase().indexOf(queryString_low) === 0)
          : (album.artist.toLowerCase().indexOf(queryString_low) === 0)
      }
    },
    handleSelect(item) {
      this.selectSearchWord = item.value
    }
  }
}
</script>

<style lang="scss" scoped>
.body{
  padding: 40px;
}

.search_header{
  display: flex;
  justify-content: flex-start;
  gap: 24px;
}

.list{
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

</style>
