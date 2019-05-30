const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require('./routes');
const sitemapAndRobots = require('./utils/sitemapAndRobots');

dotenv.config();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => console.log('sucess connect database')) // eslint-disable-line no-console
  .catch((err) => console.log(err)); // eslint-disable-line no-console

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser('nextjs-node-rest-api-startkit'));
    server.use(passport.initialize());

    server.use('/', routes);

    sitemapAndRobots({ server });

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000'); // eslint-disable-line
    });
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line
    process.exit(1);
  });
