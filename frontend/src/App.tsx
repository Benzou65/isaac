import { useEffect, useState } from 'react'
import { css } from '../styled-system/css'

import { Items } from './types/Items'

function App() {
  const [data, setData] = useState<Items[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:8080/items')
    const data = (await res.json()) as Items[]
    console.log('data', data)

    setData(data)
    setLoading(false)
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
      <h1 className={css({ color: 'fuchsia.700', fontSize: '2xl' })}>
        Binding of Issac Items
      </h1>

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
