const swaggerAutogen = require('swagger-autogen')()


const doc = {
    info: {
        version: "1.0.0",
        title: "Asocanitas: API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module.<br>Karen Pabón"
    },
    host: "http://asocanitas.herokuapp.com/",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
    definitions: {
       
    }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')           // Your project's root file
})
