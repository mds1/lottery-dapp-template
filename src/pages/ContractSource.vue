<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <h3>Smart Contract Source Code</h3>
    <p>This smart contract is located at
      <a :href='this.addressURL' target='_blank'>{{ this.address }}</a>
    </p>
  </div>
</template>

<script>
import lottery from '@ethereum/lotteryInstance.js'
import {createEtherscanAddressLink} from '@components/common/functions'

export default {
  data() {
    return {
      address: lottery._address,
      addressURL: '',
      code: '',
    }
  },

  created() {
    // Generate transaction link
    this.addressURL = createEtherscanAddressLink(this.$store.state.network.required, this.address)

    // Read solidity contract
    // const fr = new FileReader()
  },
}
</script>

<style>

</style>
