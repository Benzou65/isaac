import { useEffect, useState } from 'react'
import axios from 'axios'
import { css } from '../styled-system/css'

import { Items } from './types/Items'
import loadingIcon from './assets/loading.svg'

function App() {
  const [data, setData] = useState<Items[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:8080/items')
      const data = res.data as Items[]
      console.log('items', data)
      setData(data)
    } catch (error) {
      console.error('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderTable = () => {
    return data.map((item) => {
      return (
        <tr key={item.id}>
          <td className={css({ textAlign: 'center' })}>{item.itemId}</td>
          <td className={css({ textAlign: 'center' })}>{item.name}</td>
          <td className={css({ textAlign: 'center' })}>
            <div className={css({ display: 'flex' })}>
              <img
                src={item.iconBase64}
                width={96}
                height={96}
                className={css({ imageRendering: 'pixelated' })}
              />
              {item.loadingBarBase64 && (
                <img
                  src={item.loadingBarBase64}
                  width={12}
                  height={54}
                  className={css({
                    imageRendering: 'pixelated',
                    alignSelf: 'center',
                  })}
                />
              )}
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '80%',
      })}
    >
      <h1
        className={css({
          color: 'red.500',
          fontSize: '2xl',
          textAlign: 'center',
        })}
      >
        Binding of Issac Items
      </h1>

      {loading && (
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <img
            src={loadingIcon}
            width={64}
            height={64}
            className={css({
              opacity: 0.5,
            })}
          />
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>{!loading && renderTable()}</tbody>
      </table>
    </div>
  )
}

export default App
