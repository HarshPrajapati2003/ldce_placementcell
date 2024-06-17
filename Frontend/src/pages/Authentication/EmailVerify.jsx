import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmailVerify = () => {
    const { token } = useParams()
    console.log(token)
    const navigate = useNavigate()
    const [verify, setVerify] = useState("")
    const [Eroror, setEroror] = useState();
    const [show, setShow] = useState(false)
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    useEffect(() => {
      Email();
    }, []);
    const Email = async()=>{
        try{
            const res = await axios.get(`/api/auth/verify/${token}`);
            console.log(res.data.message)
            setVerify("Email Verification Successful, Now you can login")
            setShow(true)
        }catch(err){
            setEroror(`Sorry, Email Verification Unsuccessful because ${err.response.data.message}`)
        } 
    }
    
    const handleLogin = ()=>{
        navigate("/auth/signin")
    }
  return (
    <>
      {Eroror && <h1 className="text-center pt-5 pb-2">{Eroror}</h1>}
      <br />
      <>
        {show && (
          <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6  md:mx-auto">
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
                  Verification Done!
                </h3>
                <p className="text-gray-600 my-2">{verify}</p>
                <p> Have a great day!</p>
                <div className="py-10 text-center">
                  <button
                    onClick={handleLogin}
                    className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                  >
                    GO BACK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default EmailVerify