<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">

    <!-- your content -->
    <h3>Ethereum Lottery</h3>
    <p>This is the home page for the Ethereum lottery contract {{ contract.options.address }} </p>
    <p>This contract is managed by {{ this.$store.state.contract.manager }}</p>
    <p>There are currently {{ this.$store.state.contract.players.length }} players entered competing for a prize of {{ this.$store.state.contract.balance }} ETH!</p>
    <br>
    <p>You are currently connected to the {{ this.$store.state.network.current }} network</p>

    <app-enter-form/>

  </div>
</template>

<script>
import lottery from '@ethereum/lotteryInstance.js'
import EnterForm from '@contract/EnterForm.vue'

// TO DO:
//   0. Make sure user inputs are sanitized with regexp
//   1. Add a popup when the user loads the home page that checks:
//        - If they have MetaMask installed
//        - If so, check if their MetaMask account is unlocked
//        - Then check that they are connected to the right network (if not, use infura node)
//      Next steps here: finish actions/mutations, and dispatch them in the created hook
//   2. Update Lottery.sol to:
//        - Use Oraclize or Town crier for random number generation
//        - Set a user's chance of winning equal to entryPaid / potSize
//   3. Add contract tab in header to show embedded smart contract code
//   4. Read Web3 design principles at the link below and add corresponding features
//      https://medium.com/@lyricalpolymath/web3-design-principles-f21db2f240c1

export default {
  data() {
    return {
      contract: lottery,
    }
  },

  components: {
    appEnterForm: EnterForm,
  },

  created() {
    // Get contract properties since they're used on this page
    this.$store.dispatch('setManager') // get address of manager
    this.$store.dispatch('setPlayers') // get list of players
    this.$store.dispatch('setBalance') // get contract balance
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables';

.main {
  margin-top: auto;
}
</style>
