import axios from 'axios'
import * as cheerio from 'cheerio'
import { imgUrlToBase64 } from '../utils/imgUrlToBase64'
import type { ScrapedItem } from '../types/ScrapedItem'

export const scrapeItems: () => Promise<ScrapedItem[]> = async () => {
  const url = 'https://bindingofisaacrebirth.fandom.com/wiki/Items'
  // Make an HTTP GET request to the website page
  const response = await axios.get(url)

  // Load the HTML response into Cheerio for easy DOM traversal
  const $ = cheerio.load(response.data)

  const table = $('table')
  const tableRows = table.find('tr')
  const items = tableRows
    .map((i, element) => {
      const idString = $(element).find('td').eq(1).attr('data-sort-value')
      const itemId = idString ? parseInt(idString, 10) : 0
      const name = $(element).find('td').eq(0).text().replace(/\n/g, '')
      let iconUrl
      let loadingBarUrl
      if ($(element).find('td').eq(2).find('div').length === 2) {
        iconUrl =
          $(element)
            .find('td')
            .eq(2)
            .find('div')
            .eq(0)
            .find('img')
            .attr('data-src') ?? ''
        loadingBarUrl =
          $(element)
            .find('td')
            .eq(2)
            .find('div')
            .eq(1)
            .find('img')
            .attr('data-src') ?? ''
      } else {
        iconUrl = $(element).find('td').eq(2).find('img').attr('data-src') ?? ''
        loadingBarUrl = null
      }

      return { itemId, name, iconUrl, loadingBarUrl }
    })
    .get()
    .filter((item) => item.itemId > 0) // Remove the first row (header) and items without an ID
  // .sort((a, b) => a.itemsId - b.itemsId)

  const result = await Promise.all(
    items.map(async (item) => {
      const iconBase64 = await imgUrlToBase64(item.iconUrl)
      const loadingBarBase64 = item.loadingBarUrl
        ? await imgUrlToBase64(item.loadingBarUrl)
        : null
      return { ...item, iconBase64, loadingBarBase64 }
    })
  )
  return result
}
