import { useEffect, useState } from 'react';
import Product from './Product';

export default function Products() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [priceSortInput, setPriceSortInput] = useState('asc');
  const [topRatedInput, setTopRatedInput] = useState(true);

  /*
  目標URL: 
  https://dummyjson.com/products/search?q=apple&sortBy=price&order=desc
  https://dummyjson.com/products/search?q=phone&limit=10&skip=10&select=title,price,description,


  */

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

    function createFetchUrl() {
      const baseUrl = 'https://dummyjson.com/products';
      const connection = '&';
      const selectedData = 'select=title,price,thumbnail,availabilityStatus,description,category,rating';

      let officialUrl = baseUrl;

      if (!searchInput) {
        officialUrl += '?';
      }

      if (searchInput !== '') {
        officialUrl += '/search?q=' + searchInput;
      }

      if (topRatedInput) {
        officialUrl += connection + 'sortBy=' + 'rating';
        officialUrl += connection + 'order=' + 'asc';
      } else {
        officialUrl += connection + 'sortBy=price';
        officialUrl += connection + 'order=' + priceSortInput;
      }

      officialUrl += connection + selectedData;
      console.log(officialUrl);
      return officialUrl;
    }

    const fetchUrl = createFetchUrl();

    fetchData(fetchUrl);

    return () => {
      isMounted = false;
    };
  }, [searchInput, topRatedInput, priceSortInput]);

  useEffect(() => {
    
    setTopRatedInput(false);
  }, [priceSortInput]);

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <>
      <div className='search-input'>
        <input type='text' value={searchInput} placeholder='Search Product Name & Description' onChange={handleChange} />
        <i className='bi bi-search'></i>
      </div>
      <div className='sort-input'>
        <p>Sort by</p>
        <button type='button' onClick={() => setTopRatedInput((v) => !v)}>
          Top Rated
        </button>
        <select value={priceSortInput} onChange={(e) => setPriceSortInput(e.target.value)}>
          <option value='asc'>Price: Low to High</option>
          <option value='desc'>Price: High to Low</option>
        </select>
      </div>
      <p className='total'>Total: {total}</p>
      <div className='products'>{products ? products.map((product) => <Product key={product.id} title={product.title} description={product.description} price={product.price} thumbnail={product.thumbnail} availabilityStatus={product.availabilityStatus} />) : <p>Loading...</p>}</div>
    </>
  );
}
