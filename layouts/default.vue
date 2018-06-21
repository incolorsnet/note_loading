<template lang="pug">
div.l_container#js_container
  the_header(:getCurrentPageName="$nuxt.$route.path")
  div.l_contents
    nuxt(:nuxt-child-key="$route.fullPath")
  the_footer
</template>

<script>
import { mapActions } from 'vuex'
import the_header from '~/components/the_header'
import the_footer from '~/components/the_footer'

export default {
  components: {
    the_header,
    the_footer,
  },
  mounted: function () {
    this.getPageTitle()
  },
  methods: {
    ...mapActions(['getPageTitle'])
  },
}
</script>

<style lang="scss">
.l_contents {
  @include pc {
    margin: rem(83) 0 0;
  }
  margin: rem(45) 0 0;
}

.main {
  background: linear-gradient(to top, rgba(#5ed8ac, .2), rgba(#4bc5de, .2) 45%, rgba(#fff, .2) 82%);
  background-attachment: fixed;
  padding: 0 0 rem(33);
}

</style>
