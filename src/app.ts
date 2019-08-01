import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { connect } from './Config/database';
import { UserRoutes } from './Routes/UserRoutes';
import { PassportConfig } from './Config/passport';
import { ProductRoutes } from './Routes/ProductRoutes';

class App {
  
    public express: express.Application;

    constructor() {
      this.express = express();
      this.setMiddlewares();
      this.setRoutes();
      this.setDatabase();
    }

    public setMiddlewares(): void {
      this.express.use(morgan('dev'));
      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: false }));
      this.express.use(compression());
      this.express.use(helmet());
      this.express.use(cors());
      this.express.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // dev only
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if(req.method === 'OPTIONS'){
            res.status(200).send();
        } else {
            next();
        }
      });
      PassportConfig.init();
    }

    public setRoutes(): void {
      this.express.use('/api/v1/users', new UserRoutes().router);
      this.express.use('/api/v1/products', new ProductRoutes().router);
      this.express.use('/', (_req, res) => {
        res.status(404).send({ error: `path doesn't exist`});
      });
    }
    
    public setDatabase() {
      connect();
    }
}

export default new App().express;