import React from 'react'
// import { useSelector } from 'react-redux';
// import { selectData, selectError } from './Redux/FormSlice';
import { Link } from 'react-router-dom';
const Success = ({ formData, error ,title}) => {
  // const formData = useSelector(selectData);
  // const error = useSelector(selectError);
  return (
    <>
      {!error && formData && (
        <div className="bg-gray-100 h-screen">
          <div className="bg-white  p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Congratulations, {formData.data.firstName}
              </h3>
              <p className="text-gray-600 my-2">
                Your Registration Completed Successfully!
              </p>
              <h4 className="md:text-2xl text-base text-green-600 font-semibold text-center">
                Your Registration ID : {formData.data._id}
              </h4>
              <p className="mt-3">
                Kindly Contact With Your Department's TPO For Final
                Verification.
              </p>
              <div className="py-10 text-center">
                <Link
                  to="/student-profile"
                  className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1>{error}</h1>
    </>
  );
};

export default Success