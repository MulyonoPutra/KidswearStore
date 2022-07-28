const Alert = ({ condition, title, messages }) => {

  const redAlert = 'bg-red-100 border border-red-400 text-red-700 px-2 py-3 rounded relative';
  const greenAlert = 'bg-green-100 border border-green-400 text-green-700 px-2 py-3 rounded relative';

  return (
    <>
      <div className={ condition ? greenAlert : redAlert}>
        <strong className='font-bold block sm:inline'>{title}</strong> <br />
        <span className='block sm:inline'>{messages}</span>
      </div>
    </>
  );
};
export default Alert;
