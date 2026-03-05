const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')

const { app, server } = require('./server')
const handler = sls(server, {
    binary: binaryMimeTypes
})

let prepared = false

module.exports.server = async (event, context) => {
    if (!prepared) {
        await app.prepare()
        prepared = true
    }

    return handler(event, context)
}
