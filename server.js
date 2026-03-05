const express = require('express');
const routes = require('./routes')
const next = require('next');
const path = require('path')


const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = routes.getRequestHandler(app)
const server = express();

server.use('/_next', express.static(path.join(__dirname, '.next')))
server.use((req, res) => handle(req, res))

if (require.main === module) {
    app.prepare()
        .then(() => {
            server.listen(3000, err => {
                if (err) throw err;
                console.log('> Ready http://localhost:3000 <');
            });
        })
        .catch(ex => {
            console.error(ex.stack);
            process.exit(1);
        });
}

module.exports = { app, server }
