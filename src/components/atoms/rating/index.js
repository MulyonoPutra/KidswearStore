import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar } from '@fortawesome/free-solid-svg-icons';

const Rating = (props) => {
  const { rating, numReviews, caption, className } = props;
  return (
    <div className={className}>
      <span>
        {rating >= 1 ? (
          <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
        ) : rating >= 0.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className='text-yellow-500'
          />
        ) : (
          <FontAwesomeIcon icon={faStar} className='text-gray-500' />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
        ) : rating >= 1.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className='text-yellow-500'
          />
        ) : (
          <FontAwesomeIcon icon={faStar} className='text-gray-500' />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
        ) : rating >= 2.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className='text-yellow-500'
          />
        ) : (
          <FontAwesomeIcon icon={faStar} className='text-gray-500' />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
        ) : rating >= 3.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className='text-yellow-500'
          />
        ) : (
          <FontAwesomeIcon icon={faStar} className='text-gray-500' />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
        ) : rating >= 4.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className='text-yellow-500'
          />
        ) : (
          <FontAwesomeIcon icon={faStar} className='text-gray-500' />
        )}
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span className='ml-2'>{numReviews + ' reviews'}</span>
      )}
    </div>
  );
};
export default Rating;
