<template lang="pug">
div
  fade
    .c_inner
      .block._fade.fade_in.scale(v-for="key in 10") content
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import fade from '~/components/components/fade'

export default {
  components: {
    fade
  },
  mounted: function () {
  },
  methods: {
    ...mapActions([ 'getPageTitle' ]),
  }
}
</script>

<style scoped>
.block {
  text-align: center;
  padding: 60px 0;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
