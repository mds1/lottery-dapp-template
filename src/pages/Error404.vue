<template>
  <div class="error-page window-height window-width bg-light column items-center no-wrap">
    <div class="error-code bg-primary flex items-center content-center justify-center">
      404
    </div>
    <div>
      <div class="error-card shadow-4 bg-white column items-center justify-center no-wrap">
        <q-icon name="error_outline" color="grey-5" />
        <p class="caption reduce-caption-margin text-center">Oops. Nothing here...</p>
        <p class="text-center group">
          <q-btn v-if="canGoBack" color="primary" push @click="goBack" icon="keyboard_arrow_left">
            Go back
          </q-btn>
          <q-btn color="primary" push @click="$router.replace('/')" icon-right="fa-home">
            Go home
          </q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QBtn, QIcon } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon
  },
  data() {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.error-page {
  .error-code {
    height: 30vh;
    width: 100%;
    padding-top: 0vh;

    @media (orientation: landscape) {
      font-size: 20vw;
    }

    @media (orientation: portrait) {
      font-size: 20vh;
    }

    color: rgba(255, 255, 255, 0.2);
    overflow: hidden;
  }

  .error-card {
    border-radius: 2px;
    margin-top: -25px;
    width: 80vw;
    max-width: 600px;
    padding: 20px;

    > i {
      font-size: 5rem;
    }
  }
}

// reduce margin of caption class from 2rem to 1rem
.reduce-caption-margin {
  margin-top: 1rem !important;
}
</style>
