const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { parse } = require('url');
const { join } = require('path');

const routes = require('./server/routes');
const sitemapAndRobots = require('./server/utils/sitemapAndRobots');

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
    server.use(
      '/_next',
      express.static(path.join(__dirname, '.next'), {
        maxAge: '31536000',
      }),
    );
    server.use(
      '/static',
      express.static(path.join(__dirname, '/static'), {
        maxAge: '31536000',
      }),
    );
    server.get('/service-worker.js', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname);
        app.serveStatic(req, res, filePath);
      } else {
        handle(req, res, parsedUrl);
      }
    });
    server.use(cookieParser('nextjs-node-rest-api-startkit'));
    server.use(passport.initialize());

    sitemapAndRobots({ server });

    server.use('/', routes);

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
