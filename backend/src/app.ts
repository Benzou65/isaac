import fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

import { scrapeItems } from './services/scrapeItems'
import type { ScrapedItem } from './types/ScrapedItem'

const server = fastify()

server.register(cors, {
  origin: 'http://localhost:5173',
})

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

server.get('/scrape/items', async (request, reply) => {
  try {
    const items = await scrapeItems()
    reply.send(items)
  } catch (error) {
    reply.code(500).send({ error: 'Failed to get items' })
  }
})

server.get('/items', async (request, reply) => {
  try {
    const items = await prisma.items.findMany()
    reply.send(items)
  } catch (error) {
    reply.code(500).send({ error: 'Failed to get items' })
  }
})

server.post<{ Body: ScrapedItem[] }>('/items', async (request, reply) => {
  try {
    const scrapedItems = request.body

    const items = scrapedItems.map((item) => ({
      itemId: item.itemId,
      name: item.name,
      iconUrl: item.iconUrl,
      iconBase64: item.iconBase64,
      loadingBarBase64: item.loadingBarBase64,
    }))

    await Promise.all(
      items.map(async (item) => {
        await prisma.items.create({
          data: item,
        })
      })
    )

    reply.send({ message: 'Success' })
  } catch (error) {
    reply.code(500).send({ error: 'Failed to create items', message: error })
  }
})

// delete all items
server.delete('/items', async (request, reply) => {
  try {
    await prisma.items.deleteMany()
    reply.send({ message: 'Success' })
  } catch (error) {
    reply.code(500).send({ error: 'Failed to delete items' })
  }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
