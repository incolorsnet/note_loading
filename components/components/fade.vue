<template lang="pug">
  div
    loading
    slot
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { TweenMax } from 'gsap'
import loading from '~/components/loading'

export default {
  data () {
    return {
      current: this.$route.path,
    }
  },
  components: {
    loading
  },
  computed: {
    storeLoading () {
      if (!this.$store.state.isLoading) {
        this.waypoint()
      }
      return this.$store.state.isLoading
    },
  },
  mounted () {
    if (!this.$store.state.isLoading) {
      this.waypoint()
    }
  },
  methods: {
    waypoint: function () {
      let elem = this.$el.querySelectorAll('._fade')
      elem.forEach(x => {
        this.waypoint = new Waypoint({
          element: x,
          handler: () => {
            TweenMax.to(x, .4, {
              autoAlpha: 1,
              scale: 1,
            })
            // x.classList.add('visible')
            // this.x = 'true'
          },
          offset: '80%',
        })
      })
    },
  },
  beforeDestroy: function () {
    this.$store.commit('IS_LOADING', true)
  }
}
</script>

<style lang="scss">
.fade_in {
  opacity: 0;
  transition: opacity .8s ease, transform 1.2s ease;

  &.y {
    transform: translateY(100px);
  }

  &.y2 {
    transform: translateY(-150px);
  }

  &.x {
    transform: translateX(100px);
  }
  &.x2 {
    transform: translateX(-100px);
  }

  &.scale {
    transform: scale(1.05);
  }

  &.scale2 {
    transform: scale(.8);
  }

  &.blur {
    filter: blur(30px);
    opacity: 0;
    transition: all 1.2s ease-in-out;
  }

  &.visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}


.fade_in_slide {
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 1.8s ease;
    transform: translateX(-105%);
    background: #2dc7ac;
    z-index: 1;
  }
  &-inner {
    opacity: 0;
    transition: all .8s ease 1.3s;
  }

  &.visible::after {
    transform: translateX(105%);
  }

  &.visible &-inner {
    opacity: 1;
  }
}
</style>
