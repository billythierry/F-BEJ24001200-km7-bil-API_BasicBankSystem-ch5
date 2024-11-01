const express = require('express');
const { createBankAccount, getBankAccounts, getBankAccountById } = require('../controllers/bankAccountController');
const router = express.Router();

//Route Create Account
/**
 * @swagger
 * /api/v1/accounts:
 *   post:
 *     summary: Buat akun bank baru
 *     tags: [Bank Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               bank_name:
 *                 type: string
 *               bank_account_number:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Akun bank berhasil dibuat
 *       500:
 *         description: Gagal membuat akun bank
 */
router.post('/api/v1/accounts', createBankAccount);

//Route Get Account
/**
 * @swagger
 * /api/v1/accounts:
 *   get:
 *     summary: Dapatkan daftar akun bank
 *     tags: [Bank Accounts]
 *     responses:
 *       200:
 *         description: Daftar akun bank berhasil diambil
 *       500:
 *         description: Gagal menemukan akun bank
 */
router.get('/api/v1/accounts', getBankAccounts);

// Route Get Account berdasarkan Id
/**
 * @swagger
 * /api/v1/accounts/{accountId}:
 *   get:
 *     summary: Dapatkan akun bank berdasarkan ID
 *     tags: [Bank Accounts]
 *     parameters:
 *       - name: accountId
 *         in: path
 *         required: true
 *         description: ID akun bank
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Akun bank ditemukan
 *       404:
 *         description: Akun bank tidak ditemukan
 *       500:
 *         description: Gagal menemukan akun bank yang dicari
 */

router.get('/api/v1/accounts/:accountId', getBankAccountById);

module.exports = router;