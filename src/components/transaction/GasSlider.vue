<template>
  <div>

    <!-- slider -->
    <q-field label="Gas Price" :label-width='2'>
      <q-slider v-model='value' v-on:input="updateState" :label-value="`${value} Gwei`" type='number' :min=minValue :max='99' />
    </q-field>

    <!-- input field for showing value and/or allowing custom values -->
    <div class="gasText">
      <q-field :error="$v.value.$error" :error-label="`Value must be greater than or equal to ${minValue}`">
        <q-input v-model='value' v-on:input="updateState" type='number' :min=minValue :step='1e-18' @input="$v.value.$touch()" placeholder='0' suffix='Gwei' />
      </q-field>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      value: this.$store.state.transactionObject.gasPrice, // default
      minValue: this.$store.state.transactionObject.gasPrice, // minimum gas price allowed
    }
  },

  validations: {
    // validate value entered into input field
    value: {
      required,
      minValue(value) {
        return minValue(this.minValue)(value)
      }
    }
  },

  methods: {
    updateState() {
      this.$store.dispatch('setGasPrice', this.value)
    },
  }
}
</script>

<style lang="stylus" scoped>
.gasText {
  max-width: 100px;
  margin: auto;
}
</style>

