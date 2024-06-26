import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';


const Team = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Team" />
      {/* <!-- ====== Team Section Start ====== --> */}
      <div className="bg-white border-stroke dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-center min-h-screen pt-10">
          <div className="flex flex-col">
            <div className="flex flex-col mt-8">
              {/* Meet the Team */}
              <div className="container max-w-7xl px-4">
                {/* Section Header */}
                <div className="flex flex-wrap justify-center text-center mb-24">
                  <div className="w-full lg:w-10/12 px-4">
                    {/* Header */}
                    <h1 className="text-primary text-4xl font-bold mb-8 dark:text-[#FDE4D0]">
                      Meet Our Team
                    </h1>
                    {/* Description */}
                    <p className="text-black text-lg dark:text-white">
                      "Our Placement Coordinator Team consists of dedicated
                      professionals who have successfully orchestrated numerous
                      placement drives, ensuring seamless coordination between
                      students, recruiters, and faculty. Their tireless efforts
                      have resulted in high placement rates and promising career
                      opportunities for our students."
                    </p>
                  </div>
                </div>
                {/* Team Members */}
                <div className="flex flex-wrap">
                  {/* Member #1 */}
                  <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                    <div className="flex flex-col">
                      {/* Avatar */}
                      <a href="#" className="mx-auto">
                        <img
                          className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                          src="https://placements.mnit.ac.in/public/assets/img/mnit/team/director.jpg"
                        />
                      </a>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Prof. N. P. Padhy
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          Director of T&P
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Member #2 */}
                  <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                    <div className="flex flex-col">
                      {/* Avatar */}
                      <a href="#" className="mx-auto">
                        <img
                          className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                          src="https://nitte.edu.in/admin/photo/3/faculty/168/2800.jpg"
                        />
                      </a>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Denice Jagna
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          Training and Placement Officer
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Member #3 */}
                  <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                    <div className="flex flex-col">
                      {/* Avatar */}
                      <a href="#" className="mx-auto">
                        <img
                          className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                          src="https://nitte.edu.in/admin/photo/3/faculty/168/2225.jpg"
                        />
                      </a>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Kenji Milton
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          Industry Relations Manager
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Member #4 */}
                  <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                    <div className="flex flex-col">
                      {/* Avatar */}
                      <a href="#" className="mx-auto">
                        <img
                          className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                          src="https://nitte.edu.in/admin/photo/3/faculty/168/2764.jpg"
                        />
                      </a>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Doesn't matter
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          Placement Coordinator
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 pt-10">
          <h5 class="text-xl font-bold dark:text-white py-10 text-primary text-center sm:text-title-md2 text-title-sm dark:text-shadow-primary">
            Department Placement Committee Conveners
          </h5>
        </div>
        <div className="grid gap-10 mx-auto lg:max-w-screen-lg grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-white dark:bg-boxdark px-1 sm:px-2">
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2 border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS13717ba440484b8c9e1b9747cd8577c0e4f8b11a985.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">
                Dr. Meenakshi Tripathi
              </p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS314ee45b9d283aaf8c6234f981e8d59c9bc1a10c0d1.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Marta Clermont</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS268dc9609febccd983fac3adb33dcd5c0ead3919018.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Anthony Geek</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS277d0831e1aa335fada27a0a0103a08166d21eae319.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Alice Melbourne</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS317fe02962fa3b3865bacef17373ea9be68226018a9.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Martin Garix</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS2885c92bf6dab77eb09ca69f36c3c8ab2c848f3c8bd.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Andrew Larkin</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS2870b44658a315cc03931d4755c6ea1080d26475f3d.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Sophie Denmo</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS2697fdead5eba7c8898c1cd5846821f751e8ed2ff16.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Benedict Caro</p>
              <p className="text-sm text-gray-800 text-center">department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJAS336b95bf746bd70e75804bdc217bf9f16f9ed1082a3.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Benedict Caro</p>
              <p className="text-sm text-gray-800 text-center">department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_MNITJCS231ebb0599e89e9227998f9911ff0f14c37869a5048.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Benedict Caro</p>
              <p className="text-sm text-gray-800 text-center">department</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-2 pt-10">
          <h5 class="text-xl font-bold dark:text-white py-10 text-primary text-center sm:text-title-md2 text-title-sm dark:text-shadow-primary">
            Student Placement Coordinators
          </h5>
        </div>
        <div className="grid gap-10 mx-auto lg:max-w-screen-lg grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-white dark:bg-boxdark px-1 sm:px-2 pb-10">
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2020UCE1970ee818b969483bfdf9b6b697b5652dab04eeb71d8.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Oliver Aguilerra</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2020UEC12661b736d38882669dcf57a42af2eb45aa73112075b.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Marta Clermont</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2020UCH1289f7d3726021a4b0a51bad3c2536163b24a4451af0.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Anthony Geek</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2022PMT5211800b6fd5d37530383f576b345c42d9923a070d35.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Alice Melbourne</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2020UEE1478b187f957866f6dc83c00de2abb503b5d6f3fa302.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Martin Garix</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2022PBM5041e6e630f9d7a3193143ccac1a3a1e058e88cb3d79.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Andrew Larkin</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2020UEE1304fbf94c14894933b71be9d290d2e28f42aaec9fca.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Sophie Denmo</p>
              <p className="text-sm text-gray-800 text-center">Department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2020UCP1782ac5afabb0877ef77a4a85dfd9c6cb8ce44dc7c1b.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Benedict Caro</p>
              <p className="text-sm text-gray-800 text-center">department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2019UAR1736f51e5db8935538efa783281f07243a4f9d90fdb9.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Benedict Caro</p>
              <p className="text-sm text-gray-800 text-center">department</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="object-cover w-20 h-20 mb-2 rounded-full shadow border-2"
              src="https://placements.mnit.ac.in/public/assets/img/mnit/team/photo_2019UAR190171cdfea269cdde44ae05dcb1765b23df623709f7.jpg"
              alt="Person"
            />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center">Benedict Caro</p>
              <p className="text-sm text-gray-800 text-center">department</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ====== Team Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Team;
