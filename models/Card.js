class Card {
  constructor(numero_cartao, agencia, conta, cpf, dataNascimento, nomeCompleto, nomeCartao, bandeira, tipoCartao, dataVencimento, senha, status) {
    this.numero_cartao = numero_cartao;
    this.agencia = agencia;
    this.conta = conta;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.nomeCompleto = nomeCompleto;
    this.nomeCartao = nomeCartao;
    this.bandeira = bandeira;
    this.tipoCartao = tipoCartao;
    this.dataVencimento = dataVencimento;
    this.senha = senha;
    this.status = status;
  }
}

module.exports = Card;
