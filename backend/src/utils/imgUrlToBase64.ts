import axios from 'axios'

export const imgUrlToBase64 = async (url: string) => {
  if (!url) return ''
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const base64 = Buffer.from(response.data, 'binary').toString('base64')

    const extension = getExtension(url)

    return `data:image/${extension};base64,${base64}`
  } catch (error) {
    throw new Error('Failed to convert image URL to base64')
  }
}

const getExtension = (url: string) => {
  const regexPng = /\.png/
  const regexGif = /\.gif/
  const regexJpg = /\.jpe?g/
  const regexSvg = /\.svg/

  if (regexPng.test(url)) return 'png'
  if (regexGif.test(url)) return 'gif'
  if (regexJpg.test(url)) return 'jpg'
  if (regexSvg.test(url)) return 'svg'
  return 'png'
}
