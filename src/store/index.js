import Vue from 'vue'
import Vuex from 'vuex'
import Usuario from '../assets/js/Usuario'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarios: [],
    pessoas: [],
    alteraNomeSucesso: false,
    adicionaFigurinhaSucesso: false,
    cardExibiUsuariosSucesso: false,
    spinner: false
  },
  mutations: {
    adicionarPersonagemLista(state, dados) {
      state.pessoas.push(dados)
    },
    adicionarCadastroUsuario(state, dados) {
      if (!state.usuarios.find(usuario => usuario.nome === dados.nome)) {
        state.usuarios.push(dados)
        state.cardExibiUsuariosSucesso = true
      }
      else {
        window.alert("ERRORR: POSSIBILITY DUPLICATED!!!")
      }
    },
    adicionaFigurinhaUsuario(state, dados) {
      let usuario = new Usuario();
      let isduplicated = false;
      usuario.importa(state.usuarios.find(usuario => usuario.nome === dados.usuario.nome));
      for (let figurinha of usuario.figurinhas) {
        if (figurinha.nome === dados.figurinha.nome) {
          isduplicated = true;
          state.adicionaFigurinhaSucesso = false;
        }
      }
      if (!isduplicated) {
        usuario.figurinhas.push(dados.figurinha);
        state.adicionaFigurinhaSucesso = true;
      } else {
        window.alert("ERRORR: POSSIBILITY DUPLICATED!!!")
      }

    },
    removerUsuarios(state, index) {
      state.usuarios.splice(index, 1);
    },
    removerFigurinhas(state, dados) {
      let usuario = new Usuario();
      usuario.importa(state.usuarios.find(usuario => usuario.nome === dados.usuario.nome));
      usuario.figurinhas.splice(dados.index, 1)
    },
    editarNome(state, dados) {
      let usuario = new Usuario();
      if (!state.usuarios.find(usuario => usuario.nome === dados.novoNome)) {
        console.log(dados)
        usuario.importa(state.usuarios.find(usuario => usuario.nome === dados.usuario.nome));
        usuario.nome = dados.novoNome;
        let index = state.usuarios.indexOf(usuario)
        state.usuarios.splice(index, 1, usuario)
        state.alteraNomeSucesso = true
        console.log(state.usuarios)
      } else {
        window.alert("ERRORR: POSSIBILITY DUPLICATED!!!")
      }
    },
    resetaUsuarios(state) {
      state.usuarios = [];
    },
    resetaPessoas(state) {
      state.pessoas = [];
    },
  },
  getters: {
    encontrarUsuario: (state) => (nome) => {
      let result = state.usuarios.find(usuario => usuario.nome === nome)
      return result;
    },
  },
  actions: {
    async inicializarPessoas({ dispatch, commit, state }) {
      state.spinner = true;
      let armazenado = window.localStorage.getItem('pessoas')
      if (!armazenado) {
        dispatch('obterTodasPessoas');
      } else {
        commit('resetaPessoas');
        let dados = JSON.parse(armazenado)
        for (let registro of dados) {
          let nome = registro.nome;
          let url_id = registro.url_id;
          let personagem = { nome, url_id };
          commit('adicionarPersonagemLista', personagem);
        }
        state.spinner = false;
      }
    },
    async inicializarUsuarios({ commit }) {
      let armazenado = window.localStorage.getItem('usuarios')
      if (!armazenado) {

      } else {
        commit('resetaUsuarios');
        let dados = JSON.parse(armazenado)
        for (let registro of dados) {
          commit('adicionarCadastroUsuario', registro);
        }

      }
    },
    async obterTodasPessoas({ commit, dispatch, state }) {
      for (let i = 0; i < 82; i++) {
        if (i === 0) {
          i++
        }
        let number = i
        const url = `https://swapi.dev/api/people/${number}`;
        let options = { mode: 'cors', cache: 'force-cache' };
        let dados = await fetch(url, options).then(res => (res.json()));
        let nome = dados.name;
        let url_id = dados.url;
        let personagem = { nome, url_id };
        console.log(personagem);
        commit('adicionarPersonagemLista', personagem);
      }
      state.spinner = false;
      dispatch('salvaReferenciaPessoa')
    },
    cadastrarUsuario({ commit, dispatch }, registro) {
      commit('adicionarCadastroUsuario', registro);
      dispatch('salvaReferenciaUsuario')
    },
    atualizaFigurinhaUsuario({ commit, dispatch }, registro) {
      console.log("caiu aqui");
      commit('adicionaFigurinhaUsuario', registro);
      dispatch('salvaAtualizacaoReferenciaUsuario');
    },
    salvaAtualizacaoReferenciaUsuario({ state }) {
      let dados = JSON.stringify(state.usuarios)
      window.localStorage.setItem('usuarios', dados)
    },
    atualizaNomeReferenciaUsuario({ state }) {
      let novo = JSON.stringify(state.usuarios)
      window.localStorage.setItem('usuarios', novo)
    },
    salvaReferenciaPessoa({ state }) {
      let dados = JSON.stringify(state.pessoas)
      window.localStorage.setItem('pessoas', dados)
    },
    salvaReferenciaUsuario({ state }) {
      let dados = JSON.stringify(state.usuarios)
      console.log(dados)
      window.localStorage.setItem('usuarios', dados)
    },
    remover({ commit, dispatch }, index) {
      commit('removerUsuarios', index)
      dispatch('salvaReferenciaUsuario')
    },
    removerReferencia({ commit, dispatch }, dados) {
      commit('removerFigurinhas', dados)
      dispatch('salvaReferenciaUsuario');
    },
    editarNomeUsuario({ commit, dispatch }, dados) {
      commit('editarNome', dados)
      dispatch('atualizaNomeReferenciaUsuario');
    }

  },
  modules: {
  }
})
