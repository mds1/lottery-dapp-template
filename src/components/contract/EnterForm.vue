<template>
  <!-- main file for sending transaction to smart contract -->
  <div>
    <div class="form">
      <form @submit.prevent='formSubmitted'>

        <!-- div for all required inputs -->
        <div class="inputs">
          <q-field
            label="Value"
            :label-width='5'
            :error="$v.value.$error"
            :error-label="`Value must be greater than or equal to ${minValue}`">

            <q-input
              v-model='value'
              type='number'
              :min=minValue
              :step='0.0001'
              @input="$v.value.$touch()"
              placeholder='0'
              suffix='ETH'
              autofocus/>
          </q-field>
        </div> <!-- end inputs div  -->

        <br>

        <!-- button to send transaction -->
        <q-btn :loading='txsent' color="primary" :disabled='$v.$invalid || txsent' v-model='txsent'>
          Enter Lottery!
          <!-- configure button appearance for pending transactions  -->
          <q-spinner slot="loading" />
          <span slot="loading">&nbsp;&nbsp;Transaction pending...</span>
        </q-btn>

      </form>
    </div>  <!-- end form div  -->
  </div>
</template>

<script>

import lottery from '@ethereum/lotteryInstance.js'
import web3 from '@ethereum/web3'
import { required, minValue } from 'vuelidate/lib/validators'
import * as functions from '@common/functions.js'

