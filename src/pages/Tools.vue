<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <h4>Send a Transaction</h4>

    <div class="form">
      <form v-on:submit.prevent='formSubmitted'>

        <div class="address">
          <app-address-field></app-address-field>
        </div>

        <br><br>
        <div class="value">
          <app-value-field></app-value-field>
        </div>

        <br>

        <!-- <app-send-button :$v=$v :txsent=txsent :buttonText=buttonText></app-send-button> -->
        <app-send-button :txsent=txsent :buttonText=buttonText></app-send-button>

      </form>
    </div>

  </div>
</template>

<script>
import AddressField from '@components/transaction/AddressField'
import ValueField from '@components/transaction/ValueField'
import SendButton from '@components/transaction/SendButton'

export default {
  data() {
    return {
      buttonText: 'Submit Transaction',
      txsent: false
    }
  },

  // NEXT:
  //  - implement the actual transaction sending
  //  - implement gas slider
  //  - learn about zk-snarks
  //  - convert this into template

  components: {
    appAddressField: AddressField,
    appValueField: ValueField,
    appSendButton: SendButton
  },

  created() {
  },

  methods: {
    formSubmitted() {
      console.log('submitted')
    }
  },


}
</script>

<style lang="stylus">
.form {
  margin: auto;
  max-width: 800px;
}

.address {
  margin: auto;
  max-width: 600px;
}

.value {
  margin: auto;
  max-width: 320px;
}
</style>

