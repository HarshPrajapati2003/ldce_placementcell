import { Link, Navigate, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Success from './Success';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../Authentication/Redux/AuthSlice';

const Courses = ['Select Course', 'Under Graduate', 'Post Graduate',"Both"];

const courseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`;

const PostJob = () => {
  const [isPending,setIspanding]=useState("")
  const [showMinCPIInput, setShowMinCPIInput] = useState(false);
  const [showMinSPIInput, setShowMinSPIInput] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user?.data?.role !== 'TPO') {
        navigate('/');
      }
    }
  }, []);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedDepartments((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedDepartments((prevSelected) =>
        prevSelected.filter((item) => item !== id),
      );
    }
    // console.log('selectedDepartments : ', selectedDepartments);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [pic, setPic] = useState();

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

  const submitCompany = async (logo,companyName,location,email,description,position,lastDate,packageLPA,address,course,
    minCPI,
    minSPI,
    departments,
  ) => {
    setIspanding('loading');
    try {
       const res = await axios.post('/company/registration', {
         logo,
         companyName,
         location,
         email,
         description,
         position,
         lastDate,
         packageLPA,
         address,
         course,
         minCPI,
         minSPI,
         departments,
       });

      if (res.status == 201) {
         setIspanding("");
         toast.success(res.data.message);
       } 
    } catch (error) {
       setIspanding('');
      console.log(error)
      toast.error(`sorry, ${error.response.data.message}`);
    }
   
  };

//   useEffect(() => {
//     if (formData) {
//       toast.success('Registered Successfully');
//     }
  //   }, [formData]);
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <DefaultLayout>
        <Breadcrumb pageName="Job Post" />

        <div className="flex flex-col gap-9">
          {/* <!-- Registration Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-primary dark:text-[#FDE4D0]">
                Company Information
              </h3>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                console.log('url : ', pic);
                if (selectedDepartments.length == 0) {
                  toast.error('Please Select Departments');
                  return;
                }
                const {
                  companyName,
                  location,
                  email,
                  description,
                  position,
                  lastDate,
                  packageLPA,
                  address,
                  course,
                  minCPI,
                  minSPI,
                } = data;

                const logo = pic;
                const departments = selectedDepartments;
                submitCompany(
                  logo,
                  companyName,
                  location,
                  email,
                  description,
                  position,
                  lastDate,
                  packageLPA,
                  address,
                  course,
                  minCPI,
                  minSPI,
                  departments,
                );
              })}
              method="POST"
            >
              <div className="p-6.5">
                {/* General Information */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-black dark:text-white">
                      Company Logo<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="file"
                      name="logo"
                      accept=".png,.jpg,.jpeg"
                      {...register('logo', {
                        required: 'logo is required',
                        validate: {
                          maxSize: (file) =>
                            file[0]?.size <= 1048576 ||
                            'logo size must be less than 1 MB',
                        },
                      })}
                      onChange={(e) => photoDetail(e.target.files[0])}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {errors.logo && (
                      <p className="text-red-500">{errors.logo.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Company Name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('companyName', {
                        required: 'Company name is required',
                        pattern: {
                          value: /^[A-Za-z\s.'-]+$/, // Accepts alphabetic characters, spaces, dots, apostrophes, and hyphens
                          message:
                            'Invalid Company Name. Only letters, spaces, dots, apostrophes, and hyphens are allowed.',
                        },
                      })}
                      placeholder="Enter your company name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.companyName && (
                      <p className="text-red-500">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Location<span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register('location', {
                        required: 'Location is required',
                        pattern: {
                          value: /^[A-Za-z\s,]+$/,
                          message:
                            'Invalid location name. Only alphabetic characters, spaces, and commas are allowed.',
                        },
                      })}
                      type="text"
                      placeholder="Enter location (e.g., Ahmedabad, Gujarat)"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.location && (
                      <p className="text-red-500">{errors.location.message}</p>
                    )}
                  </div>
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
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <textarea
                      rows={6}
                      {...register('description', {
                        required: 'Description is required', // Add validation rules here
                      })}
                      placeholder="Enter Description Of Company"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500">
                        {errors.description.message}
                      </p> // Display validation error message
                    )}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Position Name For Job
                      <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register('position', {
                        required: 'Position name is required',
                      })}
                      type="text"
                      placeholder="Enter job position"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.position && (
                      <p className="text-red-500">{errors.position.message}</p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <DatePickerOne
                      title="Last Date Of Apply"
                      name="lastDate"
                      register={register}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Package Offer In LPA
                      <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register('packageLPA', {
                        required: 'Package is required (e.g., 4.45)',
                        pattern: {
                          value: /^\d+(\.\d+)?$/,
                          message:
                            'Invalid package number. Please enter a valid float number (e.g., 4.45).',
                        },
                      })}
                      name="packageLPA"
                      placeholder="Enter Package (e.g., 4.45)"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.packageLPA && (
                      <p className="text-red-500">
                        {errors.packageLPA.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <textarea
                      rows={6}
                      {...register('address', {
                        required: 'Address is required', // Add validation rules here
                      })}
                      placeholder="Enter Address Of Company"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                    {errors.address && (
                      <p className="text-red-500">{errors.address.message}</p> // Display validation error message
                    )}
                  </div>
                </div>
                {/* Parents Information */}
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"></div>
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-3">
                  <h3 className="font-medium text-primary dark:text-[#FDE4D0]">
                    Eligibility Criteria
                  </h3>
                </div>
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
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => setShowMinCPIInput(e.target.checked)}
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-gray-900 dark:text-gray-300"
                        >
                          Minimum CPI Criteria
                        </label>
                      </div>
                    </label>
                    {showMinCPIInput && (
                      <div>
                        <input
                          {...register('minCPI', {
                            required: 'Minimum CPI is required',
                            validate: {
                              positiveNumber: (value) => {
                                if (isNaN(value) || value < 0) {
                                  return 'Minimum CPI must be a positive number';
                                }
                                return true;
                              },
                              maxValue: (value) => {
                                if (parseFloat(value) > 10) {
                                  return 'Minimum CPI must be less than or equal to 10';
                                }
                                return true;
                              },
                            },
                          })}
                          type="text"
                          defaultValue={showMinCPIInput ? '' : '0'}
                          placeholder="Enter minimum required CPI (eg. 7.00)"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.minCPI && (
                          <p className="text-red-500">
                            {errors.minCPI.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => setShowMinSPIInput(e.target.checked)}
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-gray-900 dark:text-gray-300"
                        >
                          Minimum SPI Criteria
                        </label>
                      </div>
                    </label>
                    {showMinSPIInput && (
                      <div>
                        <input
                          {...register('minSPI', {
                            required: 'Minimum SPI is required',
                            validate: {
                              positiveNumber: (value) => {
                                if (isNaN(value) || value < 0) {
                                  return 'Minimum SPI must be a positive number';
                                }
                                return true;
                              },
                              maxValue: (value) => {
                                if (parseFloat(value) > 10) {
                                  return 'Minimum SPI must be less than or equal to 10';
                                }
                                return true;
                              },
                            },
                          })}
                          type="text"
                          defaultValue={showMinSPIInput ? '' : '0'}
                          placeholder="Enter minimum required SPI (eg. 7.50)"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.minSPI && (
                          <p className="text-red-500">
                            {errors.minSPI.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Department<span className="text-meta-1">*</span>
                </label>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:border-strokedark dark:bg-boxdark">
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Applied Mechanics"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Applied Mechanics"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Applied Mechanics
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Bio Medical Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Bio Medical Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Bio Medical Engineering
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Chemical Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Chemical Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Chemical Engineering
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Civil Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Civil Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Civil Engineering
                          </label>
                        </div>
                      </li>
                    </ul>
                  </>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:border-strokedark dark:bg-boxdark">
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Computer Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Computer Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Computer Engineering
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Electrical Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Electrical Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Electrical Engineering
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Science and Humanities"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Science and Humanities"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Science and Humanities
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Environmental Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Environmental Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Environmental Engineering
                          </label>
                        </div>
                      </li>
                    </ul>
                  </>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:border-strokedark dark:bg-boxdark">
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Instrumentation & Control Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Instrumentation & Control Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Instrumentation & Control Engineering
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Electronics & Communication Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Electronics & Communication Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Electronics & Communication Engineering
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Information Technology"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Information Technology"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Information Technology
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Mechanical Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Mechanical Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Mechanical Engineering
                          </label>
                        </div>
                      </li>
                    </ul>
                  </>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:border-strokedark dark:bg-boxdark">
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Plastic Technology"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Plastic Technology"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Plastic Technology
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Rubber Technology"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Rubber Technology"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Rubber Technology
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Textile Technology"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Textile Technology"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Textile Technology
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="Automobile Engineering"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="Automobile Engineering"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Automobile Engineering
                          </label>
                        </div>
                      </li>
                    </ul>
                  </>
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
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default PostJob;
