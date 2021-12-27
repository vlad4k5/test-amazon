import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductItem from './components/ProductItem/ProductItem'
import s from './App.module.scss'

const App = () => {
  const [products, setProducts] = useState([])
  const [numberOfProducts, setNumberOfProducts] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await axios.get('https://618c282cded7fb0017bb9445.mockapi.io/api/products')
      setProducts(res.data)
      setLoading(false)
    })()
  }, [])

  const onChangeSearchInput = e => {
    setSearchValue(e.target.value)
  }

  const onClickFind = async () => {
    setLoading(true)
    const res = await axios.get(
      `https://618c282cded7fb0017bb9445.mockapi.io/api/products?name=${searchValue}`
    )
    setProducts(res.data)
    setNumberOfProducts(searchValue ? res.data.length : null)
    setLoading(false)
  }

  return (
    <div className={s.appContainer}>
      <div className={s.searchWrapper}>
        <input placeholder="Search..." onChange={onChangeSearchInput} value={searchValue} />
        <button onClick={onClickFind}>Find Products</button>
        <h2 className={s.contentTitle}>
          {numberOfProducts !== null ? `${products.length} results was found` : 'All Products'}
        </h2>
      </div>

      <div className={s.productsList}>
        {!loading ? (
          products.map(product => (
            <ProductItem
              key={product.asin}
              img={product.img}
              link={product.link}
              name={product.name}
              price={product.price}
              category={product.bsr_category}
            />
          ))
        ) : (
          <div className={s.notFoundCase}> Loading... </div>
        )}
      </div>
    </div>
  )
}
export default App
