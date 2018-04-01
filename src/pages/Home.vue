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
