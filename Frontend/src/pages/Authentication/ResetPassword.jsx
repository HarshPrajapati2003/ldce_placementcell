import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoNew from '../../images/logo/logo-transparent-svg.svg';
import DarkLogoNew from '../../images/logo/darklogo-transparent-svg.svg';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  resetPasswordAsync,
  selectChangeError,
  selectPasswordReset,
  selectPendingstatus,
} from './Redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
  const { token, id } = useParams();
  const error = useSelector(selectChangeError);
  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordReset);
  const [showNotification, setShowNotification] = useState(false);
   const isPending = useSelector(selectPendingstatus);
  useEffect(() => {
    if (error && showNotification) {
      toast.error(`Sorry, ${error}`);
      // setShowNotification(false);
    }
    if (passwordReset && showNotification && !error) {
      toast.success('Password Reset Successfully!');
      // setShowNotification(false);
    }
  }, [error, passwordReset, showNotification]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  return (
    <>
      {/* {passwordReset && <Navigate to="/auth/signin" replace={true}></Navigate>} */}
      <Toaster position="top-center" reverseOrder={false} />
      <DefaultLayout>
        <Breadcrumb pageName="Reset Password" />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-xs">
            <Link className="flex justify-center" to="/">
              <img className="hidden dark:block" src={DarkLogoNew} alt="Logo" />
              <img className="dark:hidden" src={LogoNew} alt="Logo" />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter New Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                reset();
                console.log(data);
                dispatch(
                  resetPasswordAsync({
                    id,
                    token,
                    newPassword: data.password,
                    confirmPassword: data.confirmPassword,
                  }),
                );
                setShowNotification(true);

                setTimeout(() => {
                  setShowNotification(false);
                }, 10000);
              })}
              className="space-y-6 contents"
              method="POST"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                              - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                              - Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:text-black"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    {...register('confirmPassword', {
                      required: 'Confirm password is required',
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        'Password not matching',
                    })}
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:text-black"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {/* {passwordReset && (
                    <p className="text-green-500">
                      Password Reset Successfully!
                    </p>
                  )}
                  {error && <p className="text-red-500">{error}</p>} */}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400"
                  disabled={isPending == 'loading' ? true : false}
                >
                  {isPending == 'loading' && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 mt-1"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      ></path>
                    </svg>
                  )}
                  Reset Password
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Send me back to{' '}
              <Link
                to="/auth/signin"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ResetPassword;
