const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let jwt = require('jsonwebtoken');
let JWT_SECRET = process.env.JWT_SECRET

class AuthControllers {

    static renderRegisterPage(req,res){
        res.render("register"); 
    }

    static renderLoginPage(req,res){
        res.render("loginPage");
    }

    static async handleRegister(req, res){
        try {
            const { name, email, password } = req.body;
            console.log(name, email, password, "===> THIS");

            const profile = {
                identity_type: req.body["profile.identity_type"] || '',
                identity_number: req.body["profile.identity_number"] || '',
                address: req.body["profile.address"] || ''
            };
        
            const cekEmailUnik = await prisma.users.findUnique({
            where: {
                email
                }
            })

            console.log(cekEmailUnik, '===> INI RESPONSE DARI findUnique()');

            if (cekEmailUnik) {
            res.status(400).json({
                error: "Email sudah terdaftar",
                message: "Bad Request",
                status: false
            })
            }else{
            
            const manipulateEncrypt = await bcrypt.hashSync(password, 10)

            let userData = await prisma.users.create({
                data: {
                    name,
                    email,
                    password: manipulateEncrypt,
                    profile: { 
                        create: profile
                    }
                },
                include: { profile: true },
            });
            
            res.status(201).json({
                message: 'Registrasi berhasil',
                data: userData
            })
            }
        }
        catch(error) {
            console.log(error);
            
            res.status(500).json(error);
        }
    } 

    static async handleLogin(req, res){
        try {
            let { email, password } = req.body
            // console.log(email, password, '===> what is this');
            
            let userData = await prisma.users.findUnique({
                where: {
                    email
                }
            })

            if(!userData){
                res.status(404).json({
                    message: 'User tidak ditemukan',
                    error: 'email or password is wrong'
                })
            }else{
                let isPassword = await bcrypt.compareSync(password, userData.password);
                console.log(isPassword, '===> THIS');
                
                if(!isPassword){
                    res.status(400).json({
                        message: 'Bad request',
                        error: 'email or password is wrong'
                    })
                }else{
                    const accessToken = jwt.sign({
                        name: userData.name,
                        id: userData.id
                    }, JWT_SECRET)
                    console.log(JWT_SECRET, '===> INI DARI dotenv');
                    

                    res.status(200).json({
                        message: "Successed",
                        accessToken
                    })
                }
            }

        } catch (error) {
            
        }
    }
}


module.exports = AuthControllers;