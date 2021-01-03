<template>
  <div>
    <input
      id="$nomeUsuario"
      type="text"
      :value="value"
      @input="updateName($event.target.value)"
      disabled
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  name: "Input-custom",
  props: ["value"],
  computed: {},
  methods: {
    updateName() {
      console.log(value);
      this.$emit("input", value);
    }
  }
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
