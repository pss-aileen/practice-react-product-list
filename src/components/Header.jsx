import { useContext } from 'react';
import { StateContext } from '../StateContext';

export default function Header() {
  const { searchInput, setSearchInput } = useContext(StateContext);
  return (
    <header>
      <div>
        <h1>
          <i className='bi bi-bag-heart-fill'></i>
          <span>Product List</span>
        </h1>
        <div className='search-input'>
          <input type='text' value={searchInput} placeholder='Search Product Name & Description' onChange={(e) => setSearchInput(e.target.value)} />
          <i className='bi bi-search'></i>
        </div>
      </div>
    </header>
  );
}
