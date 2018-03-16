<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <h4>Send a Transaction</h4>

    <div class="form">
      <form v-on:submit.prevent='formSubmitted'>

        <div class="value">
          <app-value-field></app-value-field>
        </div>

        <br>

        <div class="address">
          <app-address-field></app-address-field>
        </div>

        <br><br>

        <div class="gas">
          <app-gas-slider></app-gas-slider>
        </div>

        <br><br>

        <!-- <app-send-button :$v=$v :txsent=txsent :buttonText=buttonText></app-send-button> -->
        <app-send-button :txsent=txsent :buttonText=buttonText></app-send-button>

      </form>
    </div>

  </div>
</template>

<script>
import AddressField from '@components/transaction/AddressField'
import ValueField from '@components/transaction/ValueField'
import GasSlider from '@components/transaction/GasSlider'
import SendButton from '@components/transaction/SendButton'

import * as functions from '@components/functions.js'
import web3 from '@ethereum/web3'

export default {
  data() {
    return {
      buttonText: 'Submit Transaction',
      txsent: false
    }
  },

  // NEXT:
  //  - then, create a dapp-components template and use the tx sending as an example
  //  - then, update lottery dapp example

  //  - learn about zk-snarks

  components: {
    appAddressField: AddressField,
    appValueField: ValueField,
    appGasSlider: GasSlider,
    appSendButton: SendButton
  },

  created() {
    // set default account in transactionObject
    this.$store.dispatch('setFromAddress')
  },

  methods: {
    async formSubmitted() {
      // used to access props within promise
      let vm = this;

      // update status of transaction
      this.txsent = true

      // define variables used to store alert message windows
      let waitingAlert;
      let sentAlert;
      let failedAlert;
      let confirmedAlert;

      // get list of accounts to send tx
      const accounts = await web3.eth.getAccounts()

      // ensure account is unlocked
      if (accounts[0] == undefined) {
        // prepare HTML string
        const failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>Be sure to unlock your account to send this transaction. Check MetaMask and enter your password if necessary.<br><br><br>'
        // display failed message to user
        failedAlert = functions.createTXAlert(failedHTML, 'negative')
        // reset status of txsent flag, so user can send another tx if desired
        this.txsent = false
        return
      }

      // if account is unlocked, ensure the user is on the right network
      const network = await functions.currentNetwork() // network currently connected to
      if (network.toUpperCase() !== functions.requiredNetwork().toUpperCase()) {
        // prepare HTML string
        const failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>You must be connected to the ' + functions.capitalizeFirstLetter(functions.requiredNetwork()) + ' network to send this transaction. You are currently connected to the ' + functions.capitalizeFirstLetter(network) + ' network.<br><br><br>'
        // display failed message to user
        failedAlert = functions.createTXAlert(failedHTML, 'negative')
        // reset status of txsent flag, so user can send another tx if desired
        this.txsent = false
        return
      }

      // generate alert that transaction will be sent
      const waitingHTML = '<br><br>Please confirm the transasction using the pop-up MetaMask dialog<br><br><br>'
      // const waitingHTML = 'ff\n\nPlease confirm the transasction using the pop-up MetaMask dialog<br><br><br>'
      waitingAlert = functions.createTXAlert(waitingHTML, 'info')

      // ------------------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------------------
      // Between the dashed lines is the section where we interact with the Ethereum blockchain


      // send tx, with assumption that the first account is the account to send tx from
      await web3.eth.sendTransaction(this.$store.state.transactionObject)

        .on('transactionHash', function (txhash) {

          // save off txhash for later
          vm.txhash = txhash
          // dismiss old alert
          waitingAlert()
          // prepare new message
          const sentHTML1 = '<br><br>Waiting for the transaction to be confirmed by the Ethereum network. This will take between 15 and 60 seconds, but sometimes can be even longer. Click the transaction ID below for more information on the status of your transaction.<br><br>'
          // generate hyperlink to the transaction on ethercsan
          const txidHTML = functions.createTXLink(network, vm.txhash)
          // finish generating message
          const sentHTML = sentHTML1 + txidHTML + '<br><br><br>'
          // display updated message to user
          sentAlert = functions.createTXAlert(sentHTML, 'warning')

        })

        .on('receipt', function (receipt) {

          // receipt.status returns 0x0 if transaction fails, or 0x1 if it succeeds
          web3.eth.getTransactionReceipt(vm.txhash).then(function (receipt) {
            if (receipt.status === '0x0') {
              // ##########################  TRANSACTION FAILED  ##########################

              // dismiss previous alert
              sentAlert()
              // write error to console
              console.log(err)
              // shorten long error messages that may contain code references
              const errmsg = functions.trimErrorMessage(err.message)
              // generate hyperlink to the transaction on ethercsan
              const txidHTML = functions.createTXLink(network, vm.txhash)
              // finish generating message
              let failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>' + errmsg + ' For reference, your transaction ID is below.<br><br>' + txidHTML + '<br><br><br>'
              // display updated alert to user
              failedAlert = functions.createTXAlert(failedHTML, 'negative')

            } else {   // receipt.status == 0x1
              // ##########################  TRANSACTION SUCCEEDED  ##########################

              // currently returns the warning below:

              // Warning: a promise was created in a handler but was not returned from it, see http://goo.gl/rRqMUw
              //     at new Promise (webpack-internal:///111:2845:10)
              //     at PromiEvent (webpack-internal:///109:35:24)
              //     at Eth.send [as getTransactionReceipt] (webpack-internal:///25:446:21)
              //     at Promise.eval (webpack-internal:///152:100:91)
              //     at Promise.emit (webpack-internal:///110:116:35)
              //     at eval (webpack-internal:///25:346:44)
              //     at <anonymous>
              // From previous event:
              //     at checkConfirmation (webpack-internal:///25:340:14)

              // once tx is confirmed, dismiss old alert and give an update
              sentAlert()
              // generate hyperlink to the transaction on ethercsan
              const txidHTML = functions.createTXLink(network, vm.txhash)
              // finish generating message
              const confirmedHTML = '<br><br><b>Success!</b><br>Your transaction has been confirmed. For reference, your transaction ID is below.<br><br>' + txidHTML + '<br><br><br>'
              // display updated alert to user
              confirmedAlert = functions.createTXAlert(confirmedHTML, 'positive')
            }
          })
        })

        .catch(function (err) {

          // if tx fails, dismiss old alert and give an update
          if (typeof waitingAlert !== 'undefined') {
            waitingAlert()
          }
          if (typeof sentAlert !== 'undefined') {
            sentAlert()
          }

          // write error to console
          console.log(err)

          // shorten long error messages that may contain code references
          const errmsg = functions.trimErrorMessage(err.message)

          // finish generating message
          let failedHTML;
          if (vm.txhash === '') {
            // transaction was never sent, so don't include transaction ID
            failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>' + errmsg + '<br><br><br>'
          } else {
            // generate hyperlink to the transaction on ethercsan
            const txidHTML = functions.createTXLink(network, vm.txhash)
            // include transaction ID in error message
            failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>' + errmsg + ' For reference, your transaction ID is below.<br><br>' + txidHTML + '<br><br><br>'
          }

          // display alert
          failedAlert = functions.createTXAlert(failedHTML, 'negative')

        })

        .finally(function () {

          // reset status of txsent flag, so user can send another tx if desired
          vm.txsent = false

        });

      // End of  section where we interact with the Ethereum blockchain
      // ------------------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------------------

    }
  },


}
</script>

<style lang="stylus">
.form {
  margin: auto;
  max-width: 800px;
}

.address, .gas {
  margin: auto;
  max-width: 600px;
}

.value {
  margin: auto;
  max-width: 320px;
}
</style>

