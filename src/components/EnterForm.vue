<template>
  <!-- generic template for a form to send transaction to a smart contract -->
  <!-- place this file in the src/components folder -->
  <div>
    <div class="form">
      <form v-on:submit.prevent='formSubmitted'>

        <div class="inputs">
          <q-field label="Value" :label-width='5' :error="$v.value.$error" :error-label="'Value must be greater than or equal to ' + minValue">
            <q-input v-model='value' type='number' :min=minValue :step='0.0001' @input="$v.value.$touch()" placeholder='0' suffix='ETH' autofocus/>
          </q-field>
        </div>

        <br>

        <q-btn :loading='txsent' color="primary" :disabled='$v.$invalid || txsent' v-model='txsent'>Enter Lottery!
          <q-spinner slot="loading" />
          <span slot="loading">&nbsp;&nbsp;Transaction pending...</span>
        </q-btn>

      </form>
    </div>
  </div>
</template>

<script>
// TODO
//  1. check for any existing notifications and dismiss them -- THIS CURRENTLY DOES NOT WORK
//  2. Add regexp functions to sanitize user inputs

// Dependencies:
//   vuelidate: npm install vuelidate --save (did I include this in the template?)

// AFTERWARDS, UPDATE THE TEMPLATE WITH:
//   1. this file             -- done
//   2. functions.js          -- done
//   3. main.js               -- done
//   4. readme.md             -- done

import lottery from '@ethereum/lotteryInstance.js'
import web3 from '@ethereum/web3'
import { required, minValue } from 'vuelidate/lib/validators'
import decimal from 'vuelidate/lib/validators/decimal'
import * as functions from '@components/functions.js'

export default {
  data() {
    return {
      value: 0, // default
      minValue: 0.001, // minimum allowed value defined in contract
      txsent: false,
      txhash: ''
    }
  },

  props: ['network'],

  validations: {
    // validate value entered into input field
    value: {
      required,
      decimal,
      minValue(value) {
        return minValue(this.minValue)(value)
      }
    }

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
      if (vm.network.toUpperCase() !== functions.requiredNetwork().toUpperCase()) {
        // prepare HTML string
        const failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>You must be connected to the ' + functions.capitalizeFirstLetter(functions.requiredNetwork()) + ' network to send this transaction. You are currently connected to the ' + functions.capitalizeFirstLetter(vm.network) + ' network.<br><br><br>'
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


      // send tx, with assumption that the first account is the account to send tx from
      const valueInWei = web3.utils.toWei(String(this.value), 'ether')
      await lottery.methods.enterLottery().send({
        from: accounts[0],
        value: valueInWei
      })

        .on('transactionHash', function (txhash) {

          // save off txhash for later
          vm.txhash = txhash
          // dismiss old alert
          waitingAlert()
          // prepare new message
          const sentHTML1 = '<br><br>Waiting for the transaction to be confirmed by the Ethereum network. This will take between 15 and 60 seconds, but sometimes can be even longer. Click the transaction ID below for more information on the status of your transaction.<br><br>'
          // generate hyperlink to the transaction on ethercsan
          const txidHTML = functions.createTXLink(vm.network, vm.txhash)
          // finish generating message
          const sentHTML = sentHTML1 + txidHTML + '<br><br><br>'
          // display updated message to user
          sentAlert = functions.createTXAlert(sentHTML, 'warning')

        })

        .on('receipt', function (receipt) {

          // receipt.status returns 0x0 if transaction fails, or 0x1 if it succeeds
          web3.eth.getTransactionReceipt(vm.txhash).then(function (receipt) {
            if (receipt.status === '0x0') {
              // TRANSACTION FAILED --------------------------------------------------

              // dismiss previous alert
              sentAlert()
              // write error to console
              console.log(err)
              // shorten long error messages that may contain code references
              const errmsg = functions.trimErrorMessage(err.message)
              // generate hyperlink to the transaction on ethercsan
              const txidHTML = functions.createTXLink(vm.network, vm.txhash)
              // finish generating message
              let failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>' + errmsg + ' For reference, your transaction ID is below.<br><br>' + txidHTML + '<br><br><br>'
              // display updated alert to user
              failedAlert = functions.createTXAlert(failedHTML, 'negative')

            } else {
              // TRANSACTION SUCCEEDED -----------------------------------------------

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
              const txidHTML = functions.createTXLink(vm.network, vm.txhash)
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

          let failedHTML;
          // finish generating message
          if (vm.txhash === '') {
            // transaction was never sent, so don't include transaction ID
            failedHTML = '<br><br><b>Oops! Something went wrong...</b><br>' + errmsg + '<br><br><br>'
          } else {
            // generate hyperlink to the transaction on ethercsan
            const txidHTML = functions.createTXLink(vm.network, vm.txhash)
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
    }
  }
}
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
