import express from 'express';
import { AppDataSource } from './data-source';
import apiRouter from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meletto E-Ticaret API',
      version: '1.0.0',
      description: 'RESTful e-ticaret API documentation',
    },
    servers: [
      { url: 'http://localhost:' + PORT }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts', './src/entities/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/api', apiRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('TypeORM: Veritabanına başarıyla bağlanıldı.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('TypeORM: Veritabanı bağlantı hatası:', error);
  }); 