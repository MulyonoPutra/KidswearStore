import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorToast = () => {
  useEffect(() => {
    toast.error('Something went wrong!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
export default ErrorToast;
