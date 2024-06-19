import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Overview from './pages/Overview/Overview';
import Team from './pages/Team/Team';
import Recruiters from './pages/Recruiters/Recruiters';
import Contact from './pages/Contact/Contact';
import Recruitment_Process from './pages/Recruitment_Process/Recruitment_Process';
import Rules from './pages/Rules_Regulations/Rules';
import Placement_Statistics from './pages/Placement Statistics/Placement_Statistics';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import EmailVerify from './pages/Authentication/EmailVerify';
import ResetPassword from './pages/Authentication/ResetPassword';
import InfoForm from './pages/Form/InfoForm';
import StudentProfile from './pages/StudentProfile';
import EditProfile from './pages/Form/EditProfile';
import VerifyStudent from './pages/VerifyStudent/VerifyStudent';
import CheckStudent from './pages/CheckStudent';
import PostJob from './pages/Form/PostJob';
import RecentCompanies from './pages/RecentCompanies/RecentCompanies';
import CheckCompany from './pages/CheckCompany';
import Companies from './pages/Companies/Companies';
import CompanyInfo from './pages/Companies/CompanyInfo';
import Protected from './pages/Protected';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          // path="/overview"
          index
          element={
            <>
              <PageTitle title="Overview" />
              <Overview />
            </>
          }
        />
        <Route
          path="/team"
          element={
            <>
              <PageTitle title="Our Team" />
              <Team />
            </>
          }
        />
        <Route
          path="/recruiters"
          element={
            <>
              <PageTitle title="Our Recruiters" />
              <Recruiters />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <PageTitle title="Contact Us" />
              <Contact />
            </>
          }
        />
        <Route
          path="/recent-companies"
          element={
            <Protected>
              <PageTitle title="Apply For A Job" />
              <RecentCompanies />
            </Protected>
          }
        />
        <Route
          path="/all-companies"
          element={
            <Protected>
              <PageTitle title="All Companies" />
              <Companies />
            </Protected>
          }
        />
        <Route
          path="/recruitment-process"
          element={
            <>
              <PageTitle title="Recruitment Process" />
              <Recruitment_Process />
            </>
          }
        />
        <Route
          path="/rules"
          element={
            <>
              <PageTitle title="Recruitment Process" />
              <Rules />
            </>
          }
        />
        <Route
          path="/placement-statistics"
          element={
            <>
              <PageTitle title="Recruitment Process" />
              <Placement_Statistics />
            </>
          }
        />
        <Route
          path="/student-profile"
          element={
            <Protected>
              <PageTitle title="Profile" />
              <StudentProfile />
            </Protected>
          }
        />
        <Route
          path="/edit-student"
          element={
            <Protected>
              <PageTitle title="Profile Edit" />
              <EditProfile />
            </Protected>
          }
        />
        <Route
          path="/verify-student"
          element={
            <Protected>
              <PageTitle title="Verify Student" />
              <VerifyStudent />
            </Protected>
          }
        />
        <Route
          path="/check-student/:isVerified/:id"
          element={
            <Protected>
              <PageTitle title="Check Profile" />
              <CheckStudent />
            </Protected>
          }
        />

        <Route
          path="/check-company/:id"
          element={
            <>
              <Protected>
                <PageTitle title="Compnay Profile" />
                <CheckCompany />
              </Protected>
            </>
          }
        />
        <Route
          path="/company-info/:id"
          element={
            <Protected>
              <PageTitle title="Compnay Profile" />
              <CompanyInfo />
            </Protected>
          }
        />
        <Route
          path="/forms/registration-form"
          element={
            <Protected>
              <PageTitle title="Registration Form" />
              <InfoForm />
            </Protected>
          }
        />
        <Route
          path="/forms/job-post"
          element={
            <Protected>
              <PageTitle title="Job Form" />
              <PostJob />
            </Protected>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | LDCE - Placementcell" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | LDCE - Placementcell" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <>
              <PageTitle title="Forgot Password | LDCE - Placementcell" />
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/verifyemail/:token"
          element={
            <>
              <PageTitle title="Verify Email" />
              <EmailVerify />
            </>
          }
        />
        <Route
          path="/reset/:id/:token"
          element={
            <>
              <PageTitle title="Reset Password" />
              <ResetPassword />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
