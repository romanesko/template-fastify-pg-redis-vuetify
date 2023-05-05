'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(require('@fastify/postgres'), {
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db/${process.env.DB_DATABASE}`
  })
  fastify.register(require('@fastify/redis'), { host: 'redis' })


    fastify.get('/', async function (request, reply) {
      reply.header('Content-Type', 'text/html; charset=utf-8')
      reply.send(`<html><style>* {font-family: sans-serif; font-size: 14px; line-height:1.8em}.l {margin-left:10px} pre {font-family: monospace; font-size: 12px; }</style>
    
      <h3>Db example</h3>
      <div><pre>backend/routes/users/index.js</pre></div>
      <div class="l"><a href="/api/users">/api/users</a></div>
      <div class="l"><a href="/api/users/1">/api/users/1</a></div>
      
  
      <h3>Redis example</h3>
      <div><pre>backend/routes/counters/index.js</pre></div>
      <div class="l"><a href="/api/counters/123/add">/api/counters/123/add</a></div>
      <div class="l"><a href="/api/counters/123/get">/api/cunters/123/get</a></div>
      
      
      </html> `)
    })
  
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({ prefix: '/api' }, opts)
  })
}
