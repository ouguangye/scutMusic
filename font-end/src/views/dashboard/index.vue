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
    <div v-if="album_list.length !== 0" style="display: flex;flex-direction: column">
      <div class="list">
        <AlbumCardVue v-for="item in album_list" :key="item.userId" :info="item" />
      </div>
      <el-pagination
        v-if="pages > 1"
        background
        layout="prev, pager, next"
        :total="pages*10"
        style="margin: 40px auto; display: block"
        @current-change="changePage"
      />
    </div>
    <el-empty v-else description="暂无结果" :image-size="270" style="margin-top: 40px" />
  </div>
</template>

<script>

import AlbumCardVue from '@/views/dashboard/AlbumCard'
import { getAllAlbum, getAllAlbumName, getAllArtist } from '@/backendApi/api'
export default {
  name: 'Dashboard',
  components: { AlbumCardVue },
  data() {
    return {
      album_list: [],
      album_name_list: [],
      artist_list: [],
      pages: 1,
      options: [{
        value: 1,
        label: '专辑'
      }, {
        value: 2,
        label: '作者'
      }],
      searchOption: 1,
      searchWord: ''
    }
  },
  computed: {
    choose_list: function() {
      return this.searchOption === 1 ? this.album_name_list : this.artist_list
    }
  },
  watch: {
    searchWord(value) {
      if (this.getFilter(this.choose_list, value).length === 0) return
      let param = {}
      if (value || value !== '') {
        if (this.searchOption === 1) {
          param = { 'albumName': value }
        } else {
          param = { 'artist': value }
        }
      }
      this.getAlbumResult(param)
    }
  },
  async mounted() {
    await this.getAlbumResult()
    await this.getAlbumNameList()
    await this.getArtistNameList()
  },
  methods: {
    async getAlbumResult(param) {
      const res = await getAllAlbum({ 'username': this.$store.getters.name, ...param })
      this.album_list = res.data.result.list
      this.pages = res.data.result.pages
    },
    async getAlbumNameList() {
      const res = await getAllAlbumName()
      this.album_name_list = res.data.result
    },
    async getArtistNameList() {
      const res = await getAllArtist()
      this.artist_list = res.data.result
    },
    changePage(page) {
      this.getAlbumResult({ 'page': page })
    },

    querySearch(queryString, cb) {
      const res = this.getFilter(this.choose_list, queryString)
      // console.log(res)
      const my_list = []
      for (const r of res) {
        my_list.push({ 'value': r })
      }
      cb(my_list)
    },

    getFilter(my_list, queryString) {
      return (queryString || (queryString === '')) ? my_list.filter(this.createFilter(queryString)) : my_list
    },

    createFilter(queryString) {
      return (name) => {
        // console.log(name)
        const queryString_low = queryString.toLowerCase()
        return name.toLowerCase().indexOf(queryString_low) !== -1
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
