import './loading.scss';

const Loading = () => {
  return (
    <div className='flex justify-center mt-6 bg-transparent'>
      <div className='loadingio-spinner-ripple-y0by4actzt'>
        <div className='spinner'>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
