// Express + Next server for local production runs and the Lambda entry point (index.js).
// Vercel does not use this file; it serves the Next build directly.
const express = require('express')
const next = require('next')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const server = express()

server.use((req, res) => handle(req, res))

if (require.main === module) {
  const port = process.env.PORT || 3000
  app
    .prepare()
    .then(() => {
      server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready http://localhost:${port} <`)
      })
    })
    .catch(ex => {
      console.error(ex.stack)
      process.exit(1)
    })
}

module.exports = { app, server }
