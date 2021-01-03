<template>
  <b-card :header="titulo" class="gradient-border mb-5">
    <slot></slot>
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    titulo: ""
  }
};
</script>

<style scoped>
.gradient-border {
  --border-width: 6px;
  position: relative;
  justify-content: center;
  /* text-transform: uppercase; */
  color: white;
  background: #000000e0;
  border-radius: var(--border-width);
}

.gradient-border::after {
  position: absolute;
  content: "";
  top: calc(-1 * var(--border-width));
  left: calc(-1 * var(--border-width));
  z-index: -1;
  width: calc(100% + var(--border-width) * 2);
  height: calc(100% + var(--border-width) * 2);
  background: linear-gradient(
    60deg,
    hsl(224, 85%, 66%),
    hsl(269, 85%, 66%),
    hsl(314, 85%, 66%),
    hsl(359, 85%, 66%),
    hsl(44, 85%, 66%),
    hsl(89, 85%, 66%),
    hsl(134, 85%, 66%),
    hsl(179, 85%, 66%)
  );
  background-size: 300% 300%;
  background-position: 0 50%;
  border-radius: calc(2 * var(--border-width));
  animation: moveGradient 4s alternate infinite;
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}
.invalid-feedback {
  text-align: start;
}
</style>
