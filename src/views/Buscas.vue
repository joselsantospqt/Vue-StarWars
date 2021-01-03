<template>
  <b-row class="m-0 p-0">
    <b-col cols="12">
      <div class="Buscas">
        <b-container class="container" fluid="xlg">
          <b-row>
            <b-col sm="12">
              <card titulo="Busca Personalizada">
                <b-form role="search" aria-label="busca Personalizada">
                  <b-col md="12" sm="12">
                    <b-row>
                      <b-form-group
                        role="group"
                        label-align="left"
                        label="Nome:"
                        label-for="$nomeUsuario"
                      >
                        <!-- <InputCustom v-model="preencheCampoUsuario"></InputCustom> -->
                        <b-form-input v-model="preencheCampoUsuario" id="$nomeUsuario" disabled></b-form-input>
                        <b-input-group-append class="pt-2">
                          <b-button
                            @click="exibiEditar = !exibiEditar"
                            variant="outline-warning"
                          >Editar</b-button>
                        </b-input-group-append>
                      </b-form-group>

                      <transition name="slide-fade">
                        <b-form-group
                          role="group"
                          label-align="left"
                          label="Novo Nome:"
                          label-for="$novoNomeUsuario"
                          v-show="exibiEditar"
                        >
                          <b-form-input
                            id="$novoNomeUsuario"
                            placeholder="Escreva um novo nome"
                            :state="validaNovoNome"
                            v-model="novoNome"
                            type="text"
                            aria-describedby="form-categoria"
                            trim
                          ></b-form-input>
                          <b-form-invalid-feedback
                            role="alertdialog"
                            aria-roledescription="Campo obrigatorio"
                            id="form-categoria"
                          >Campo obrigatorio !</b-form-invalid-feedback>
                          <b-input-group-append class="pt-2">
                            <b-button
                              @click="renomear(novoNome)"
                              variant="outline-success"
                              class="mr-2"
                            >Salvar</b-button>
                            <b-button @click="exibiEditar = false" variant="outline-danger">Cancelar</b-button>
                          </b-input-group-append>
                        </b-form-group>
                      </transition>
                    </b-row>
                    <transition name="slide-fade">
                      <b-alert
                        v-show="alteraNomeSucesso"
                        show
                        variant="success"
                        style="height: 50%;"
                      >Alterado com Sucesso !!</b-alert>
                    </transition>
                    <hr />
                    <b-row>
                      <b-form-group
                        role="group"
                        label-align="left"
                        label="Buscar o Personagem:"
                        label-for="$buscaPersonagem"
                      >
                        <b-form-input
                          id="$buscaPersonagem"
                          :state="validaNovoPersonagem"
                          v-model="value"
                          list="comboPersonagem"
                          type="search"
                        ></b-form-input>
                        <datalist id="comboPersonagem">
                          <option
                            v-for="registro in pessoas"
                            :registro="registro"
                            :key="registro.url_id"
                            :value="registro.url_id"
                          >{{ registro.nome}}</option>
                        </datalist>
                        <b-form-invalid-feedback
                          role="alertdialog"
                          aria-roledescription="Campo obrigatorio"
                          id="form-categoria"
                        >Campo obrigatorio !</b-form-invalid-feedback>
                        <b-input-group-append class="pt-2">
                          <b-button @click="adicionar(value)" variant="outline-success">Adicionar</b-button>
                        </b-input-group-append>
                      </b-form-group>
                      <div v-show="spinner" class="pt-5 pl-5 lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </b-row>
                    <transition name="slide-fade">
                      <b-alert
                        v-show="adicionaFigurinhaSucesso"
                        show
                        variant="success"
                        style="height: 50%;"
                      >Adicionado com Sucesso !!</b-alert>
                    </transition>
                  </b-col>
                </b-form>
              </card>
              <card titulo="Inventario">
                <b-row :gutter="12">
                  <b-col v-for="(item, index) in usuario.figurinhas" :key="item.nome" :span="8">
                    <b-card shadow="hover" class="bounce-enter-active">
                      <h4 class="clearfix">{{ item.nome}}</h4>
                      <hr />
                      <p v-for="item in item.caracteristicas" :key="item.nome">{{item}}</p>
                      <b-btn variant="outline-danger" @click="remover(index)">remover</b-btn>
                    </b-card>
                  </b-col>
                </b-row>
              </card>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card";
import InputCustom from "@/components/Input-custom";
import Figurinha from "../assets/js/Figurinha";
import Usuario from "../assets/js/Usuario";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Buscas",
  components: {
    Card,
    InputCustom
  },
  data() {
    return {
      nome: "",
      value: "",
      novoNome: "",
      usuario: [],
      exibiEditar: false
    };
  },
  created() {},
  beforeMount() {
    this.$store.dispatch("inicializarPessoas");
    try {
      this.$store.dispatch("inicializarUsuarios");
      let usuario = new Usuario();
      console.log("chegou aqui");
      console.log(this.usuario);
      this.usuario = usuario.importa(
        this.$store.getters.encontrarUsuario(this.$route.params.nome)
      );
      console.log(this.usuario);
    } catch (e) {
      console.log(e);
      this.$router.push({ name: "About" });
    }
  },
  computed: {
    ...mapState([
      "pessoas",
      "usuarios",
      "alteraNomeSucesso",
      "adicionaFigurinhaSucesso",
      "spinner"
    ]),
    ...mapGetters(["encontrarUsuario"]),
    preencheCampoUsuario() {
      return this.usuario.getNome();
    },
    validaNovoNome() {
      return !!this.novoNome.length;
    },
    validaNovoPersonagem() {
      return !!this.value.length;
    }
  },
  methods: {
    async adicionar(value) {
      console.log(value);
      if (value.trim()) {
        let caracteristicas = [];
        let url = value;
        let options = { mode: "cors", cache: "force-cache" };
        let dados = await fetch(url, options).then(res => res.json());
        let figurinha = new Figurinha();
        figurinha.importa(dados);
        this.$store.dispatch("atualizaFigurinhaUsuario", {
          usuario: this.usuario,
          figurinha
        });
        this.value = "";
      }
    },
    remover(index) {
      this.$store.dispatch("removerReferencia", {
        usuario: this.usuario,
        index
      });
    },
    renomear(novoNome, nome) {
      console.log("INICIO CHAMADA RENOMEAR");
      console.log(this.usuario);
      console.log("VALIDAÇÃO");
      if (novoNome.trim()) {
        if (novoNome != this.usuario.getNome()) {
          this.$store.dispatch("editarNomeUsuario", {
            usuario: this.usuario,
            novoNome: novoNome
          });
          console.log("CONFIRMAR");
          console.log(this.usuario);
          this.exibiEditar = false;
          window.location.replace("#/" + this.novoNome);
          console.log("RECUPERA ROUTER PARAMNS");
          let usuario = new Usuario();
          this.usuario = usuario.importa(
            this.$store.getters.encontrarUsuario(this.$route.params.nome)
          );
          console.log("CHEGOU AQUI, AGORA VAI !");
          console.log(this.usuario);
        } else {
          window.alert("ERROR: SAME NAME!!!");
        }
      }
    }
  }
};
</script>

<style scoped>
body {
  overflow-y: scroll !important;
}
.form-group {
  padding: 1em;
}
span,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-family: "News Cycle", sans-serif;
  color: black;
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