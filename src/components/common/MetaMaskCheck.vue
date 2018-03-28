<template>
  <div>
    <!-- check to ensure: -->
    <!--   1. MetaMask is installed -->
    <!--   2. MetaMask account is unlocked -->
    <!--   3. MetaMask is connected to the correct network -->

    <!-- Check that MetaMask is installed -->
    <div v-if="!this.$store.state.MetaMask.isInstalled">
      <q-dialog v-model="showDialog" stack-buttons prevent-close @ok="onOk">
        <!-- Dialog title -->
        <span slot="title">Hold up!</span>

        <div slot="body">
          <p>
            You need to install MetaMask in order to use this site. To do so, follow the steps below:
            <ol>
              <!-- numbering and line breaks added manually, seems like they aren't working with QDialog component -->
              <li>1. Download and install
                <a href="https://metamask.io/" target="_blank">MetaMask</a>
              </li>
              <br>
              <li>
                2. Enable the extension and create a Metamask account
              </li>
              <br>
              <li>
                3. Fund your account with Ether (get some on
                <a href="https://www.coinbase.com/join/58791de0ee4668007f43b1ff" target="_blank">Coinbase</a>
                with this referral link)
              </li>
              <br>
              <li>
                4. Come back to this site and get started!
              </li>
            </ol>
          </p>
        </div>
      </q-dialog>
    </div>

    <!-- Check that MetaMask is unlocked -->
    <div v-if="!this.$store.state.MetaMask.isUnlocked">
      <q-dialog v-model="showDialog" stack-buttons prevent-close @ok="onOk">
      </q-dialog>
    </div>

    <!-- Check that MetaMask is connected to the required network -->
    <div v-if="!this.$store.state.MetaMask.isOnCorrectNetwork">
      <q-dialog v-model="showDialog" stack-buttons prevent-close @ok="onOk">
      </q-dialog>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { requiredNetwork, currentNetwork } from '@common/functions'

export default {
  data() {
    return {
    }
  },

  computed: {
    showDialog: {
      get: function () {
        return !this.$store.state.isMetaMaskInstalled || !this.$store.state.isMetaMaskUnlocked || !this.$store.state.isMetaMaskOnCorrectNetwork
      },
      set: function (value) {
        return value
      }
    }
  },

  created() {
    // ensure MetaMask is installed
    this.$store.dispatch('set_isMetaMaskInstalled')

    // ensure MetaMask is unlocked (async)
    this.$store.dispatch('set_isMetaMaskUnlocked')

    // ensure MetaMask is connected to the correct network (async)
    this.$store.dispatch('set_isMetaMaskOnCorrectNetwork')
  },

  methods: {
    // when props.ok() gets called
    onOk(data) {
      this.showDialog = false
    },
  }
}
</script>

<style lang="stylus">
</style>
