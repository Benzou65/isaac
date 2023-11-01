import fastify from 'fastify'
import cors from '@fastify/cors'

import { scrape } from './services/scrapeItems'

const server = fastify()

server.register(cors, {
  origin: 'http://localhost:5173',
})

server.get('/scrape', async (request, reply) => {
  try {
    const result = await scrape()
    reply.send(result)
  } catch (error) {
    reply.code(500).send({ error: 'Failed to scrape data from the website' })
  }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
