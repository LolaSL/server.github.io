const swaggerAutogen = require('swagger-autogen');
const doc = {
    info: {
        title: "Ecommerce API",
        description: "The Demo ecommerce api made for user, cart, and order transactions for an art products store."
    },
    host: "localhost:8000",
    schemes: ['http']
};
const outputFile = require('./swaggerLog.json')
const endpointFiles = ['./routes/index.js']
swaggerAutogen(outputFile, endpointFiles, doc)
