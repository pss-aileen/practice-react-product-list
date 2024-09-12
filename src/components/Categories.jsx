import { useEffect, useState } from 'react';
import Category from './Category';

export default function Categories({ setCategoryInput, categoryInput }) {
  const [categories, setCategories] = useState(null);

  // https://dummyjson.com/products/categories
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
          console.log(json);
          setCategories(json);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData('https://dummyjson.com/products/categories');

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className='categories'>
      <ul>
        {categories
          ? categories.map((category) => {
              return <Category key={category.slug} name={category.name} slug={category.slug} setCategoryInput={setCategoryInput} categoryInput={categoryInput} />;
            })
          : 'Loading...'}
      </ul>
    </div>
  );
}
