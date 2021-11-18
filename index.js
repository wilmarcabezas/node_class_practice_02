const express =  require('express');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')

const routerApi = require('./router/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();



const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
app.use(passport.initialize());

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

require('./utils/auth/index');

routerApi(app);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=> {   
        console.log('http://localhost:3000');
    }
);