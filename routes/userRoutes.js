const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const AuthControllers = require('../controllers/authControllers');
const router = express.Router();

//Route Create User
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Buat user baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               profile:
 *                 type: object
 *                 properties:
 *                   identity_type:
 *                     type: string
 *                     example: "KTP"
 *                   identity_number:
 *                     type: string
 *                     example: "1234567890"
 *                   address:
 *                     type: string
 *                     example: "Jl. Sudirman No. 45, Jakarta"
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *       500:
 *         description: Gagal membuat user dan profile
 */
router.post('/api/v1/users', createUser);

// Route Get User
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get semua user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar User berhasil diambil
 *       500:
 *         description: Gagal mencari user
 */
router.get('/api/v1/users', getUsers);

//Route Get User by Id
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get user berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID user yang dicari
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil ditemukan
 *       500:
 *         description: Gagal mencari user yang anda cari
 */
router.get('/api/v1/users/:userId', getUserById);

// Route Update User
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   put:
 *     summary: Perbarui user berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type: object
 *                 properties:
 *                   identity_type:
 *                     type: string
 *                   identity_number:
 *                     type: string
 *                   address:
 *                     type: string
 *     responses:
 *       200:
 *         description: User berhasil diperbarui
 *       500:
 *         description: Gagal user dan profile
 */
router.put('/api/v1/users/:userId', updateUser);

// Route Delete User
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   delete:
 *     summary: Hapus User berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       500:
 *         description: Gagal menghapus user
 */

router.delete('/api/v1/users/:userId', deleteUser);


module.exports = router;