<template>
  <div>

    <q-btn :loading='txsent' color="primary" :disabled='!isInfoValid || txsent' v-model='txsent'>{{ buttonText }}
      <q-spinner slot="loading" />
      <span slot="loading">&nbsp;&nbsp;Transaction pending...</span>
    </q-btn>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },

  props: [
    'txsent',
    'buttonText',
  ],

  computed: {
    isInfoValid: function () {
      // form is ready to be sent if the state transactionObject has no fields that are null
      const transactionObject = this.$store.state.transactionObject
      for (let key in transactionObject) {
        // skip loop if the property is from prototype
        if (!transactionObject.hasOwnProperty(key)) continue;
        // check if value is null, and if so return false
        if (transactionObject[key] === null) {
          return false
        }
      }
      // if no values are null, return true
      return true
    }
  }
}
</script>

<style>

</style>
