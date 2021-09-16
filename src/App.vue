<template>
  <div id="app">
    <router-view/>
    <AppTabBar></AppTabBar>
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
export default {
  components: {AppTabBar}
}
</script>

<style lang="less">
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video{
  font-size: 14px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  min-height:100%;
}
body, html{
  height:100%;
}
html{

}

p{
  font-size: 30px;
}
</style>
