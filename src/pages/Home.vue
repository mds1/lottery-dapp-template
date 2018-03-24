<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- check to ensure: -->
    <!--   1. MetaMask is installed -->
    <!--   2. MetaMask account is unlocked -->
    <!--   3. MetaMask is connected to the correct network -->
    <app-meta-mask-check></app-meta-mask-check>

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
import { currentNetwork } from '@common/functions'
// components
import EnterForm from '@contract/EnterForm.vue'
import MetaMaskCheck from '@common/MetaMaskCheck.vue'

// TO DO:
//   0. Make sure user inputs are sanitized with regexp
//   1. Add a popup when the user loads the home page that checks:
//        - If they have MetaMask installed
//        - If so, check if their MetaMask account is unlocked
//        - Then check that they are connected to the right network
//   2. Update Lottery.sol to:
//        - Use Oraclize or Town crier for random number generation
//        - Set a user's chance of winning equal to entryPaid / potSize
//   3. Add contract tab in header to show embedded smart contract code
//

export default {
  data() {
    return {
      contract: lottery,
      network: ''
    }
  },

  components: {
    appMetaMaskCheck: MetaMaskCheck,
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
