<template>
  <div>
    <h3 role="Titulo" aria-roledescription="Bem Vindo">
      <slot name="titulo"></slot>
    </h3>
    <p role="Paragrafo">
      <slot name="texto"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
