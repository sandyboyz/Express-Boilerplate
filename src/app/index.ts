import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/error.middleware';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { logger } from './logger';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Product Api Example',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It example boilerplate.',
    contact: {
      name: 'Developer',
      email: 'sandyz.boyz@gmail.com',
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/app/services/**/_routes*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Application): void => {
  // Middleware

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Documentation Handling
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Api Handling

  let key: keyof typeof routes;
  for (key in routes) {
    app.use('/api', routes[key]);
  }

  // Error Handling

  app.use(errorHandler);

  // Unhandling Rejection Expection

  process.on('unhandledRejection', (reason: string, p: Promise<unknown>) => {
    logger.fatal(p, 'Unhandled Promise Rejection');
    throw reason;
  });

  process.on('uncaughtException', (error: Error) => {
    logger.fatal(error, 'Uncaught Expection');
    process.exit(1);
  });
};
