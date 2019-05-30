const sm = require('sitemap');
const path = require('path');
const User = require('../models/User');

const sitemap = sm.createSitemap({
  hostname: 'http://localhost:3000',
  cacheTime: 600000, // 600 sec - cache purge period
});

function setup({ server }) {
  User.find({}, 'slug').then((users) => {
    users.forEach((user) => {
      sitemap.add({
        url: `/user/${user.id}`,
        changefreq: 'daily',
        priority: 1,
      });
    });
  });

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../utils', 'robots.txt'));
  });
}

module.exports = setup;
