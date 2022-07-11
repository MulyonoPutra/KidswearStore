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

  const updateConditions = () => {
    if(loading && loadingUpdate) {
      return <Loading/>
    } else if(error && errorUpdate){
      return <ErrorToast />
    } else if(successUpdate){
      return <SuccessToast/>
    }
  }

  return (
    (
      <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>User Profile</h1>
          </div>
          {loading ? (
            <Loading/>
          ) : error ? (
            <ErrorToast/>
          ) : (
            <>
              {loadingUpdate && <Loading/>}
              {errorUpdate && (
                <ErrorToast/>
              )}
              {successUpdate && (
                <SuccessToast message='Successfully Updated!'/>
              )}
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="confirmPassword">confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>

              <div>
                <label />
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    ));
};
export default Profile;
