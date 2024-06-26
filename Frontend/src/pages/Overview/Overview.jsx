
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import HeroLogo from '../../images/Overview/overview.svg';
import { Link } from 'react-router-dom';

const functions_of_cell = [
  'Collects and maintains the students database for the purpose of T&P activities',
  'Does the training need analysis for all third year students. Basing on the same, plans for imparting the necessary skills such as soft skills, hard skills and technical skills.',
  'Responsible for identifying placement opportunities across reputed organizations.',
  'Arrange for interaction with industry and bridge the gap between Institute and industry.',
  'Arranges for better conduct of industry – specific Training programmes',
  'Assists companies in the recruitment process by conducting interviews, group discussions, written tests etc. in the Campus.',
  'Arranges the special sessions for providing the contemporary trends and development in the technologies and tools to the students Plan, designs, and imparts Soft skills to the students.',
  'Plan, designs and imparts personality development to the students.',
  'Plan, designs and finishing schools to the students.',
  'Coordinates with Training Officer for identifying the training requirements related to Soft and communication skills'
];

const Facilities_of_the_cell = [
  'Serving as a conduit for disseminating information about the college to the external world, including potential employers and industry partners.',
  'Providing a state-of-the-art auditorium equipped with modern audio-visual facilities for hosting large-scale events, seminars, and presentations.',
  'Offering well-equipped conference and personal interview rooms furnished with internet and telephonic connectivity to facilitate seamless communication between students and recruiters.',
  'Furnishing dedicated seminar rooms tailored for smaller group interactions, workshops, and specialized training sessions.',
  'Ensuring uninterrupted wireless internet connectivity throughout the placement cell premises, enabling students and recruiters to stay connected and access resources online.',
  'Providing the infrastructure and resources necessary to conduct online tests and assessments, allowing for streamlined recruitment processes and remote evaluations.',
];

const Role_of_the_coordinator = [
  'Collect comprehensive data from each department to understand student demographics and skill sets.',
  'Analyze placement requirements meticulously and guide apprentice participants in exchanging relevant information effectively, ensuring alignment with industry expectations.',
  'Conduct interviews with students adeptly, providing tailored assistance to graduates throughout the placement process. Continuously review and refine placement procedures to enhance efficiency.',
  'Utilize diverse communication channels, including phone, email, and fax, to actively promote graduates to a wide array of potential employers, fostering beneficial partnerships.',
  'Efficiently manage all aspects of interviews conducted on campus, ensuring seamless logistics and a conducive environment for both students and recruiters.',
  'Clearly articulate the Training & Placement Procedure to students, fostering transparency and understanding while minimizing ambiguity, thus facilitating their active participation and cooperation.',
];

const Role_of_faculty_member = [
  'Create awareness about career planning and career mapping among the students.',
  'Train the students on personality development.',
  'Organize various training programmes to train the students in the areas of quantitative aptitude, logical reasoning, and verbal reasoning through reputed external training organizations and in-house trainers.',
  'Conduct mock interviews to train students to perform well in professional interviews as per corporate expectations.',
  'Formulate and update the yearly calendar of events under the observation of the coordinator.',
  'Report all related activities to the coordinator.',
  'Maintain departmental data and regularly update them to the coordinator.',
];


