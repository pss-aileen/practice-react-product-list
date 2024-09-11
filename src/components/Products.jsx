import { useEffect, useState } from 'react';
import Product from './Product';

export default function Products() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [priceSortInput, setPriceSortInput] = useState('asc');
  const [priseSortInputFrag, setPriseSortInputFrag] = useState(false);
  const [topRatedInput, setTopRatedInput] = useState(true);
  const [topRatedInputFrag, setTopRatedInputFrag] = useState(true);

  /*
  目標URL: 
  https://dummyjson.com/products/search?q=apple&sortBy=price&order=desc
  https://dummyjson.com/products/search?q=phone&limit=10&skip=10&select=title,price,description,

  デフォルトはtop rated、PriceをさわればPrice順番
  Top retatedを押せば、その通りに

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
        // console.log(json.total);
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

      if (topRatedInput && !priseSortInputFrag) {
        officialUrl += connection + 'sortBy=' + 'rating';
        officialUrl += connection + 'order=' + 'desc';
      } else {
        officialUrl += connection + 'sortBy=price';
        officialUrl += connection + 'order=' + priceSortInput;
      }

      officialUrl += connection + selectedData;
      // console.log(officialUrl);
      return officialUrl;
    }

    const fetchUrl = createFetchUrl();

    fetchData(fetchUrl);

    return () => {
      isMounted = false;
    };
  }, [searchInput, topRatedInput, priceSortInput, priseSortInputFrag]);

  useEffect(() => {}, [priseSortInputFrag]);

  function handlePriceInputChange(value) {
    setPriseSortInputFrag(true);
    setTopRatedInputFrag(false);
    setPriceSortInput(value);
  }

  function handleTopRatedChange() {
    setPriseSortInputFrag(false);
    setTopRatedInput(true);
    setTopRatedInputFrag(true);
  }

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <>
      <header>
        <div>
          <h1>
            <i className='bi bi-bag-heart-fill'></i>
            <span>Product List</span>
          </h1>
          <div className='search-input'>
            <input type='text' value={searchInput} placeholder='Search Product Name & Description' onChange={handleChange} />
            <i className='bi bi-search'></i>
          </div>
        </div>
      </header>

      <div className='sort-input'>
        <div>
          <p className='total'>{total} results</p>
          {/* <p className='total'>1-24 of {total} results</p> */}
          <p>Sort by</p>
          <button type='button' onClick={handleTopRatedChange} className={topRatedInputFrag ? 'is-active' : ''} disabled={topRatedInputFrag}>
            Top Rated
          </button>

          <ul>
            <li>
              <div className={!topRatedInputFrag ? 'is-active' : ''}>
                {topRatedInputFrag ? 'Price' : priceSortInput === 'asc' ? 'Price: Low to High' : 'Price: High to Low'}
                <i className='bi bi-chevron-down'></i>
              </div>
              <ul>
                <li>
                  <div onClick={() => handlePriceInputChange('asc')} className={!topRatedInputFrag && priceSortInput === 'asc' ? 'is-active' : ''}>
                    Price: Low to High {!topRatedInputFrag && priceSortInput === 'asc' ? <i className='bi bi-check2'></i> : ''}
                  </div>
                </li>
                <li>
                  <div onClick={() => handlePriceInputChange('desc')} className={!topRatedInputFrag && priceSortInput === 'desc' ? 'is-active' : ''}>
                    Price: High to Low {!topRatedInputFrag && priceSortInput === 'desc' ? <i className='bi bi-check2'></i> : ''}
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className='container'>
        <div className='products'>{products ? products.map((product) => <Product key={product.id} title={product.title} description={product.description} price={product.price} thumbnail={product.thumbnail} availabilityStatus={product.availabilityStatus} rating={product.rating} />) : <p>Loading...</p>}</div>
      </div>
    </>
  );
}
