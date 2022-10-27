import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Register = () => {
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }

    try {
      const { data } = await axios.post('/api/users/register', {
        staffId,
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout title="Login">
      <div className="min-h-screen flex justify-center items-center  ">
        <div className="md:w-1/2  p-4 rounded-lg   outline outline-violet-200  ">
          <h1 className="text-orange-500 text-3xl  items-center justify-center flex  font-bold mb-4">
            Register
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col  space-y-4">
            <div className="flex justify-center mt-4">
              <p className="border cursor-pointer shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <AiFillFacebook className="mr-2" /> Facebook
              </p>
              <p className="border cursor-pointer shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <FcGoogle className="mr-2" /> Google
              </p>
            </div>
            {/* STAFFID */}
            <div className="flex flex-col mb-4 mt-9">
              <label
                htmlFor="staffId"
                className="font-semibold text-orange-600"
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

            {/* FirstName */}
            <div className="flex flex-col mb-4 mt-9">
              <label
                htmlFor="firstName"
                className="font-semibold text-orange-600"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {/* LastName */}
            <div className="flex flex-col mb-4 mt-9">
              <label
                htmlFor="lastName"
                className="font-semibold text-orange-600"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col mb-4 mt-9">
              <label htmlFor="email" className="font-semibold text-orange-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
                placeholder="demakventures@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col mb-4 mt-9">
              <label
                htmlFor="password"
                className="font-semibold text-orange-600"
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

            {/* confirm Password */}
            <div className="flex flex-col mb-4 mt-9">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-orange-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="*******"
                className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="primary-button w-full text-white" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
