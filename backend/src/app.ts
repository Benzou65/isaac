import fastify from 'fastify'
import cors from '@fastify/cors'

import { getItems } from './services/getItems'

const server = fastify()

server.register(cors, {
  origin: 'http://localhost:5173',
})

server.get('/items', async (request, reply) => {
  try {
    const items = await getItems()
    reply.send(items)
  } catch (error) {
    reply.code(500).send({ error: 'Failed to get items' })
  }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
