<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <h3>Smart Contract Source Code</h3>
    <p>This smart contract is located at
      <a :href='this.addressURL' target='_blank'>{{ this.address }}</a>
    </p>

    <pre>
      <code>
      {{ this.code }}
      </code>
    </pre>

  </div>
</template>

<script>
import lottery from '@ethereum/lotteryInstance.js'
import {createEtherscanAddressLink, getSourceCodeFromEtherscan} from '@components/common/functions'

export default {
  data() {
    return {
      address: lottery._address,
      addressURL: '',
      code: '',
    }
  },

  created() {
    // Get network and contract address
    const network = this.$store.state.network.required
    const address = this.address

    // Generate transaction link
    this.addressURL = createEtherscanAddressLink(network, address)

    // Get source code (this function is in progress)
    this.code = getSourceCodeFromEtherscan(network, address)
  },

}
</script>

<style lang="stylus">
pre, code {
  // why "monospace, monospace"? see https://stackoverflow.com/questions/38781089/font-family-monospace-monospace
  font-family: monospace, monospace;
}

code {
  overflow: auto;
}

code {
  display: block;
  padding: 1rem;
  word-wrap: normal;
}
</style>
