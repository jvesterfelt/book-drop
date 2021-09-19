// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');

// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// app.use(routes);

// const startServer = async (typeDefs, resolvers) => {
//   console.log('starting server');
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleware
//   });

//   const app = express();

//   await server.start();

//   server.applyMiddleware({ app, path: '/graphql' });

//   app.listen(PORT, () => {
//     console.log(`🌍 API server running on port ${PORT}!`);
//   console.log(`🌍 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// };

// startServer(typeDefs, resolvers);


// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

  
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3005;
const { authMiddleware } = require("./utils/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app })
}
startServer()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
});