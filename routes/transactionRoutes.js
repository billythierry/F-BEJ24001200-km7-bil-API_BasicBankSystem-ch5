const express = require('express');
const { createTransaction, getTransactions, getTransactionById } = require('../controllers/transactionController');
const router = express.Router();

// Route Create Transaction
/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     summary: Buat transaksi baru
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source_account_id:
 *                 type: integer
 *               destination_account_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transaksi berhasil dibuat
 *       500:
 *         description: Gagal membuat transaksi
 */
router.post('/api/v1/transactions', createTransaction);

// Route Get All Transactions
/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     summary: Dapatkan daftar transaksi
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Daftar transaksi berhasil diambil
 *       500:
 *         description: Gagal memuat transaksi
 */
router.get('/api/v1/transactions', getTransactions);

// Route Get Transactions by Id
/**
 * @swagger
 * /api/v1/transactions/{transactionId}:
 *   get:
 *     summary: Dapatkan transaksi berdasarkan ID
 *     tags: [Transactions]
 *     parameters:
 *       - name: transactionId
 *         in: path
 *         required: true
 *         description: ID transaksi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaksi ditemukan
 *       404:
 *         description: Transaksi tidak ditemukan
 *       500:
 *         description: Gagal memuat transaksi
 */
router.get('/api/v1/transactions/:transactionId', getTransactionById);

module.exports = router;