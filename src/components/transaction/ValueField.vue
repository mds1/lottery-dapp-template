<template>
  <div>

    <q-field label="Value" :label-width='5' :error="$v.value.$error" :error-label="`Value must be greater than or equal to ${minValue}`">
      <q-input v-model='value' v-on:input="updateState" type='number' :min=minValue :step='1e-18' @input="$v.value.$touch()" placeholder='0' suffix='ETH' />
    </q-field>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      value: 0, // default
      minValue: 0, // minimum allowed value to send
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
      this.$store.dispatch('setValue', this.value)
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>

