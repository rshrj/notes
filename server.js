const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');

const connectDB = require('./config/db');
const { rootSchema, rootResolver } = require('./graphql');
const { authNormal } = require('./middleware/auth');

const app = express();

connectDB();

// Set up express
app.use(express.json({ extented: false }));

app.use(
  '/graphql',
  authNormal,
  graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: process.env.NODE_ENV === 'development'
  })
);

// Set up express to serve the compiled react app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express listening on port ${port}`));
