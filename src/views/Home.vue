<template>
  <b-row class="m-0 p-0">
    <b-col cols="12">
      <div class="home">
        <b-col sm="12">
          <div id="logoHome"></div>
          <HelloWorld class="bounce-enter-active">
            <template #titulo>Bem vindo</template>
            <template #texto>Cadastre um usuário</template>
          </HelloWorld>
          <b-form
            role="cadastrar"
            aria-label="rápido cadastro"
            ref="form"
            :inline="true"
            class="bounce-enter-active"
          >
            <b-form-group
              class="mt-3 pl-1"
              label="Escreva seu nome"
              label-for="input-nome"
              :label-sr-only="true"
            >
              <b-form-input
                id="input-nome"
                role="option"
                aria-roledescription="button selecionar nome"
                :state="validaCampoNome"
                v-model="nome"
                class="mr-3"
                placeholder="Campo Nome"
              ></b-form-input>
              <b-form-invalid-feedback role="alertdialog" id="form-Categoria">Escreva um nome</b-form-invalid-feedback>
            </b-form-group>
            <b-button
              role="button"
              aria-roledescription="button ação buscar"
              @click="cadastrarUsuario(nome)"
              variant="outline-success"
              class="btn-responsivo"
            >Cadastrar</b-button>

            <b-button
              @click="redirect()"
              variant="primary"
              class="ml-3"
              v-show="cardExibiUsuariosSucesso"
            >História Star Wars</b-button>
          </b-form>
        </b-col>

        <b-col md="4" sm="12">
          <transition name="slide-fade">
            <Card titulo="Usuários cadastrados" class="mt-4" v-show="cardExibiUsuariosSucesso">
              <b-table-simple responsive>
                <b-thead head-variant="dark">
                  <b-tr>
                    <b-th class="text-left">Nome</b-th>
                    <b-th class="text-left">Quantidade</b-th>
                    <b-th class="text-left">Remover</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr
                    v-for="(usuario, index) in usuarios"
                    :usuario="usuario"
                    :key="usuario.nome"
                    style="background-color:white;"
                  >
                    <b-td>
                      <router-link
                        role="link"
                        :to="{path: '/' + usuario.nome  + '/'}"
                      >{{ usuario.nome}}</router-link>
                    </b-td>
                    <b-td>{{usuario.figurinhas.length}}</b-td>
                    <b-td>
                      <b-btn variant="outline-danger" @click="remover(index)">remover</b-btn>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </Card>
          </transition>
        </b-col>
      </div>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/Card";
import Usuario from "../assets/js/Usuario";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      nome: ""
    };
  },
  components: {
    HelloWorld,
    Card
  },
  beforeMount() {
    this.$store.dispatch("inicializarUsuarios");
  },
  computed: {
    ...mapState(["usuarios", "cardExibiUsuariosSucesso"]),
    validaCampoNome() {
      return !!this.nome.length;
    }
  },
  methods: {
    cadastrarUsuario(nome) {
      if (nome.trim())
        this.$store.dispatch("cadastrarUsuario", new Usuario(this.nome, []));
    },
    remover(index) {
      this.$store.dispatch("remover", index);
    },
    redirect() {
      window.location.assign("#/historia");
      // this.$router.push({ name: "Historia" });
    }
  }
};
</script>

<style scoped>
#app {
  overflow: hidden !important;
}
@media screen and (max-width: 425px) {
  .btn-responsivo {
    width: 100%;
  }
  .form-group {
    width: 100%;
  }
  #logo {
    top: -25% !important;
  }
}
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
</style>
