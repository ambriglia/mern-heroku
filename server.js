import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
