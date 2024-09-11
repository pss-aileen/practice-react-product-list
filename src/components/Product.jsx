import PropTypes from 'prop-types';

export default function Product({ title, description, thumbnail, availabilityStatus, price, rating }) {
  let availabilityStatusOption = '';
  switch (availabilityStatus) {
    case 'In Stock':
      availabilityStatusOption = 'in-stock';
      break;
    case 'Low Stock':
      availabilityStatusOption = 'low-stock';
      break;
    default:
      break;
  }

  return (
    <section>
      <div className='thumbnail'>
        <img src={thumbnail} width='160' height='160' alt={title} />
      </div>
      <p className={`availabilityStatus ${availabilityStatusOption}`}>{availabilityStatus}</p>
      <div className='body'>
        <p className='title'>{title}</p>
        <p className='rating'>★★★★★ {rating}</p>
        <p className='description'>{description}</p>
        <p className='price'>${price}</p>
      </div>
    </section>
  );
}

Product.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  availabilityStatus: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
};
