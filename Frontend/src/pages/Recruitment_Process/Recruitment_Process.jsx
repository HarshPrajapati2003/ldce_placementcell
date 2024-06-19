import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Recruitment_Process = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Recruitment Process" />
      {/* <!-- ======  Recruitment_Process section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center dark:text-gray-900 text-primary">
              Steps Of Recruitment Process
            </h2>
            <div className="grid gap-6 mb-16 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  1
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Students register for the placement session
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  2
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  P&T cell invites companies for internship and Placement
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  3
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Interested companies contact P&T cell and submit JNF (Job
                  Notification Offer)
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  4
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Announcement of available job offer(s) as per JNF by P&T cell
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  5
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Company registration by the interested students
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  6
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Eligibility check by P&T cell as per JNF requirements
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  7
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Notification of eligible student list
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  8
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Selection process by the company
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50 rounded-full border-2">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full border-2 dark:bg-white dark:text-gray-50 text-primary">
                  9
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  Announcement of the selection results
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <!-- ====== Recruitment_Process Section End ====== --> */}
    </DefaultLayout>
  );

};

export default Recruitment_Process;
