import { ErrorToast, Loading, SuccessToast } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { detailUser } from 'config/redux/action/user.action';

import './profile.scss';
import { updateUserProfile } from './../../config/redux/action/user.action';
import { USER_UPDATE_PROFILE_RESET } from 'config/constants/user.constant';

const Profile = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const userDetails = useSelector((state) => state.userDetails);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [sellerName, setSellerName] = useState('');
  // const [sellerLogo, setSellerLogo] = useState('');
  // const [sellerDescription, setSellerDescription] = useState('');

  const { userInfo } = userSignin;
  const { loading, error, user } = userDetails;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and Confirm Password are not matched!');
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorToast />
      ) : (
        <>
          {loadingUpdate && <Loading />}
          {errorUpdate && <ErrorToast />}
          {successUpdate && <SuccessToast message='Successfully Updated!' />}
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        className='form-w-full'
                        type='text'
                        placeholder='Phone Number'
                        value={email}
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
        </>
      )}
      ;
    </div>
  );
};
export default Profile;