const Overview = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Overview" />

      {/* <!-- ====== Overview Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-9">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                <img
                  alt=""
                  src={HeroLogo}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>

              <div className="lg:py-24 text-center lg:text-start">
                <h2 className="text-3xl font-bold sm:text-4xl text-primary dark:text-[#FDE4D0] dark:text-shadow-primary">
                  Welcome to Training and Placement Cell of LDCE
                </h2>

                <p className="mt-4 text-black font-bold dark:text-bodydark1">
                  The Training & Placement cell at L. D. College Of Engineering
                  is committed to providing exceptional opportunities for
                  students to kickstart their careers. At L. D. College Of
                  Engineering, we are dedicated to empowering our students with
                  the skills, knowledge, and opportunities they need to succeed
                  in their chosen careers.
                </p>

                <Link
                  to="/recruitment-process"
                  className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen pb-10 dark:bg-boxdark">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-3xl mt-2 tracking-tight text-primary dark:text-white text-center dark:text-shadow-primary">
              Our primary responsibilities
            </h2>
          </div>
          <div className="grid divide-y divide-neutral-200 max-w-2xl mx-auto mt-8">
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-black dark:text-white">
                    {' '}
                    Facilitating Industrial Training
                  </span>
                  <span className="transition group-open:rotate-180 text-black dark:text-white">
                    <svg
                      fill="none"
                      height={24}
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 dark:text-bodydark1 mt-3 group-open:animate-fadeIn">
                  We ensure that our undergraduate (B.Tech.) students undergo
                  mandatory industrial training as a vital part of their
                  curriculum, equipping them with practical skills and industry
                  knowledge.
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-black dark:text-white">
                    Inviting Reputable Companies
                  </span>
                  <span className="transition group-open:rotate-180 text-black dark:text-white">
                    <svg
                      fill="none"
                      height={24}
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 dark:text-bodydark1 mt-3 group-open:animate-fadeIn">
                  We actively invite renowned companies, institutions, and
                  organizations to our campus for both undergraduate and
                  postgraduate placements, ensuring our students have access to
                  diverse career opportunities.
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-black dark:text-white">
                    {' '}
                    Collaborating for Internships and Training Programs
                  </span>
                  <span className="transition group-open:rotate-180 text-black dark:text-white">
                    <svg
                      fill="none"
                      height={24}
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 dark:text-bodydark1 mt-3 group-open:animate-fadeIn">
                  The T&P cell collaborates with leading organizations to
                  establish internship and training programs for our students,
                  enabling them to gain hands-on experience and valuable
                  insights into their chosen fields.
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-black dark:text-white">
                    Campus Recruitment
                  </span>
                  <span className="transition group-open:rotate-180 text-black dark:text-white">
                    <svg
                      fill="none"
                      height={24}
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 dark:text-bodydark1 mt-3 group-open:animate-fadeIn">
                  Our office maintains strong relationships with numerous
                  companies and industries across the country. Annually, nearly
                  200 esteemed organizations visit our campus to conduct
                  interviews and recruit talented individuals. These
                  organizations span various sectors, including:
                </p>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-primary">•</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="text-primary">Core Engineering Industries</p>
                  </div>
                </div>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-primary">•</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="text-primary">IT & IT Enabled Services</p>
                  </div>
                </div>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-primary">•</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="text-primary">Manufacturing</p>
                  </div>
                </div>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-primary">•</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="text-primary">Consultancy Firms</p>
                  </div>
                </div>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-primary">•</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="text-primary">
                      Investment & Finance Companies
                    </p>
                  </div>
                </div>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-primary">•</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="text-primary">Management Organizations</p>
                  </div>
                </div>
                <div className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-primary">•</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="text-primary">
                      Research & Development Laboratories
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-3 text-center mt-2 text-black dark:text-bodydark1 font-medium">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Functions of the cell
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
          </h1>
          <ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400 my-3">
            {functions_of_cell.map((functionItem, index) => (
              <li key={index} className="flex items-center">
                <div className="flex">
                  <div>
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
                      class="lucide lucide-circle-check-big me-3 text-primary dark:text-[#FDE4D0] w-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div className="text-start">{functionItem}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-3xl mx-auto px-3 text-center mt-10 text-black dark:text-bodydark1 font-medium">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Facilities of the cell
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
          </h1>
          <ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400 my-3">
            {Facilities_of_the_cell.map((functionItem, index) => (
              <li key={index} className="flex items-center">
                <div className="flex">
                  <div>
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
                      class="lucide lucide-circle-check-big me-3 text-primary dark:text-[#FDE4D0] w-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div className="text-start">{functionItem}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-3xl mx-auto px-3 text-center mt-10 text-black dark:text-bodydark1 font-medium">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Role of the coordinator
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
          </h1>
          <ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400 my-3">
            {Role_of_the_coordinator.map((functionItem, index) => (
              <li key={index} className="flex items-center">
                <div className="flex">
                  <div>
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
                      class="lucide lucide-circle-check-big me-3 text-primary dark:text-[#FDE4D0] w-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div className="text-start">{functionItem}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-3xl mx-auto px-3 text-center mt-10 text-black dark:text-bodydark1 font-medium pb-5">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Role of faculty member
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
          </h1>
          <ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400 my-3">
            {Role_of_faculty_member.map((functionItem, index) => (
              <li key={index} className="flex items-center">
                <div className="flex">
                  <div>
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
                      class="lucide lucide-circle-check-big me-3 text-primary dark:text-[#FDE4D0] w-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div className="text-start">{functionItem}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <!-- ====== Overview Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Overview;
