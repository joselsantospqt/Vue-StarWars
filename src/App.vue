<template>
  <div id="app">
    <div id="nav">
      <b-navbar role="menubar" toggleable="lg" type="dark" class="navbarEffect">
        <b-navbar-toggle target="nav-collapse" aria-controls="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav role="menu" class="alignEnd">
            <b-nav-item role="menuitem">
              <router-link id="home" role="link" aria-roledescription="página incial" to="/">Inicio</router-link>
            </b-nav-item>
            <!-- <b-nav-item role="menuitem">
              <router-link to="/buscas">buscar</router-link>
            </b-nav-item>-->
            <!-- <b-nav-item role="menuitem">
              <router-link to="historia">Historia</router-link>
            </b-nav-item>-->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-fade"
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "bounce" : "slide-right";
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
