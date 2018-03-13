<template>

  <div class="row">

    <!-- address field -->
    <div class="col-11">
      <q-field label="Address" :label-width='3' :error="$v.address.$error" :error-label=generateErrorMessage()>
        <q-input v-model='address' v-on:input="updateState" type='text' @input="$v.address.$touch()" spellcheck="false" />
      </q-field>
    </div>

    <!-- identicon -->
    <div class="col">
      <img class='identicon' :src=imageURL v-show=!$v.address.$invalid />
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { isValidETHAddress } from '@components/functions'
import * as blockies from '@components/blockies'

export default {
  data() {
    return {
      address: '',
    }
  },

  validations: {
    // validate address entered into input field
    address: {
      required,
      minLength: minLength(42),
      maxLength: maxLength(42),
      isValidETHAddress,
    }
  },

  computed: {
    imageURL: function () {
      // only compute URL if we have a valid address
      if (!this.$v.address.$invalid) {
        const toDataURL = blockies[0].blockies['toDataUrl']
        return toDataURL(this.address)
      }
    }

  },

  methods: {
    updateState() {
      this.$store.dispatch('setToAddress', this.address)
    },

    generateErrorMessage() {
      // Figure out which validation requirement failed and notify user
      const params = this.$v.address
      if (params.required === false) {
        return 'Please enter a valid Ethereum address.'

      } else if (params.isValidETHAddress === false || params.maxLength === false) {
        return 'Invalid Ethereum address. Ensure you copy and pasted the address correctly.'

      } else if (params.minLength === false) {
        return 'Address must be 42 characters long. Be sure to include the "0x" prefix.'

      } else {
        return 'Please enter a valid Ethereum address.'
      }
    },

  }

}
</script>

<style lang="stylus" scoped>
.identicon {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}
</style>