export default {
  data() {
    return {
      value: 0, // default
      minValue: 0.005, // minimum allowed value defined in contract
      txsent: false,
      txhash: '',
      requiredNetwork: this.$store.state.network.required,
    }
  },

  // props: ['network'],

  validations: {
    // validate value entered into input field
    value: {
      required,
      minValue(value) {
        return minValue(this.minValue)(value)
      },
    },
  },

  methods: {
    async formSubmitted() {
      // validate data and state, and then send the transaction

      let _this = this // used to access props within promise
      this.txsent = true // update status of transaction

      // define variables used to store alert message windows
      // let waitingAlert
      // let sentAlert
      // let failedAlert // eslint-disable-line no-unused-vars
      // let confirmedAlert // eslint-disable-line no-unused-vars

      // get list of accounts to send tx
      const accounts = await web3.eth.getAccounts()

      // CHECK NUMBER 1: ensure account is unlocked
      if (accounts[0] === undefined) {
        // display failed message to user
        const failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>Be sure to unlock ' +
          'your account to send this transaction. Check MetaMask and enter your password if necessary.<br><br><br>'
        functions.createTXAlert(failedHTML, 'negative')
        // reset status of txsent flag, so user can send another tx if desired
        this.txsent = false
        return
      }

      // CHECK NUMBER 2: ensure the user is on the right network
      if (this.$store.state.network.current.toUpperCase() !== this.requiredNetwork.toUpperCase()) {
        // display failed message to user
        const failedHTML = `<br><br><b>Oops! Something went wrong...</b><br>You must be connected to the ${this.requiredNetwork} ` +
          `network to send this transaction. You are currently connected to the ${this.$store.state.network.current} network.<br><br><br>`
        functions.createTXAlert(failedHTML, 'negative')
        // reset status of txsent flag, so user can send another tx if desired
        this.txsent = false
        return
      }

      // NOW BOTH CHECKS PASSED: continue with transaction
      // generate alert that transaction will be sent
      const waitingHTML = '<br><br>Please confirm the transasction using the pop-up MetaMask dialog<br><br><br>'
      functions.createTXAlert(waitingHTML, 'info')

      // send tx, with assumption that the first account is the account to send tx from
      const valueInWei = web3.utils.toWei(String(this.value), 'ether')
      await lottery.methods.enterLottery().send({
        from: accounts[0],
        value: valueInWei,
      })

        .on('transactionHash', function(txhash) {

          // save off txhash for later
          _this.txhash = txhash
          // dismiss old alert
          functions.deleteAllTXAlerts()
          // prepare new message
          const sentHTML1 = '<br><br>Waiting for the transaction to be confirmed by the Ethereum network. ' +
            'This will take between 15 and 60 seconds, but sometimes can be even longer. Click the transaction ' +
            'ID below for more information on the status of your transaction.<br><br>'
          // generate hyperlink to the transaction on ethercsan
          const txidHTML = functions.createTXLink(_this.requiredNetwork, _this.txhash)
          // finish generating message
          const sentHTML = `${sentHTML1} ${txidHTML} <br><br><br>`
          // display updated message to user
          functions.createTXAlert(sentHTML, 'warning')

        }) // end .on('transactionHash')

        .on('receipt', function(receipt) {

          // receipt.status returns 0x0 if transaction fails, or 0x1 if it succeeds
          web3.eth.getTransactionReceipt(_this.txhash).then(function(receipt) {

            if (receipt.status === '0x0') {
              // TRANSACTION FAILED
              // dismiss previous alert
              functions.deleteAllTXAlerts()
              // shorten long error messages that may contain code references
              const errmsg = functions.trimErrorMessage(err.message) // eslint-disable-line no-undef
              // generate hyperlink to the transaction on ethercsan
              const txidHTML = functions.createTXLink(_this.requiredNetwork, _this.txhash)
              // finish generating message
              let failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>' + errmsg + ' For reference, your transaction ID is below.<br><br>' + txidHTML + '<br><br><br>'
              // display updated alert to user
              functions.createTXAlert(failedHTML, 'negative')
              // re-throw error so it shows in the console
              throw new Error(err) // eslint-disable-line no-undef

            } else {
              // TRANSACTION SUCCEEDED

              // currently returns the warning below:

              // Warning: a promise was created in a handler at webpack-internal:///./node_modules/web3-core-method/src/index.js:346:44 but was not returned from it, see http://goo.gl/rRqMUw
              //     at new Promise (webpack-internal:///./node_modules/bluebird/js/browser/bluebird.js:2845:10)
              //     at PromiEvent (webpack-internal:///./node_modules/web3-core-promievent/src/index.js:35:24)
              //     at Eth.send [as getTransactionReceipt] (webpack-internal:///./node_modules/web3-core-method/src/index.js:446:21)
              //     at Promise.eval (webpack-internal:///./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/contract/EnterForm.vue:111:87)
              //     at Promise.emit (webpack-internal:///./node_modules/eventemitter3/index.js:116:35)
              //     at eval (webpack-internal:///./node_modules/web3-core-method/src/index.js:346:44)
              // From previous event:
              //     at checkConfirmation (webpack-internal:///./node_modules/web3-core-method/src/index.js:340:14)

              // once tx is confirmed, dismiss old alert and give an update
              functions.deleteAllTXAlerts()
              // generate hyperlink to the transaction on ethercsan
              const txidHTML = functions.createTXLink(_this.requiredNetwork, _this.txhash)
              // finish generating message
              const confirmedHTML = `<br><br><b>Success!</b><br>Your transaction has been confirmed. For reference, your transaction ID is below.<br><br> ${txidHTML} <br><br><br>`
              // display updated alert to user
              functions.createTXAlert(confirmedHTML, 'positive')

            } // end if receipt.status === '0x0' / else
          }) // end web3.eth.getTransactionReceipt
        }) // end .on(receipt)

        .catch(function(err) {

          // if tx fails, dismiss any old alerts, then give an update
          functions.deleteAllTXAlerts()

          // shorten long error messages that may contain code references
          const errmsg = functions.trimErrorMessage(err.message)

          let failedHTML
          // finish generating message
          if (_this.txhash === '') {
            // transaction was never sent, so don't include transaction ID
            failedHTML = `<br><br><b>Oops! Something went wrong...</b><br> ${errmsg} <br><br><br>`
          } else {
            // generate hyperlink to the transaction on ethercsan
            const txidHTML = functions.createTXLink(_this.requiredNetwork, _this.txhash)
            // include transaction ID in error message
            failedHTML = `<br><br><b>Oops! Something went wrong...</b><br> ${errmsg} For reference, your transaction ID is below.<br><br> ${txidHTML} <br><br><br>`
          }

          // display alert
          functions.createTXAlert(failedHTML, 'negative')

          // re-throw error so it shows in the console
          throw new Error(err)
        }) // end catch

        .finally(function() {
          // reset status of txsent flag, so user can send another tx if desired
          _this.txsent = false
        }) // end finally

    }, // end formSubmitted
  }, // end methods
} // end export default
</script>

<style lang="stylus" scoped>
.form, .inputs {
  margin: auto;
}

.form {
  max-width: 640px;
}

.inputs {
  max-width: 320px;
}
</style>
