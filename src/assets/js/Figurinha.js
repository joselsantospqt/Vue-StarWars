export default class Figurinha {
  nome = "";
  caracteristicas = []
  constructor(nome, caracteristicas) {
    this.nome = nome;
    this.caracteristicas = caracteristicas;
  }

  importa(dados) {
    this.nome = dados.name;
    this.caracteristicas = [].concat(dados.birth_year, dados.hair_color, dados.eye_color);
    return this;
  }

  getNome() {
    return this.nome;
  }

  getCaracteristicas() {
    return this.caracteristicas;
  }

}