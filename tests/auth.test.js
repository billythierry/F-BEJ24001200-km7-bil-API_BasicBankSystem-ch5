// authController.test.js
const request = require('supertest');
const app = require('../app');
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

describe('Auth Controller', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('POST /auth/register', () => {
        test('seharusnya register new user berhasil', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'password123',
                    'profile.identity_type': 'ID Card',
                    'profile.identity_number': '1234567890',
                    'profile.address': 'Test Address'
                });
            
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('message', 'created success');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('email', 'testuser@example.com');
        });

        test('seharusnya tidak bisa membuat new user', async () => {
            await prisma.users.create({
                data: {
                    name: 'Existing User',
                    email: 'existinguser@example.com',
                    password: await bcrypt.hash('password123', 10),
                    profile: {
                        create: {
                            identity_type: 'ID Card',
                            identity_number: '9876543210',
                            address: 'Existing Address'
                        }
                    }
                }
            });

            const response = await request(app)
                .post('/auth/register')
                .send({
                    name: 'New User',
                    email: 'existinguser@example.com',
                    password: 'password123',
                    'profile.identity_type': 'ID Card',
                    'profile.identity_number': '1234567890',
                    'profile.address': 'New Address'
                });
            
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'email already exist');
        });
    });

    describe('POST /auth/login', () => {
        beforeAll(async () => {
            await prisma.users.create({
                data: {
                    name: 'Login User',
                    email: 'loginuser@example.com',
                    password: await bcrypt.hash('password123', 10),
                    profile: {
                        create: {
                            identity_type: 'ID Card',
                            identity_number: '1234567890',
                            address: 'Login Address'
                        }
                    }
                }
            });
        });

        test('Login dengan validasi JWT token', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'loginuser@example.com',
                    password: 'password123'
                });
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('accessToken');
        });

        test('Login namun tanpa JWT token', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'loginuser@example.com',
                    password: 'wrongpassword'
                });
            
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'email or password is wrong');
        });
    });
});
