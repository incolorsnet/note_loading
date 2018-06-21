<template lang="pug">
  div.p_progress(v-if="loading")
    div.p_progress-door.p_progress-door-top(ref="top")
    div.p_progress-door.p_progress-door-bottom(ref="bottom")
    div.p_progress-inner(ref="logo")
      div.p_progress-logo
        p {{progressNowCount}}
      div.p_progress-bar
        div.-bar(v-bind:style="{width: progressNowPosition + '%'}")
</template>

<script>
import imagesLoaded from 'imagesloaded'
import { TweenMax } from 'gsap'

export default {
  data: () => ({
    loading: true,
    width: 0,
    loadedImg: 0,
    progressNowPosition: 0,
    progressNowCount: 0,
    imgNum: null,
    container: null,
    imgLoaded: null,
    timer: null,
    content: null,
    counter: null,
  }),
  mounted: function () {
    this.container = document.querySelector('#js_container')

    let imgLoaded = imagesLoaded(this.container)

    if (imgLoaded.images.length > 0) {
      this.imgNum = imgLoaded.images.length
      this.timer = setInterval(this.progressMonitor, 1000/50)
      imgLoaded.on('progress', function(instance, image) {
        this.loadedImg++
      })
    } else {
      this.imgNum = 100
      this.timer = setInterval(this.progressMonitor, 1000/50)

      this.counter = setInterval(() => {
        this.loadedImg++
        if (this.loadedImg >= 100) {
          clearInterval(this.counter)
        }
      }, 20)
    }
  },
  methods: {
    start() {
      this.loading = true
      this.$store.commit('IS_LOADING', true)
    },
    finish() {
      this.loading = false
      this.$store.commit('IS_LOADING', false)
    },
    fadeContainer: function () {
      let t = this
    },
    hideLogo: function () {
      let t = this
      let logo = this.$refs.logo
      TweenMax.to(logo, .8, {
        autoAlpha: 0,
        ease: Power2.easeOut,
        onComplete: t.fadeDoor(),
      })
    },
    fadeDoor: function () {
      let t = this
      let el = [
        this.$refs.top,
        this.$refs.bottom
      ]

      // this.showEyecatch()

      TweenMax.to(el, .8, {
        delay: .5,
        height: 0,
        ease: Power2.easeOut,
        onComplete: function () {
          // let ec = document.querySelector('#js-ec')
          // ec.classList.add('visible')
          t.finish()
        }
      })
    },
    showEyecatch () {
      let ec = document.querySelector('#js-ec')
      TweenMax.to(ec, .1, {
        delay: .5,
        onComplete: function () {
          ec.classList.add('visible')
          TweenMax.to(document.querySelector('#main'), .8, {
            delay: .8,
            autoAlpha: 1,
            ease: Power2.easeOut,
          })
        }
      })
    },
    progressMonitor: function () {
      let progressPosition = (this.loadedImg/this.imgNum) * 100

      this.progressNowPosition += (progressPosition-this.progressNowPosition) * 0.1
      this.progressNowCount = this.progressNowPosition.toFixed(0)

      if (this.progressNowPosition >= 100) {
        clearInterval(this.timer)
        this.hideLogo()
        this.fadeContainer()
      }

      if (this.progressNowPosition > 99.9) {
        this.progressNowPosition = 100
      }
    },
  },
}
</script>

<style scoped lang="scss">
.p_progress {
  @include pc {
    min-width: $min_l#{px};
  }
  width: 100%;
  height: 100%;
  min-width: $min_s#{px};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  opacity: .3;

  &-door {
    width: 100%;
    height: 50%;
    display: block;
    position: absolute;
    left: 0;

    &-top {
      @include pc {
        // background: url("~/assets/img/loading_top_bg.jpg") center bottom no-repeat;
        background-size: cover;
        background-color: #2dc7ac;
      }
      top: 0;
      // background: url("~/assets/img/sp/loading_top_bg.jpg") center bottom no-repeat;
      background-size: cover;
      background-color: #2dc7ac;
    }

    &-bottom {
      @include pc {
        // background: url("~/assets/img/loading_bottom_bg.jpg") center top no-repeat;
        background-size: cover;
        background-color: #2dc7ac;
      }
      bottom: 0;
      // background: url("~/assets/img/sp/loading_bottom_bg.jpg") center top no-repeat;
      background-size: cover;
      background-color: #2dc7ac;
    }
  }

  &-inner {
    width: rem(74);
    height: rem(66);
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-130%);
    margin: auto;
  }

  &-logo {
    width: rem(68);
  }

  &-bar {
    width: 100%;
    height: 3px;
    background: #e0dede;
    position: relative;
    margin: rem(45) 0 0;

    .-bar {
      width: 0;
      height: 100%;
      background: #231815;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
