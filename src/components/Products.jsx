import { useEffect, useState } from 'react';
import Product from './Product';
import { StateContext } from '../StateContext';
import Header from './Header';

export default function Products() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [priceSortInput, setPriceSortInput] = useState('asc');
  const [priseSortInputFrag, setPriseSortInputFrag] = useState(false);
  const [topRatedInput, setTopRatedInput] = useState(true);
  const [topRatedInputFrag, setTopRatedInputFrag] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  // top-rated, low-high, high-lowは sory っていうオブジェクトに入れてしまって、それに応じて切り替えるのがいいのか？

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

  return (
    <>
      <StateContext.Provider value={{ searchInput, setSearchInput }}>
        <Header />

        <div className='products-info'>
          <div>
            <p className='total'>{total} results</p>

            <button type='button' onClick={() => setIsFiltersOpen((bool) => !bool)} className='btn-filter'>
              <i className='bi bi-funnel'></i> Filter
            </button>
            <div className={`overlay ${isFiltersOpen ? 'is-open' : ''}`} onClick={() => setIsFiltersOpen((bool) => !bool)}></div>

            <div className={`filters ${isFiltersOpen ? 'is-open' : ''}`}>
              <div>
                <h2>Filters</h2>
                <button onClick={() => setIsFiltersOpen((bool) => !bool)} className='btn-close' aria-label='close'>
                  <i className='bi bi-x-lg'></i>
                </button>

                <dl>
                  <div className='sort'>
                    <dt>Sort by</dt>
                    <dd>
                      <button type='button' onClick={handleTopRatedChange} className={topRatedInputFrag ? 'is-active' : ''} disabled={topRatedInputFrag}>
                        Top Rated
                      </button>

                      <button type='button' className={!topRatedInputFrag && priceSortInput === 'asc' ? 'is-active' : ''} onClick={() => handlePriceInputChange('asc')}>
                        Price: Low to High
                      </button>
                      <button type='button' className={!topRatedInputFrag && priceSortInput === 'desc' ? 'is-active' : ''} onClick={() => handlePriceInputChange('desc')}>
                        Price: High to Low
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='products'>{products ? products.map((product) => <Product key={product.id} title={product.title} description={product.description} price={product.price} thumbnail={product.thumbnail} availabilityStatus={product.availabilityStatus} rating={product.rating} />) : <p>Loading...</p>}</div>
        </div>
      </StateContext.Provider>
    </>
  );
}
