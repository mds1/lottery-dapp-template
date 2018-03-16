<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <h3>Ethereum Lottery</h3>
    <p>This is the home page for the Ethereum lottery contract {{ contract.options.address }} </p>
    <p>This contract is managed by {{ this.$store.state.manager }}</p>
    <p>There are currently {{ this.$store.state.players.length }} players entered competing for a prize of {{ this.$store.state.balance }} ETH!</p>
    <br>
    <p>You are currently connected to the {{ network }} network</p>

    <app-enter-form :network=network></app-enter-form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import web3 from '@ethereum/web3'
import lottery from '@ethereum/lotteryInstance.js'
import { currentNetwork } from '@components/functions'
import EnterForm from '@components/EnterForm.vue'

export default {
  data() {
    return {
      contract: lottery,
      network: ''
    }
  },

  components: {
    appEnterForm: EnterForm,
  },

  created() {
    // Get contract properties
    // get address of manager
    this.$store.dispatch('setManager')
    // get list of players
    this.$store.dispatch('setPlayers')
    // get contract balance
    this.$store.dispatch('setBalance')

    // Check what network the user is connected to
    web3.eth.net.getId((err, netId) => {
      switch (netId) {
        case 1:
          this.network = 'Main'
          break
        case 2:
          this.network = 'Morden' // Morden test network is deprecated
          break
        case 3:
          this.network = 'Ropsten'
          break
        case 4:
          this.network = 'Rinkeby'
          break
        case 42:
          this.network = 'Kovan'
          break
        default:
          this.network = 'an unknown Network'
      }
    })
  },

  methods: {
    // map actions
    ...mapActions([
      'setManager',
      'setPlayers',
      'setBalance'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables';

.main {
  margin-top: auto;
}
</style>
