import axios from 'axios'

export const imgUrlToBase64 = async (url: string) => {
  if (!url) return ''
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const base64 = Buffer.from(response.data, 'binary').toString('base64')

    return `data:image/png;base64,${base64}`
  } catch (error) {
    throw new Error('Failed to convert image URL to base64')
  }
}
