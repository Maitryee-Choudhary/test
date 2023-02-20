const express = require('express');
const router = express.Router();
const {getTransactions,  addTransaction, deleteTransaction} = require('../controllers/transactionController');
const requireAuth = require('../middleware/requireAuth');

//require auth for all routers ahead
router.use(requireAuth);

router.get('/', getTransactions);
router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);


// router.get('/latest', getLatestTransactions);
module.exports = router;