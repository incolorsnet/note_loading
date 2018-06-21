<template lang="pug">
header.l_header
  .p_h
    .c_col-pc.u_col-ai-c.u_col-jc-sb.c_inner-pc
      .p_h-l
        .c_inner-sp
          nuxt-link.p_h-l-logo(to="/" @click.native="close(0)")
            span 一番すばやくなりたい
      .p_h-r
        transition(@enter="enter", @leave="leave", :css="false")
          .p_h-r-navi(v-show="!$store.state.isSmartPhone || show" ref="naviList")
            nav.p_h_navi(@mouseleave="resetBarPos" @click="show = !show")
              .p_h_navi-bar(ref="bar" v-show="naviBarSlideAnim"): span.-bar
              ul.p_h_navi-list.c_col-pc

                li.p_h_navi-list-item.c_inner-sp(:class="{current: $store.state.navi.currentPos === k}"
                  v-for="(t, k) in navigations.list" ref="naviItem")
                  nuxt-link.p_h_navi-link(:to="t.url",
                    @click.native="close(k), mouseOver",
                    @mouseover.native="mouseOver(k)",
                    :class="{ 'hover': !naviBarSlideAnim }",
                    v-if="!t.blank",
                  )
                    span.p_h_navi-tag(v-if="t.tag") {{t.tag}}
                    span.p_h_navi-text {{t.text}}
                    i.p_h_navi-bar(v-if="!naviBarSlideAnim" v-bind:style="{ width: '100%', left: 0, right: 0, margin: 'auto' }"): span.-bar

                  a.p_h_navi-link(:href="t.url",
                    @click="close(k), mouseOver",
                    @mouseover="mouseOver(k)",
                    :class="{ 'hover': !naviBarSlideAnim }",
                    v-else,
                    target="_blank"
                  )
                    span.p_h_navi-text {{t.text}}
                    i.p_h_navi-bar(v-if="!naviBarSlideAnim" v-bind:style="{ width: '100%', left: 0, right: 0, margin: 'auto' }"): span.-bar

        button.p_h_navi_btn(@click="show = !show", v-if="$store.state.isSmartPhone")
          span.p_h_navi_btn-inner
            span.-open(v-if="!show")
            span.-close(v-show="show")
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  watch: {
    getCurrentPageName: function () {
      this.current = $nuxt.$store.state.navi.currentPos
      this.resetBarPos()
    },
    show: function () {
      this.current = $nuxt.$store.state.navi.currentPos
      this.resetBarPos()
    }
  },
  props: {
    getCurrentPageName: String,
  },
  data: function () {
    return {
      navigations: {
        list: [
          { url: '/', text: 'TOP', blank: false },
          { url: '/contents1', text: 'CONTENTS', blank: false },
          { url: '/contents2', text: 'CONTENTS', blank: false },
          { url: '/contents3', text: 'CONTENTS', blank: false, },
          { url: '/contents4', text: 'CONTENTS', blank: false },
        ],
        items: [],
        el: [],
      },
      show: false,
      naviWidth: [],
      current: null,
      naviBarSlideAnim: true, // ナビゲーションの横棒がスライドするアニメーション
    }
  },
  created: function () {
    this.storeCommit()
  },
  mounted: function () {
    this.isSmartPhone()
    // this.show = !this.$store.state.isSmartPhone ? false : true
    this.getPageTitle()
    this.changeState()
    this.$nextTick(() => {
      this.resetBarPos()
    })

    let el = this.navigations.el = this.$refs.naviItem
    let currentPos = $nuxt.$store.state.navi.currentPos

    if (this.show === false) {
      TweenMax.set(this.$refs.naviList, {
        scale: .9,
        autoAlpha: 0,
        ease: Power2.easeOut,
      });
    }
  },
  methods: {
    ...mapActions(['isSmartPhone', 'getPageTitle']),
    mouseOver: function(el) {
      if(!this.naviBarSlideAnim) return false

      let t = this

      if (!t.$store.state.isSmartPhone) {

        if (!t.$store.state.navi.width.length) this.changeState()
        this.$nextTick(() => {
          let select = t.$store.state.navi.width.slice(0, el)
          let left = (el <= 0) ? 0 : select.reduce((p, c) => {
            return p + c
          })

          TweenMax.to(t.$refs.bar, .3, {
            autoAlpha: 1,
            width: t.$store.state.navi.width[el],
            left: left,
          })
        })
      }
    },
    resetBarPos: function(el) {
      let t = this
      let pos = (t.$store.state.navi.currentPos > -1) ? t.$store.state.navi.currentPos : -1

      if (pos === -1) {
        TweenMax.to(t.$refs.bar, .3, {
          autoAlpha: 0
        })
        return false
      }

      let select = t.$store.state.navi.width.slice(0, pos)
      let left = (pos <= 0) ? 0 : select.reduce((p, c) => {
        return p + c
      })

      TweenMax.to(t.$refs.bar, .3, {
        autoAlpha: 1,
        width: t.$store.state.navi.width[pos],
        left: left,
      })
    },
    storeCommit () {
      this.createNaviArray()
      this.$store.commit('NAVI_LIST', this.navigations.items)
      this.$store.commit('NAVI_ALL', this.navigations.list)
    },
    createNaviArray() {
      let list = this.navigations.list
      for (var i = 0; i < list.length; i++) {
        this.navigations.items.push(list[i].url)
      }
    },
    changeState: function () {
      if (!this.$store.state.isSmartPhone) {
        this.$nextTick(() => {
          let items = this.navigations.el

          for (var i = 0; i < items.length; i++) {
            let item = items[i]
            let width = item.clientWidth

            this.naviWidth.push(width)
          }
          this.$store.commit('NAVI_ITEM_WIDTH', this.naviWidth)
        })
      }
    },
    enter: function(el, done) {
      TweenMax.to(el, 0.4, {
        scale: 1,
        // y: 0,
        display: 'block',
        autoAlpha: 1
      });
    },
    leave: function(el, done) {
      TweenMax.to(el, 0.4, {
        scale: .9,
        // y: -5,
        display: 'none',
        autoAlpha: 0
      });
    },
    close: function (key) {
      if (this.isSmartPhone() === true) return
      this.$store.commit('NAVI_CURRENT_POS', key)
    },
  },
}
</script>

