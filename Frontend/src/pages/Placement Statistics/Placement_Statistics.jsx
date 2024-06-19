import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import pdf from "../../images/Placement Statistics/pdf.png"
import ChartTwo from '../../components/Charts/ChartTwo';

const Placement_Report = [
  {
    title: 'Placement Report 2016',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2016.pdf',
  },
  {
    title: 'Placement Report 2017',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2017.pdf',
  },
  {
    title: 'Placement Report 2018',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2018.pdf',
  },
  {
    title: 'Placement Report 2019',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2019.pdf',
  },
  {
    title: 'Placement Report 2020',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2020.pdf',
  },
  {
    title: 'Placement Report 2021',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2021.pdf',
  },
  {
    title: 'Placement Report 2022',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2022.pdf',
  },
  {
    title: 'Placement Report 2023',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2023.pdf',
  },
  {
    title: 'Placement Report 2024',
    link: 'https://ldce.ac.in/upload/pdf/placement-cell/PLACEMENT-2024.pdf',
  },
];

const Placement_Statistics = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Placement Statistics" />
      <ChartTwo />
      {/* <!-- ======  Placement Statistics section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
        <div className="overflow-x-auto border-x border-t">
          <table className="table-auto w-full text-sm sm:text-lg">
            <thead className="border-b bg-secondary text-black ">
              <tr className="bg-gray-100">
                <th className="text-left p-4 font-bold border-r text-center">
                  No.
                </th>
                <th className="text-left p-4 font-bold border-r text-center">
                  Placement Record
                </th>
                <th className="text-left p-4 font-bold text-center">
                  PDF Link
                </th>
              </tr>
            </thead>
            <tbody>
              {Placement_Report.map((e, idx) => (
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 border-r font-semibold text-center dark:text-white">
                    {idx + 1}
                  </td>
                  <td className="p-4 border-r font-semibold text-center dark:text-white">
                    {e.title}
                  </td>
                  <td className="p-4 text flex justify-center">
                    <a href={e.link}>
                      <img src={pdf} alt="LINK" width={30} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-4 mx-4 sm:mx-10 ">
          <div className="flex items-center py-2">
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
                  class="lucide lucide-file-input me-4 text-red-500"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M2 15h10" />
                  <path d="m9 18 3-3-3-3" />
                </svg>
              </div>
              <a
                href="https://ldce.ac.in/upload/pdf/placement-cell/LDCE_TPO_BROUCHUR.pdf"
                className="text-md md:text-xl font-semibold text-black dark:text-white hover:text-blue-500 cursor-pointer"
              >
                Placement Cell Brochure
              </a>
            </div>
          </div>
          <div className="flex items-center py-2">
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
                  class="lucide lucide-file-input me-4 text-red-500"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M2 15h10" />
                  <path d="m9 18 3-3-3-3" />
                </svg>
              </div>
              <a
                href="https://ldce.ac.in/upload/pdf/placement-cell/placement_activities.pdf"
                className="text-md md:text-xl font-semibold text-black dark:text-white hover:text-blue-500 cursor-pointer"
              >
                Placement Cell Activities
              </a>
            </div>
          </div>
          <div className="flex items-center py-2">
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
                  class="lucide lucide-file-input me-4 text-red-500"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M2 15h10" />
                  <path d="m9 18 3-3-3-3" />
                </svg>
              </div>
              <a
                href="https://ldce.ac.in/upload/pdf/placement-cell/Facilities_For_Placement.pdf"
                className="text-md md:text-xl font-semibold text-black dark:text-white hover:text-blue-500 cursor-pointer"
              >
                Facilities For Placement Drive-tpo at LDCE
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ====== Placement Statistics Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Placement_Statistics;
