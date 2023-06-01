import fs from 'fs';

import 'dotenv/config';
import express from "express";
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { ApolloServer } from 'apollo-server-express';

// const mongodbConnectionString = 'mongodb://localhost/nintendo-characters';
const mongodbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@webdev.y07jqjc.mongodb.net/nintendo-characters?retryWrites=true&w=majority`;

mongoose.connect(mongodbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import characterRoutes from './routes/characters.js';

const app = express();

app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import typeDefs from './graphql/typedefs.js';
import resolvers from './graphql/resolvers.js';

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use((req, res, next) => {
  console.log('Hello from middleware!');
  next();
});

app.use(characterRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port 3001");
});
