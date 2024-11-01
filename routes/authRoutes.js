const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/authControllers');
const restrict = require('../middleware/authJwt');
const restrictJwt = require('../middleware/authJwt');

// Routing register
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi pengguna baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama pengguna
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: Email pengguna
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *                 example: "password123"
 *               profile.identity_type:
 *                 type: string
 *                 description: Jenis identitas (misalnya, KTP, Passport)
 *                 example: "KTP"
 *               profile.identity_number:
 *                 type: string
 *                 description: Nomor identitas pengguna
 *                 example: "1234567890"
 *               profile.address:
 *                 type: string
 *                 description: Alamat pengguna
 *                 example: "Jl. Sudirman No. 45, Jakarta"
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "created success"
 *       400:
 *         description: Email sudah terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "email already exist"
 *       500:
 *         description: Kesalahan server internal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/auth/register', AuthControllers.handleRegister);


//Routing login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successed"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request
 *       404:
 *         description: User tidak ditemukan
 *       500:
 *         description: Kesalahan server Internal
 */

router.post("/auth/login", AuthControllers.handleLogin);

//Routing Authenticate
/**
 * @swagger
 * /auth/authenticate:
 *   get:
 *     summary: Verifikasi token JWT pengguna
 *     description: Menggunakan token Bearer untuk autentikasi. Harap masukkan token di header Authorization.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token valid, pengguna terautentikasi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token valid"
 *       401:
 *         description: Token tidak valid atau tidak ada token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
router.get('/auth/authenticate', restrictJwt, (req, res) => {
    res.status(200).json({
        message: 'Akun anda sudah terautentikasi'
    });
});


module.exports = router;