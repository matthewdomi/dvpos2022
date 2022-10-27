import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async ({ staffId, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/login', {
        staffId,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };

  return (
    <Layout title="Login">
      <div className="min-h-screen flex justify-center items-center  ">
        <div className="md:w-1/3  p-4 rounded-lg  outline outline-violet-200  ">
          <h1 className="text-orange-500 text-3xl  items-center justify-center flex  font-bold mb-4">
            Sign In
          </h1>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col space-y-4"
          >
            <div className="flex justify-center mt-4">
              <p className="border cursor-pointer shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <AiFillFacebook className="mr-2" /> Facebook
              </p>
              <p className="border cursor-pointer shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <FcGoogle className="mr-2" /> Google
              </p>
            </div>

            <div className="flex flex-col mb-4 mt-9">
              <label
                htmlFor="staffId"
                className="font-semibold text-violet-600"
              >
                Staff ID
              </label>
              <input
                type="text"
                name="staffId"
                id="staffId"
                className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
                placeholder="DEMAK1234"
                onChange={(e) => setStaffId(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4 mt-9">
              <label
                htmlFor="password"
                className="font-semibold text-violet-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="primary-button w-full text-white" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
