<template>
  <div style="height: 100%">
    <Login v-if="index===0" @listenEvent="changeIndex" />
    <RegisterPage v-else-if="index===1" @listenEvent="changeIndex" />
    <FindPassword v-else @listenEvent="changeIndex"/>
  </div>

</template>

<script>
import RegisterPage from '@/views/login/register'
import Login from '@/views/login/login'
import FindPassword from '@/views/login/FindPassword'

export default {
  name: 'LoginPage',
  components: { FindPassword, Login, RegisterPage },
  data() {
    return {
      index: 0
    }
  },
  methods: {
    changeIndex(i) {
      // console.log('change')
      this.index = i
    }
  }
}
</script>

<style scoped>

</style>
