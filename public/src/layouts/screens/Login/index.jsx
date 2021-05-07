import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { login } from '../../../store/actions';
import { isEmail } from '../../../utils';

import { GrFacebookOption } from 'react-icons/gr';
import { GrGoogle } from 'react-icons/gr';

import Alert from '../../components/Alert';
import logo from '../../../assets/logo.png';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const { _id } = useSelector((state) => state.userState);

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleClick = async () =>
    !isEmail(state.email)
      ? setState({ ...state, error: 'Enter valid email' })
      : !state.password
      ? setState({ ...state, error: 'Password is required' })
      : (await dispatch(login(state)), history.push('/'));

  return (
    <div className="container h-100 d-flex flex-column py-5 justify-content-start align-items-center">
      <img src={logo} className="auth-logo" alt="logo" />
      <h2 className="auth-title">A Simple Tool for Complex Workflows</h2>
      <div className="auth-form__container">
        <h1 className="auth-form__header mb-2">Log in</h1>
        {state.error ? <Alert message={state.error} /> : null}
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={state.email || ''}
          placeholder="Enter email"
          autoComplete="off"
          className="auth-form__input"
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          onChange={handleChange}
          placeholder="Enter password"
          value={state.password || ''}
          className="auth-form__input"
        />
        <button className="btn btn-success btn-sm btn-block my-2" onClick={handleClick}>
          Login
        </button>
        <div className="d-flex justify-content-center w-100 mt-2">
          <p className="auth-form__link">Can't log in?</p>
          &nbsp; &#183; &nbsp;
          <p className="auth-form__link">
            <Link to="/signup">Sign up for an account</Link>
          </p>
        </div>
        <div className="separator">or login using</div>

        <div className="d-flex flex-column justify-content-around w-100 mt-2">
          <a href="api/auth/google" className="google-login">
            <GrGoogle />
            <div>
              <p>Google</p>
            </div>
          </a>
          {/* <a href="api/auth/facebook" className="fb-login">
            <GrFacebookOption />
            <div>
              <p>Facebook</p>
            </div>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
