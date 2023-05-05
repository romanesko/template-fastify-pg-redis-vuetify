module.exports = async function (fastify, opts) {


  async function incrementCounter(counterName){
    fastify.redis.incr(counterName)
  }

  async function getCounter(counterName){
    return fastify.redis.get(counterName)
  }


  fastify.get('/:counterName/add', async (req, reply)=> {
    await incrementCounter(req.params.counterName)
    reply.send({"result":"ok"})
  })

  
  fastify.get('/:counterName/get', async  (req, reply) =>{
    const counterValue = await getCounter(req.params.counterName)
    reply.send({value: counterValue})
  })

}
