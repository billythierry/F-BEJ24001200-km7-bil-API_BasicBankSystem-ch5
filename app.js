const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const prisma = require('./prismaClient');
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const bankAccountRoutes = require('./routes/bankAccountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const app = express();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

app.use(morgan('dev'));
app.use(flash())

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Basic Bank API dengan Authentication",
            version: "1.0.0"
        },
        components: {
            securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
            }
        },
        security: [{ bearerAuth: [] }],
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis: ['./routes/authRoutes.js', './routes/userRoutes.js', './routes/bankAccountRoutes.js', './routes/transactionRoutes.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(authRoutes);
app.use(userRoutes);
app.use(bankAccountRoutes);
app.use(transactionRoutes);


app.get('/', (req, res) => {
    res.send('API is Running')
});



app.listen(port, () => console.log(`Server berjalan pada port ${port}`));

module.exports = app;
