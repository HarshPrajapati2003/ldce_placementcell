import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../Authentication/Redux/AuthSlice';

const VerifyStudent = () => {
  const [search,setSearch]=useState("")
  const [enrollment, setEnrollment] = useState();
  const [render,isRender]=useState(false)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      if (user?.data?.role !== 'TPO') {
        navigate('/');
      }
    }
  }, []);
    const fetchStudents = async () => {
         try {
           const res = await axios.get('/student/fetch-pending');
             if (res) {
                 setStudents(res.data.students)
                 console.log(res.data.students);
             }
         } catch (error) {
             toast.error(`Sorry, ${error.response.data.message}`);
             console.log(error.response.data.message)
         }
    }
  useEffect(() => {
    setLoading(true);
    fetchStudents()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // Handle error if needed
        console.error('Error fetching data:', error);
      });
  }, [render, refresh]);

  const handleStatusChange = async (selectedStatus, id) => {
 
  // Update the state with the selected status
  setStudents((prevStudents) => {
    return prevStudents.map((student) => {
      if (student._id === id) {
        return { ...student, isVerified: selectedStatus.toLowerCase() };
      } else {
        return student;
      }
    });
  });
     console.log(students);

  try {
    const res = await axios.patch('/student/check-profile', {
      id,
      isVerified: selectedStatus.toLowerCase(),
    });
    if (res) {
      // Update the state with the response data
      setStudents(res.data.students);
      toast.success(res.data.message);
      isRender(!render)
    }
  } catch (error) {
    console.log(error);
    toast.error(`Sorry, ${error.response.data.message}`);
  }
};

  const handleSearch = async (e) => {
    setLoading(true);
    setSearch(e.target.value)
    if (e.target.value == "") {
      setRefresh(true)
    }
    setEnrollment("")
    console.log(search)
    try {
      const res = await axios.post('/student/fetch-pending-regex', {
        findStr: search,
      });
      if (res) {
        setStudents(res.data.pendingStudents);
        console.log(res.data.pendingStudents);
      }
    } catch (error) {
      toast.error(`Sorry, ${error.response.data.message}`);
      console.log(error.response.data.message);
    }
    setLoading(false);
  }

  const handleEnrollmentSearch = (e) => {
    setSearch("")
    setEnrollment(e.target.value)
  }

  const handleEnrollment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/student/fetch-pending-enrollment', {
        enrollmentNumber: enrollment,
      });
      if (res) {
        setStudents(res.data.pendingStudents);
        console.log(res.data.pendingStudents);
      }
    } catch (error) {
      toast.error(`Sorry, ${error.response.data.message}`);
      console.log(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verify Student" />
      <Toaster position="top-center" reverseOrder={false} />
      {/* <!-- ====== Verify Student Start ====== --> */}
      {students && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="max-w-md mx-auto my-2 sm:my-5 px-1 w-full">
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
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                  placeholder="Search name, email, pan number etc..."
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="max-w-md mx-auto my-2 sm:my-5 px-1 w-full">
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
                  type="number"
                  id="default-search"
                  value={enrollment}
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                  placeholder="Search Enrollment No."
                  onChange={(e) => handleEnrollmentSearch(e)}
                />
                <button
                  onClick={handleEnrollment}
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-primary text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Registration ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:border-strokedark dark:bg-boxdark">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full border-2 border-inherit"
                      src={student.photo}
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="font-normal text-gray-500">
                        Enrollment No. : {student.enrollmentNumber}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4"> {student._id}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-sm mx-auto">
                      <select
                        id="small"
                        className="block w-30 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          handleStatusChange(e.target.value, student._id)
                        }
                      >
                        <option value="Pending" selected disabled>
                          Pending
                        </option>
                        <option value="Verified">Verified</option>
                        <option value="Reject">Reject</option>
                      </select>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <Link
                      className="hover:text-blue-500"
                      to={`/check-student/${student.isVerified}/${student._id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-eye"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      )}

      {/* <!-- ====== Verify Student End ====== --> */}
    </DefaultLayout>
  );
};

export default VerifyStudent;
