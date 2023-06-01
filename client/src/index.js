import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
