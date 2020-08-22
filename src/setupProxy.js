const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v2/everything',
    createProxyMiddleware({
       target: 'https://newsapi.org',
       changeOrigin: true
    })
  );
};
