const routes = module.exports = require('next-routes')()
const config = require('./config')
 
routes
    .add('home', '/', '/index')
    .add('about')
    .add('contact')
    .add('cookie-policy')
    .add('legal')
    .add('privacy')
    .add('news-home', `/${config.NEWS_URL}`, '/nigerian-newspapers')
    .add('news', `/${config.NEWS_URL}/:slug`, '/nigerian-newspapers/news')
    .add('ads.txt')

    