<style lang="scss" scoped>
.l_header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  border-bottom: 1px solid rgba(#000, .1);
}

.p_h {
  @include pc {
    background: rgba(#fff, .8);
  }

  &-l {
    @include sp {
      background: #fff;
      position: relative;
      z-index: 999;
    }
    font-weight: bold;
    &-logo {
      @include pc {
        width: rem(350,2);
        padding: rem(21) 0;
      }
      width: rem(300/2);
      display: block;
      line-height: 0;
      padding: rem(9) 0;
      position: relative;

      img {}
    }
  }

  &-r {
    }
    &_navi {
    @include sp {
      width: 100%;
      height: 100vh;
      background: rgba(#000, .7);
      position: fixed;
      top: rem(-60);
      left: 0;
    }
  }
}

.p_h_navi {
  position: relative;

  &-list {
    @include sp {
      background: #fff;
      margin: rem(60) 0 0;
    }
    &-item {}
  }
  &-link {
    @include pc {
      font-size: rem(14);
      padding: rem(28) rem(24) rem(28);
    }
    font-size: rem(12);
    color: $color;
    padding: rem(18) 0 rem(10);
    text-align: center;
    font-weight: bold;
    display: block;
    position: relative;
  }
  &-link.hover &-bar .-bar {
    opacity: 0;
    width: 0;
    transition: all .3s ease;
  }
  &-link.hover:hover &-bar .-bar {
    width: rem(35);
    opacity: 1;
  }
  &-tag {
    @include txtgr();
    font-size: rem(11);
    font-weight: bold;
    letter-spacing: $ltsp;
    display: block;
    text-align: center;
    position: absolute;
    top: rem(13);
    right: 0;
    left: 0;
    margin: auto;
  }
  &-text {
    @include fo_google();
    font-weight: 700;
    display: inline-block;
    letter-spacing: .2em;
    font-size: rem(12);
  }
  &-bar {
    @include pc {
    }
    height: 3px;
    display: block;
    position: absolute;
    bottom: rem(16);

    .-bar {
      width: rem(35);
      height: 3px;
      background: $color;
      display: block;
      margin: 0 auto;
    }
  }

  &-button {
    @include pc {
      width: rem(140);
      padding: rem(8) rem(9);
      border-radius: rem(30);
    }
    background: $palet3;
    text-align: center;
    display: block;
    width: 100%;
    padding: rem(18);

    &-text {
      font-size: rem(12);
      color: $color;
      font-weight: bold;
    }
  }
}

.p_h_navi_btn {
  width: rem(60);
  height: rem(45);
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;

  &-inner {
    width: rem(20);
    height: rem(34/2);
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .-open {
      width: 100%;
      height: 3px;
      border-radius: 3px;
      background: $color;
      position: absolute;
      display: block;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      &::before {
        content: "";
        width: 100%;
        height: 3px;
        border-radius: 3px;
        background: $color;
        position: absolute;
        display: block;
        margin: auto;
        left: 0;
        top: -7px;
      }
      &::after {
        content: "";
        width: 100%;
        height: 3px;
        border-radius: 3px;
        background: $color;
        position: absolute;
        display: block;
        margin: auto;
        left: 0;
        bottom: -7px;
      }
    }

    .-close {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      transform: rotate(45deg);

      &::before {
        content: "";
        display: block;
        width: 17px;
        height: 3px;
        border-radius: 3px;
        background: $color;
        position: absolute;
        display: block;
        margin: auto;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }

      &::after {
        content: "";
        display: block;
        width: 3px;
        height: 100%;
        border-radius: 3px;
        background: $color;
        position: absolute;
        display: block;
        margin: auto;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }
    }
  }
}
</style>
