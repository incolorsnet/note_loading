<template lang="pug">
footer.l_footer
  .p_f
    .p_f-header
      .c_inner
        .p_f-logo: nuxt-link(to="/"): span 毎週すばやくなりたい
        nav.p_f_navi
          ul.p_f_navi-list.c_col-c-pc
            li.p_f_navi-list-item.c_inner-sp(v-for="(t, k) in navigations.all")
                nuxt-link.p_f_navi-link(:to="t.url",
                  v-if="t.blank !== true",
                  @click.native="click(k)"
                )
                  span.p_f_navi-text {{t.text}}
                  i.p_f_navi-bar(v-bind:style="{ width: '100%', left: 0, right: 0, margin: 'auto' }"): span.-bar

                a.p_f_navi-link(:href="t.url",
                  v-else,
                  target="_blank",
                  @click="click(k)"
                )
                  span.p_f_navi-text {{t.text}}
                  i.p_f_navi-bar(v-bind:style="{ width: '100%', left: 0, right: 0, margin: 'auto' }"): span.-bar
    .p_f-footer
      .c_inner
        .p_f-text
          p.p_f-copyright: small 慢心したい ダンシングしたい
</template>

<script>
export default {
  data: function () {
    return {
      navigations: {
        all: []
      }
    }
  },
  created: function () {
    this.navigations.all = this.$store.state.navi.all
  },
  methods: {
    click: function (key) {
      this.$store.commit('NAVI_CURRENT_POS', key)
    }
  }
}
</script>

<style lang="scss" scoped>
.l_footer {
}

.p_f {
  padding: rem(130,2) 0 rem(64,2);
  position: relative;

  &-header {
    margin: 0 0 rem(10);
  }

  &-logo {
    display: block;
    margin: 0 auto;
    font-weight: bold;
    text-align: center;

    a:hover {
      @include pc {
        @include hover();
      }
    }
  }

  &-footer {
  }

  &-copyright {
    @include fo_google();
    text-align: center;
    font-weight: 700;
    color: $color;
    font-size: rem(10);
  }
}

.p_f_navi {
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
      padding: rem(30) rem(16);
    }
    font-size: rem(12);
    color: $color;
    padding: rem(18) 0 rem(10);
    text-align: center;
    font-weight: bold;
    display: block;
    position: relative;
  }
  &-link:hover &-bar .-bar {
    width: rem(35);
    opacity: 1;
  }
  &-text {
    @include fo_google();
    font-weight: 700;
    display: inline-block;
    letter-spacing: $ltsp;
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
      transition: all .3s ease;
      width: 0;
      height: 3px;
      background: $color;
      display: block;
      margin: 0 auto;
    }
  }
}

</style>
