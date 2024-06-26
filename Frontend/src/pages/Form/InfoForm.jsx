import { Link, Navigate, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import { useForm } from 'react-hook-form';
import {
  saveStudentDataAsync,
  selectData,
  selectError,
  selectFormStatus,
  selectProfileError,
  selectStudentProfile,
} from './Redux/FormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Success from './Success';
import toast, { Toaster } from 'react-hot-toast';
import Protected from '../Protected';
import { selectLoggedInUser } from '../Authentication/Redux/AuthSlice';

const Casts = ['Select Cast', 'General', 'SEBC', 'SC', 'ST', 'EWS'];
const castIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-contact"
          >
            <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <circle cx="12" cy="10" r="2" />
            <line x1="8" x2="8" y1="2" y2="4" />
            <line x1="16" x2="16" y1="2" y2="4" />
          </svg>`;

const Departments = [
  'Select Department',
  'Applied Mechanics',
  'Bio Medical Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'Computer Engineering',
  'Electrical Engineering',
  'Electronics & Communication Engineering',
  'Environmental Engineering',
  'Information Technology',
  'Instrumentation & Control Engineering',
  'Science and Humanities',
  'Mechanical Engineering',
  'Plastic Technology',
  'Rubber Technology',
  'Textile Technology',
  'Automobile Engineering',
];
const DepartmentIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`;

const Courses = ['Select Course', 'Under Graduate', 'Post Graduate'];
const HSCMode = ['Regular or Diploma', 'Regular Student', 'Diploma Student'];
const courseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`;

const InfoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(selectProfileError);
  const formData = useSelector(selectStudentProfile);
  const isPending = useSelector(selectFormStatus);
  const [pic, setPic] = useState();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user?.data?.role !== 'student') {
        navigate('/');
      }
    }
  }, []);

  const photoDetail = (pics) => {
    const data = new FormData();
    data.append('file', pics);
    data.append('upload_preset', 'chat-app');
    data.append('cloud_name', 'dbm16fwp2');
    fetch('https://api.cloudinary.com/v1_1/dbm16fwp2/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        console.log(data.url.toString());
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    // if (error) {
    //   toast.error(`Sorry, Somthing Went Wrong Error : ${error}`);
    // }
    if (formData) {
      toast.success('Registered Successfully');
    }
  }, [error, formData]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {formData && !error && (
        <Success
          formData={formData}
          error={error}
          title={formData.data.message}
        />
      )}
      {!formData && (
        <DefaultLayout>
          <Breadcrumb pageName="Application Form" />

          <div className="flex flex-col gap-9">
            {/* <!-- Registration Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-primary dark:text-[#FDE4D0]">
                  Personal Information
                </h3>
              </div>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  console.log('url : ', pic);
                  const {
                    firstName,
                    middleName,
                    lastName,
                    adharNo,
                    PANNumber,
                    mobileNo,
                    email,
                    dob,
                    cast,
                    fatherName,
                    motherName,
                    parentsMobileNo,
                    address,
                    state,
                    city,
                    pincode,
                    course,
                    department,
                    passingYear,
                    enrollmentNumber,
                    sscPercentage,
                    HSCMode,
                    hscPercentage,
                    spi,
                    cpi,
                    cgpa,
                    placed,
                    currApply,
                    currLPA,
                    isVerified,
                  } = data;

                  const photo = pic;
                  const spiArray = spi.split(',').map(Number);
                  dispatch(
                    saveStudentDataAsync({
                      _id: user.data._id,
                      photo,
                      firstName,
                      middleName,
                      lastName,
                      adharNo,
                      PANNumber,
                      mobileNo,
                      email,
                      dob,
                      cast,
                      fatherName,
                      motherName,
                      parentsMobileNo,
                      address,
                      state,
                      city,
                      pincode,
                      course,
                      department,
                      passingYear,
                      enrollmentNumber,
                      sscPercentage,
                      HSCMode,
                      hscPercentage,
                      spi: spiArray,
                      cpi,
                      cgpa,
                      placed,
                      currApply,
                      currLPA,
                      isVerified,
                    }),
                  );

                  if (error) {
                    toast.error(`Sorry, Somthing Went Wrong Error : ${error}`);
                  }
                })}
                method="POST"
              >
                <div className="p-6.5">
                  {/* General Information */}
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full">
                      <label className="mb-3 block text-black dark:text-white">
                        Your Photo<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="file"
                        name="photo"
                        accept=".png,.jpg,.jpeg"
                        {...register('photo', {
                          required: 'Photo is required',
                          validate: {
                            maxSize: (file) =>
                              file[0]?.size <= 1048576 ||
                              'Photo size must be less than 1 MB',
                          },
                        })}
                        onChange={(e) => photoDetail(e.target.files[0])}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      />
                      {errors.photo && (
                        <p className="text-red-500">{errors.photo.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First Name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('firstName', {
                          required: 'First name is required',
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message:
                              'Invalid First Name. Only alphabetic characters are allowed.',
                          },
                        })}
                        placeholder="Enter your first name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.firstName && (
                        <p className="text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Middle Name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('middleName', {
                          required: 'Middle name is required',
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message:
                              'Invalid Middle Name. Only alphabetic characters are allowed.',
                          },
                        })}
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.middleName && (
                        <p className="text-red-500">
                          {errors.middleName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last Name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('lastName', {
                          required: 'Last name is required',
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message:
                              'Invalid Last Name. Only alphabetic characters are allowed.',
                          },
                        })}
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.lastName && (
                        <p className="text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Aadhar Number<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="adharNo"
                        placeholder="Enter your Aadhar number"
                        pattern="[0-9]{12}" // Pattern for 12-digit Aadhar number
                        title="Aadhar number must be a 12-digit numeric value"
                        {...register('adharNo', {
                          required: 'Aadhar number is required',
                          pattern: {
                            value: /^[0-9]{12}$/,
                            message:
                              'Invalid Aadhar number. It must be a 12-digit numeric value.',
                          },
                        })}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.adharNo && (
                        <p className="text-red-500">{errors.adharNo.message}</p>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        PAN Number<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="PANNumber"
                        placeholder="Enter your PAN number"
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" // Pattern for PAN number
                        title="PAN number must be in the format ABCDE1234F"
                        {...register('PANNumber', {
                          required: 'PAN number is required',
                          pattern: {
                            value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                            message:
                              'Invalid PAN number. It must be in the format ABCDE1234F.',
                          },
                        })}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.PANNumber && (
                        <p className="text-red-500">
                          {errors.PANNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Mobile Number<span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="mobileNo"
                        placeholder="Enter your mobile number"
                        pattern="[0-9]{10}" // Pattern for mobile number (10 digits)
                        title="Mobile number must be 10 digits"
                        {...register('mobileNo', {
                          required: 'Mobile number is required',
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message:
                              'Invalid mobile number. It must be 10 digits.',
                          },
                        })}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.mobileNo && (
                        <p className="text-red-500">
                          {errors.mobileNo.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: 'Email is not valid',
                          },
                        })}
                        placeholder="Enter your email address"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <DatePickerOne
                        title="Date Of Birth"
                        name="dob"
                        register={register}
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <SelectGroupTwo
                        SelectOptions={Casts}
                        icon={castIcon}
                        name="cast"
                        register={register}
                        title={'Select Cast'}
                      />
                    </div>
                  </div>
                  {/* Parents Information */}
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"></div>
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-3">
                    <h3 className="font-medium text-primary dark:text-[#FDE4D0]">
                      Parents Information
                    </h3>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Father's Name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('fatherName', {
                          required: "Father's name is required",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              "Invalid Father's Name. Only alphabetic characters and spaces are allowed.",
                          },
                        })}
                        type="text"
                        placeholder="Enter your father's name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.fatherName && (
                        <p className="text-red-500">
                          {errors.fatherName.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Mother's Name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('motherName', {
                          required: "Mother's name is required",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              "Invalid Mother's Name. Only alphabetic characters and spaces are allowed.",
                          },
                        })}
                        type="text"
                        placeholder="Enter your mother's name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.motherName && (
                        <p className="text-red-500">
                          {errors.motherName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Father's Mobile No.
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('parentsMobileNo', {
                          required: "Father's mobile number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message:
                              'Invalid mobile number. Please enter a 10-digit number without any spaces or special characters.',
                          },
                        })}
                        type="text"
                        name="parentsMobileNo"
                        placeholder="Enter your father's number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.parentsMobileNo && (
                        <p className="text-red-500">
                          {errors.parentsMobileNo.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark "></div>
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-3">
                    <h3 className="font-medium text-primary dark:text-[#FDE4D0]">
                      Residential Information
                    </h3>
                  </div>
                  {/* Residential Information */}
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full">
                      <textarea
                        rows={6}
                        {...register('address', {
                          required: 'Address is required', // Add validation rules here
                        })}
                        placeholder="Enter your address"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      ></textarea>
                      {errors.address && (
                        <p className="text-red-500">{errors.address.message}</p> // Display validation error message
                      )}
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        State Name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('state', {
                          required: 'State name is required',
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              'Invalid state name. Please enter only alphabetic characters and spaces.',
                          },
                        })}
                        type="text"
                        name="state"
                        placeholder="Enter your state name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.state && (
                        <p className="text-red-500">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        City Name<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('city', {
                          required: 'City name is required',
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              'Invalid city name. Please enter only alphabetic characters and spaces.',
                          },
                        })}
                        type="text"
                        name="city"
                        placeholder="Enter your city name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Pincode No.<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('pincode', {
                          required: 'Pincode is required',
                          pattern: {
                            value: /^[0-9]{6}$/,
                            message:
                              'Invalid pincode. Please enter a valid 6-digit pincode.',
                          },
                        })}
                        type="text"
                        name="pincode"
                        placeholder="Enter your pincode"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.pincode && (
                        <p className="text-red-500">{errors.pincode.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark "></div>
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-3">
                    <h3 className="font-medium text-primary dark:text-[#FDE4D0]">
                      Academic Information
                    </h3>
                  </div>
                  {/* Academic Information */}
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <SelectGroupTwo
                        SelectOptions={Courses}
                        icon={courseIcon}
                        name="course"
                        register={register}
                        title={'Select Course'}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <SelectGroupTwo
                        SelectOptions={Departments}
                        icon={DepartmentIcon}
                        name="department"
                        register={register}
                        title={'Select Department'}
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-black dark:text-white">
                        Passing Year<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('passingYear', {
                          required: 'Passing year is required',
                          pattern: {
                            value: /^[0-9]{4}$/,
                            message:
                              'Invalid passing year. Please enter a valid 4-digit year.',
                          },
                        })}
                        type="text"
                        name="passingYear"
                        placeholder="Enter your passing year"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.passingYear && (
                        <p className="text-red-500">
                          {errors.passingYear.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      GTU Enrollment No. <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register('enrollmentNumber', {
                        required: 'Enrollment number is required',
                        pattern: {
                          value: /^\d{12}$/,
                          message:
                            'Invalid enrollment number. Please enter a 12-digit number.',
                        },
                      })}
                      type="text"
                      name="enrollmentNumber"
                      placeholder="Enter your enrollment number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.enrollmentNumber && (
                      <p className="text-red-500">
                        {errors.enrollmentNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        10th Percentage<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('sscPercentage', {
                          required: '10th percentage is required',
                          pattern: {
                            value: /^(\d+(\.\d{1,2})?)$/,
                            message:
                              'Invalid 10th percentage. Please enter a valid number (e.g., 90 or 90.24).',
                          },
                        })}
                        type="text"
                        name="sscPercentage"
                        placeholder="eg. : 93.4"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.sscPercentage && (
                        <p className="text-red-500">
                          {errors.sscPercentage.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2 mt-0.5">
                      <SelectGroupTwo
                        SelectOptions={HSCMode}
                        icon={courseIcon}
                        name="HSCMode"
                        register={register}
                        title={'Select HSC Type'}
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        12th Percentage / Diploma CPI
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('hscPercentage', {
                          required: '12th percentage / Diploma CPI is required',
                          pattern: {
                            value: /^(\d+(\.\d{1,2})?)$/,
                            message:
                              'Invalid ,Please enter a valid number (e.g.,90.23 or 7.67).',
                          },
                        })}
                        name="hscPercentage"
                        placeholder="eg. : 90.23 or 7.67"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.hscPercentage && (
                        <p className="text-red-500">
                          {errors.hscPercentage.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        All SPI (Separated with comma)
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('spi', {
                          required: 'All SPI is required',
                          pattern: {
                            value: /^(\d+(\.\d{1,2})?(,\s*\d+(\.\d{1,2})?)*)?$/,
                            message:
                              'Invalid SPI format. Please enter comma-separated SPI values (e.g., 8.74, 8.0, 8.13, 7.70).',
                          },
                        })}
                        type="text"
                        name="spi"
                        placeholder="eg. 8.74, 8.0, 8.13, 7.70"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.spi && (
                        <p className="text-red-500">{errors.spi.message}</p>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        CPI<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('cpi', {
                          required: 'CPI is required',
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message:
                              'Invalid CPI format. Please enter a valid CPI value (e.g., 7.78).',
                          },
                          max: {
                            value: 10,
                            message: 'CPI must be less than or equal to 10.',
                          },
                        })}
                        type="text"
                        name="cpi"
                        placeholder="Enter your CPI (e.g., 7.78)"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.cpi && (
                        <p className="text-red-500">{errors.cpi.message}</p>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        CGPA<span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register('cgpa', {
                          required: 'CGPA is required',
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message:
                              'Invalid CGPA format. Please enter a valid CGPA value (e.g., 7.78).',
                          },
                          max: {
                            value: 10,
                            message: 'CGPA must be less than or equal to 10.',
                          },
                        })}
                        type="text"
                        name="cgpa"
                        placeholder="Enter your CGPA (e.g., 7.78)"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.cgpa && (
                        <p className="text-red-500">{errors.cgpa.message}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 cursor-pointer disabled:bg-slate-400"
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
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default InfoForm;
