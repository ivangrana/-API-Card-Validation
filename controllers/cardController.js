const Card = require('../models/Card');

const cards = [];

// Create a new card
exports.createCard = (req, res) => {
  const {
    agencia,
    conta,
    cpf,
    dataNascimento,
    nomeCompleto,
    nomeCartao,
    bandeira,
    tipoCartao,
    dataVencimento,
    senha,
  } = req.body;

  // Check if the dataNascimento meets the age requirement
  const birthDate = new Date(dataNascimento);
  const allowedDate = new Date();
  allowedDate.setFullYear(allowedDate.getFullYear() - 18);
  if (birthDate > allowedDate) {
    return res.json({ status: false, message: 'Você deve ser maior de idade para solicitar o cartão' });
  }

  // Validate the password against the birth date and pattern rules
  const passwordPattern = /^[0-9]{6}$/;
  const isPasswordValid = passwordPattern.test(senha) && senha !== dataNascimento && !isPasswordSequential(senha);
  if (!isPasswordValid) {
    return res.json({ status: false, message: 'A senha fornecida é inválida' });
  }

  // Generate a unique card number (you can implement your own logic)
  const numero_cartao = generateUniqueCardNumber();

  // Create a new Card instance
  const newCard = new Card(
    numero_cartao,
    agencia,
    conta,
    cpf,
    dataNascimento,
    nomeCompleto,
    nomeCartao,
    bandeira,
    tipoCartao,
    dataVencimento,
    senha,
    'PENDENTE'
  );

  // Add the new card to the storage
  cards.push(newCard);

  // Return a success message
  res.json({ status: true, message: 'Cartão criado!' });
};

// Activate a card
exports.activateCard = (req, res) => {
  const { numero_cartao, agencia, conta, senha } = req.body;

  // Find the card by its numero_cartao
  const card = cards.find((card) => card.numero_cartao === numero_cartao);

  // Check if the card exists, is in the "ENTREGUE" status, and the provided details match
  if (card && card.status === 'ENTREGUE' && card.agencia === agencia && card.conta === conta && card.senha === senha) {
    // Update the card status to "ATIVO"
    card.status = 'ATIVO';

    // Return a success message
    res.json({ status: true, message: 'Cartão ativado' });
  } else {
    // Return an error message if the card is not found, not in the "ENTREGUE" status, or the details don't match
    res.json({ status: false, message: 'Não foi possível ativar o cartão. Verifique as informações fornecidas.' });
  }
};

// Block a card
exports.blockCard = (req, res) => {
  const { numero_cartao, agencia, conta, senha, motivo } = req.body;

  // Find the card by its numero_cartao
  const card = cards.find((card) => card.numero_cartao === numero_cartao);

  // Check if the card exists, is in the "ATIVO" status, and the provided details match
  if (card && card.status === 'ATIVO' && card.agencia === agencia && card.conta === conta && card.senha === senha) {
    // Update the card status to the provided motivo
    card.status = motivo.toUpperCase();

    // Return a success message
    res.json({ status: true, message: 'Cartão bloqueado com sucesso' });
  } else {
    // Return an error message if the card is not found, not in the "ATIVO" status, or the details don't match
    res.json({ status: false, message: 'Não foi possível bloquear o cartão. Verifique as informações fornecidas.' });
  }
};

// Cancel a card
exports.cancelCard = (req, res) => {
  const { numero_cartao, agencia, conta, senha, motivo } = req.body;

  // Find the card by its numero_cartao
  const card = cards.find((card) => card.numero_cartao === numero_cartao);

  // Check if the card exists, is in the "ATIVO" status, and the provided details match
  if (card && card.status === 'ATIVO' && card.agencia === agencia && card.conta === conta && card.senha === senha) {
    // Update the card status to "CANCELADO"
    card.status = 'CANCELADO';

    // Return a success message
    res.json({ status: true, message: 'Cartão cancelado com sucesso' });
  } else {
    // Return an error message if the card is not found, not in the "ATIVO" status, or the details don't match
    res.json({ status: false, message: 'Não foi possível cancelar o cartão. Verifique as informações fornecidas.' });
  }
};

// Helper function to check if a password has sequential digits
function isPasswordSequential(password) {
  for (let i = 0; i < password.length - 1; i++) {
    if (parseInt(password[i]) + 1 !== parseInt(password[i + 1])) {
      return false;
    }
  }
  return true;
}

// Helper function to generate a unique card number (replace this with your own logic)
function generateUniqueCardNumber() {
  // Generate a random 16-digit number
  const randomNumber = Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
  return randomNumber.toString();
}

module.exports = cards;
