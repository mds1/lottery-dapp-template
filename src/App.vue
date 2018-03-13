<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" class="Site">
    <!-- header -->
    <div class="Site-header">
      <app-header></app-header>
    </div>

    <!-- main section -->
    <main class='Site-content'>
      <router-view></router-view>
    </main>

    <!-- footer -->
    <div class="Site-footer">
      <div id="footerBar"></div>
      <app-footer></app-footer>
    </div>

  </div>
</template>

<script>
/*
 * Root component
 */
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  }
}
</script>

<style lang="stylus">
// "variables" is a Webpack alias (defined in /config/index.js) which points to /src/themes/quasar.variables.styl
@import '~variables';

.layout-padding {
  margin-top: -70px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

// Font setup
#q-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2, strong {
  color: #333;
}

// Footer bar setup
#footerBar {
  height: 10px;
  background: $tertiary;
}

// default stuff with quasar-cli template
main {
  text-align: center;
  margin-top: auto;
}

header {
  margin: 0;
  height: 10px;
  background-color: $primary;
}

// Flexbox sticky footer (source: https://github.com/philipwalton/solved-by-flexbox/blob/master/assets/css/components/site.css)
// Here, only the sticky footer part of the footer is done. Text formatting and responsiveness is done in Footer.vue
.Site {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $background;
}

.Site-header, .Site-footer {
  flex: none;
}

.Site-header {
  // custom formatting not part of Flexbox sticky footer
  height: 100px;
}

.Site-content {
  flex: 1 0 auto;
  padding: var(--space) var(--space) 0;
  width: 100%;
}

.Site-content::after {
  content: '\00a0';
  display: block;
  margin-top: var(--space);
  height: 0px;
  visibility: hidden;
}

@media (--break-lg: ) {
  .Site-content {
    padding-top: var(--space-lg);
  }

  .Site-content::after {
    margin-top: var(--space-lg);
  }
}

.Site-content--full {
  padding: 0;
}

.Site-content--full::after {
  content: none;
}
</style>
