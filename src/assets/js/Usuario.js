export default class Usuario {
  nome = "";
  figurinhas = []
  constructor(nome, figurinhas) {
    this.nome = nome;
    this.figurinhas = figurinhas;
  }

  importa(dados) {
    this.nome = dados.nome;
    this.figurinhas = dados.figurinhas;
    return this;
  }

  getNome() {
    return this.nome;
  }

  getFigurinhas() {
    return this.figurinhas;
  }

}