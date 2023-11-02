import { useEffect, useState } from 'react'

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
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <img src={item.iconBase64} />
            {item.loadingBarBase64 && <img src={item.loadingBarBase64} />}
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h1>Binding of Issac Items</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{!loading && renderTable()}</tbody>
      </table>
    </div>
  )
}

export default App
