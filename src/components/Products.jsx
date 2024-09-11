import { useEffect, useState } from 'react';
import Product from './Product';

export default function Products() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }

        const json = await response.json();
        if (isMounted) {
          setProducts(json.products);
          setTotal(json.total);
        }

        console.log(json.products);
        console.log(json.total);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (searchInput !== '') {
      fetchData('https://dummyjson.com/products/search?q=' + searchInput);
    } else {
      fetchData('https://dummyjson.com/products?&select=title,price,thumbnail,availabilityStatus,description');
    }

    return () => {
      isMounted = false;
    };
  }, [searchInput]);

  useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <>
      <div className='search-input'>
        <input type='text' value={searchInput} placeholder='Search Product Name & Description' onChange={handleChange} />
        <i className='bi bi-search'></i>
      </div>
      <p className='total'>Total: {total}</p>
      <div className='products'>{products ? products.map((product) => <Product key={product.id} title={product.title} description={product.description} price={product.price} thumbnail={product.thumbnail} availabilityStatus={product.availabilityStatus} />) : <p>Loading...</p>}</div>
    </>
  );
}
