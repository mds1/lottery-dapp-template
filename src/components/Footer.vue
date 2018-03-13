<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div>

    <div class="row justify-between">
      <!-- First column  -->
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 footer-col">
        <p class="footer-large">Donations are greatly appreciated!</p>
        <p class="footer-small">ETH: 0x0000000000000000000000000000000000000000</p>
        <p class="footer-small">BTC: 0000000000000000000000000000000000</p>
      </div>

      <!-- Second column  -->
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 footer-col">
        <p class="footer-large">Check out the source code on GitHub</p>
        <a class="footer-small" href="https://github.com/mds1/KeyStats">https://github.com/mds1/sitename</a>
      </div>

      <!-- Third column  -->
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 footer-col">
        <p class="footer-large">Questions, feedback, and suggestions</p>
        <p class="footer-small">contact@sitename.com</p>
        <br>
        <p class="footer-end-left">SiteName &copy; 2018</p>
      </div>

    </div>
    <!-- </q-toolbar> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
// "variables" is a Webpack alias (defined in /config/index.js) which points to /src/themes/quasar.variables.styl
@import '~variables';

// 3-column footer formatting
// Here, only text syling and responsiveness of the footer is done. The sticky layout is done in App.vue
.Site-footer {
  text-align: center;
  background: $primary;
}

.footer-small, .footer-end-left, .footer-end-right {
  font-size: small;
  // max-width: 90%;
  color: $neutral;
}

.footer-small {
  margin: 0% 4% 0% 4%;
}

.footer-end-left, .footer-end-right {
  color: $info;
  margin: 0% 4% 4% 4%;
}

.footer-end-left {
  float: left;
}

.footer-end-right {
  float: right;
}

.footer-large {
  font-size: medium;
  margin: 4% 4% 0% 4%;
  font-weight: 500;
  color: $neutral;
}

.footer-col {
  float: left;
  text-align: left;
  // width: 33%;
}
</style>
