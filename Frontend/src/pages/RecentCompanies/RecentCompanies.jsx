import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Protected from '../Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../Authentication/Redux/AuthSlice';
import { fetchStudentDataAsync, selectProfileError, selectStudentProfile } from '../Form/Redux/FormSlice';

const RecentCompanies = () => {
    const [search,setSearch] = useState("")
    const [companies, setCompanies] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false)
  const [render, setRender] = useState(false)
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectProfileError);
  const studentProfile = useSelector(selectStudentProfile);
  useEffect(() => {
    if (user) {
      if (user?.data?.role !== 'student') {
        navigate("/")
      }
    }
  },[])
  const fetchStudentData = async () => {
    try {
      if (user && user.data && user.data._id && !error) {
        const studentID = user.data._id;
        dispatch(fetchStudentDataAsync(studentID));
      }
      else if (error || !studentProfile) {
        // navigate('/forms/registration-form');
      }
      else {
        navigate('/auth/signin');
        console.error('User data or user ID is undefined.');
      }
    } catch (error) {
      // Handle error here
      navigate('/forms/registration-form');
      console.error('Error fetching student data:', error);
    }
  };
    const handleSearch = async (e) => {
         setLoading(true);
        setSearch(e.target.value);
        if (e.target.value == '') {
            setRender(true);
        }
         try {
           const res = await axios.post('/company/search', {
             companyNameRegex: search,
           });
           if (res) {
             setCompanies(res.data.companies);
             console.log(res.data.companies);
           }
         } catch (error) {
             toast.error(`Sorry, ${error.response.data.message}`);
           console.log(error.response.data.message);
         }
         setLoading(false);
    }
    const fetchData = async () => {
        try {
            const res = await axios.get('/company/fetch-companies');
            if (res.status == 200) {
                setCompanies(res.data.companies)
            } 
        } catch (error) {
            console.log(error)
            toast.error(`sorry, ${error.response.data.message}`);
        }
    }
    useEffect(() => {
      setIsLoading(true);
      fetchData()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // Handle error if needed
          console.error('Error fetching data:', error);
        });
    }, [render]);
  
  useEffect(() => {
    fetchStudentData();
  }, []);

    
  return (
    <>
      <DefaultLayout>
        <Toaster position="top-center" reverseOrder={false} />
        <Breadcrumb pageName="Apply For A Job" />
        {/* <!-- ====== RecentCompanies Section Start ====== --> */}
        {!studentProfile && error && <Navigate to="/forms/registration-form" />}

        {companies && companies.length > 0 && studentProfile?.data && (
          <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <section className="p-6 dark:bg-gray-100 dark:text-gray-800 ">
              <div className="container mx-auto">
                <h2 className="text-xl md:text-3xl font-bold text-center dark:text-gray-900 text-primary dark:text-[#FDE4D0]">
                  Exciting Opportunity: Top Companies Arrive for Campus
                  Placement!
                </h2>
                <div className="max-w-md mx-auto my-1 -mb-3 sm:my-3 px-1 w-full pt-6">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={search}
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Search name, email, pan number etc..."
                      onChange={(e) => handleSearch(e)}
                    />
                  </div>
                </div>
                {loading && (
                  <div role="status" className="flex justify-center">
                    <button
                      disabled=""
                      type="button"
                      className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg text-xl hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        />
                      </svg>
                      Loading...
                    </button>
                  </div>
                )}
                <div className="grid gap-0 sm:gap-6 mb-16 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                  {companies.map((company, idx) => (
                    <Link
                      to={`/check-company/${company._id}`}
                      className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm scale-90 hover:scale-95 transition-transform duration-300 hover:shadow-lg hover:border-primary cursor-pointer"
                      key={idx}
                    >
                      {/* Badges start */}
                      <div
                        className="flex justify-center mt-3 font-bold"
                        key={idx}
                      >
                        {/* Success */}
                        {company.applyStudents.includes(
                          studentProfile.data._id,
                        ) && (
                          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="-ms-1 me-1.5 h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>

                            <p className="whitespace-nowrap text-sm">Applied</p>
                          </span>
                        )}

                        {/* Warning */}
                        {company.eligibleStudents.includes(
                          studentProfile.data._id,
                        ) &&
                          !company.applyStudents.includes(
                            studentProfile.data._id,
                          ) && (
                            <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="-ms-1 me-1.5 h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                                />
                              </svg>
                              <p className="whitespace-nowrap text-sm">
                                Apply Now
                              </p>
                            </span>
                          )}

                        {/* Error */}
                        {!company.eligibleStudents.includes(
                          studentProfile.data._id,
                        ) && (
                          <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="-ms-1 me-1.5 h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                              />
                            </svg>

                            <p className="whitespace-nowrap text-sm">
                              You're not eligible
                            </p>
                          </span>
                        )}
                      </div>
                      {/* Badges end */}
                      <img
                        alt=""
                        src={company.logo}
                        className="h-56 w-full object-contain "
                      />
                      <hr className="opacity-20 mx-3" />

                      <div className="p-4 sm:px-6">
                        <h3 className="text-lg md:text-xl font-medium bg-primary text-center text-white">
                          {company.companyName}
                        </h3>
                      </div>
                      <dl class="flex gap-4 sm:gap-6 justify-between mx-3 my-2">
                        <div class="flex flex-col-reverse">
                          <dt class="text-sm font-medium text-black">
                            {new Date(company.createdAt).toLocaleDateString(
                              'en-IN',
                            )}
                          </dt>
                          <dd class="text-xs text-gray-600">Published</dd>
                        </div>

                        <div class="flex flex-col-reverse">
                          <dt
                            class={`text-sm font-medium text-black text-end ${
                              new Date(company.lastDate)
                                .toISOString()
                                .split('T')[0] <
                              new Date().toISOString().split('T')[0]
                                ? 'text-red-500' // Apply red color if lastDate is in the past
                                : 'text-green-500' // Apply green color if lastDate is today or in the future
                            }`}
                          >
                            {new Date(company.lastDate).toLocaleDateString(
                              'en-IN',
                            )}
                          </dt>
                          <dd class="text-xs text-gray-600 text-end">
                            Due Date
                          </dd>
                        </div>
                      </dl>
                      <dl class="flex gap-4 sm:gap-6 justify-between mx-3 my-2">
                        <div class="flex flex-col-reverse">
                          <dt class="text-sm font-medium text-black">
                            {company.packageLPA}
                            {' LPA'}
                          </dt>
                          <dd class="text-xs text-gray-600">Package</dd>
                        </div>

                        <div class="flex flex-col-reverse">
                          <dt class="text-sm font-medium text-black text-end">
                            {company.position}
                          </dt>
                          <dd class="text-xs text-gray-600 text-end">
                            Position
                          </dd>
                        </div>
                      </dl>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {companies && companies.length == 0 && (
          <div>
            {' '}
            <h2 className="text-3xl font-bold text-center dark:text-gray-900 text-red-500">
              Sorry, No Data Found
            </h2>
          </div>
        )}

        {isLoading && (
          <div role="status" className="flex justify-center">
            <button
              disabled=""
              type="button"
              className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg text-xl hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
          </div>
        )}

        {/* <!-- ====== RecentCompanies Section End ====== --> */}
      </DefaultLayout>
    </>
  );
};

export default RecentCompanies;
