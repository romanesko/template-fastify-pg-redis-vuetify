
'use strict'

module.exports = async function (fastify, opts) {

  fastify.get('/', async (req, reply)=> {
    const res = await fastify.pg.query('SELECT * FROM users')
    reply.send(res.rows)
  })

  
  fastify.get('/:id', async  (req, reply) =>{
    const res = await fastify.pg.query('SELECT * FROM users WHERE id=$1', [req.params.id]);
    reply.send(res.rows[0] || {})
  })

}

