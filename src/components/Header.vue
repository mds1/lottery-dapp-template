<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div>

    <nav class="nav-bar">
      <nav class="wrapper">

        <!-- Left-aligned site name / link to home page -->
        <router-link to='/'>
          <img src="~assets/quasar-logo-full.svg" alt="Quasar PWA" height=40px>
        </router-link>

        <!-- Right-aligned links to other pages -->
        <!-- home page -->
        <ul>
          <router-link to='/' tag='li' active-class='active-page' exact>
            <a>
              <!-- span is needed to center text vertically when the logo is taller than the text -->
              Home
            </a>
          </router-link>

          <!-- add spaces -->
          &nbsp;&nbsp;&nbsp;&nbsp;

          <!-- tools page -->
          <router-link to='/tools' tag='li' active-class='active-page'>
            <a>
              <!-- span is needed to center text vertically when the logo is taller than the text -->
              Tools
            </a>
          </router-link>

          <!-- add spaces -->
          &nbsp;&nbsp;&nbsp;&nbsp;

          <!-- contact page -->
          <router-link to='/contact' tag='li' active-class='active-page'>
            <a>
              <!-- span is needed to center text vertically when the logo is taller than the text -->
              Contact
            </a>
          </router-link>
        </ul>

      </nav>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
// "variables" is a Webpack alias (defined in /config/index.js) which points to /src/themes/quasar.variables.styl
@import '~variables';

// set color of links
.header-links {
  color: $primary;
}

// set formatting of active page
.active-page {
  font-weight: bold;
}

// format full screen navigation bar (source: http://blog.christopherianmurphy.com/2016/01/responsive-pure-css-menu/)
.wrapper {
  margin: 0 auto; // center content
  max-width: 960px;
  padding: 0 2%;
}

.nav-bar {
  background-color: $background;
  min-width: 100%; // ensure bar spans full page width
  margin-top: 20px;
}

nav {
  .wrapper {
    align-items: center; // vertically center items
    display: flex;
    justify-content: space-between; // evenly distributes child elements within the parent flex container, effectively floating logo to the left and menu items to the right
  }
}

nav {
  ul {
    display: flex;
    justify-content: flex-end; // use flexbox to dynamically adjust spacing between menu items
    list-style-type: none;
    width: 40%; // set width of page that menu items should take up

    a {
      color: $primary;
      text-decoration: none;
      transition: all 0.5s ease;

      &:hover {
        font-weight: bold;
      }
    }
  }

  li {
    display: inline-block; // ensures items do not stack
  }
}
</style>
