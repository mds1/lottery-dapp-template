<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" class="Site">

    <!-- once per "session" check to ensure: -->
    <!--   1. MetaMask is installed -->
    <!--   2. MetaMask account is unlocked -->
    <!--   3. MetaMask is connected to the correct network -->
    <!-- alert user if any of these conditions are not met -->
    <!-- here, a "session" counts as a visit to the site -->
    <!-- reloading the page starts a new "session" and thus shows the dialog again -->
    <app-meta-mask-check/>

    <!-- header -->
    <div class="Site-header">
      <app-header/>
    </div>

    <!-- main section -->
    <main class='Site-content'>
      <router-view/>
    </main>

    <!-- footer -->
    <div class="Site-footer">
      <div id="footerBar"/>
      <app-footer/>
    </div>

  </div>
</template>

<script>
/*
TO DO:
  0. Make sure user inputs are sanitized
  1. Better handling of seed phrase and Infura API key
  2. Add contract tab in header to show embedded smart contract code
  3. Add "status" box near the header showing MetaMask
  4. Read Web3 design principles at the link below and incorporate ideas
     https://medium.com/@lyricalpolymath/web3-design-principles-f21db2f240c1
*/

/*
 * Root component
 */
import MetaMaskCheck from '@common/MetaMaskCheck.vue'
import Header from '@common/Header.vue'
import Footer from '@common/Footer.vue'

export default {
  components: {
    appMetaMaskCheck: MetaMaskCheck,
    appHeader: Header,
    appFooter: Footer,
  },

  created() {
    // dispatch actions for MetaMask checks
    this.$store.dispatch('set_requiredNetwork') // check required network
    this.$store.dispatch('set_currentNetwork') // check network currently connected to
    this.$store.dispatch('set_isMetaMaskInstalled') // ensure MetaMask is installed
    this.$store.dispatch('set_isMetaMaskUnlocked') // ensure MetaMask is unlocked (async)
    this.$store.dispatch('set_isMetaMaskOnCorrectNetwork') // ensure MetaMask is connected to the correct network (async)
  },
}
</script>

<style lang="stylus">
// "variables" is a Webpack alias which points to /src/themes/quasar.variables.styl
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
