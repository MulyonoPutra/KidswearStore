import { ErrorToast, Loading } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { detailUser } from 'config/redux/action/user.action';

import './profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const userDetails = useSelector((state) => state.userDetails);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [sellerName, setSellerName] = useState('');
  // const [sellerLogo, setSellerLogo] = useState('');
  // const [sellerDescription, setSellerDescription] = useState('');

  const { userInfo } = userSignin;
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user) {
      dispatch(detailUser(userInfo._id));
    }
  }, [dispatch, user, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorToast />
      ) : (
        <div className='overflow-y-hidden'>
          <div className='containers'>
            <div className='containers-wrapper'>
              <div className='containers-shipping'>
                <div>
                  <p className='containers-shipping-title'>Update Profile</p>
                </div>
                <form className='form-w-full'>
                  <div className='containers-forms'>
                    <input
                      className='form-w-full'
                      type='text'
                      placeholder='name'
                      value={user?.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className='form-w-full'
                      type='text'
                      placeholder='Phone Number'
                      value={user?.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className='form-w-full'
                      type='text'
                      placeholder='Password'
                      id={password.toString()}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      className='form-w-full'
                      type='text'
                      placeholder='Confirm Password'
                      id={confirmPassword.toString()}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className='btn-proceed'
                    type='submit'
                    onClick={submitHandler}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
