const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

// Create a new card
router.post('/', cardController.createCard);

// Activate a card
router.put('/:numero_cartao/activate', cardController.activateCard);

// Block a card
router.put('/:numero_cartao/block', cardController.blockCard);

// Cancel a card
router.put('/:numero_cartao/cancel', cardController.cancelCard);

module.exports = router;
