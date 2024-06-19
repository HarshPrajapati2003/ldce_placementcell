import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const rulesAndRegulations = [
  "The Training and Placement Office adheres to a 'one student, one job policy'. Once a candidate is selected by any company, his/her name will be removed from the placement database as an unplaced candidate. Under no circumstance will he/she be allowed to participate with any other companies. Exceptional cases include the companies which are offering a substantially higher salary (2 times) than the earlier offered package.",
  'If there is a delay in the announcement of placement results of the company, candidates will have the opportunity to appear for another company placement drive. In such instances, the first announced result will be deemed final except if the package is more than 2 times higher, then choice will be given to candidates. If results from two companies are declared on the same day, the decision made jointly by the candidate and the Placement Officer will be considered final.',
  'If any data provided by candidates is found to be inaccurate or faulty, he/she will be disqualified from further placement processes. Therefore, it is the responsibility of each candidate to update their data and promptly report any relevant changes immediately to the TPO cell with proof, whenever GTU results are announced.',
  'All candidates must adhere to a formal dress code on the day of placement drive and in TPO premises. For male candidates, this includes wearing a blazer/white shirt-black pants, and for female candidates, either a kurta or a blazer suit in black and white, is mandatory.',
  "A consent form will be sent to all eligible candidates prior to the placement drive process. Only those who are interested in participating in the specific company's placement drive should submit the consent form, providing the required details before the given time deadline. Once the consent form is submitted, it is compulsory for the candidate to attend the all-placement drive process. Failure to do so will result in the student being barred from the placement cell database and next subsequent placement drives.",
  'Candidates are prohibited from directly interacting with the HR team regarding eligibility, branch considerations, or any other queries personally. Such actions will be considered a breach of placement cell rules and regulations.',
  'Candidates are advised not to argue with TPO cell regarding the criteria or eligibility for shortlisting, as these are predetermined by the companies. Additionally, if companies modify the criteria at any time as per their requirements to conduct placement drives, Institute TPO cell will follow the placement process, as per the latest updates given by the company.',
  "It is the responsibility of the candidate to acquaint themselves with the company’s profile, job role, location, rules, regulations, and bond details. Following selection, failure to accept the offer and join the company for any reason will result in the candidate's disqualification from the placement cell.",
  'Candidates intending to pursue further studies or travel abroad should refrain from registering with the placement cell. Though, if such students have appeared for placement drives and refuse to accept offers and/or join the company then the institute/ concern department will not issue any letter of recommendations or any other documents at least for one year after graduation.',
  'After onboarding and joining the company, candidates have to follow all the rules and regulations of the respective company. Depending on the performance analysis of selected candidates after joining the company, if the company takes any decisions in future as per their rules and regulations, then the institute will not interfere in their decisions and candidates have to accept the decision made by his/her company.',
  'Maintaining decorum within the TPO premises is mandatory. Professional etiquette must be adhered to throughout the placement processes.',
  'In the event of any discrepancy or issue, the decisions made by the TPO and Principal will be final.',
  'Candidate registration with the placement cell is not mandatory. Individuals wishing to avail themselves for the campus recruitment facilities must register, with a registration fee of Rs. 350/-. This nominal fee is used to support the maintenance of the placement cell, hospitality for companies, and other placement activities expenses.',
  'Above rules and regulations are formed for the benefits of all the students of all the disciplines of the Institute.',
];


const Rules = () => {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Rules and Regulations" />
        {/* <!-- ======  Recruitment_Process section Start ====== --> */}
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <div className="grid gap-6 row-gap-10">
              <div className="lg:py-6 lg:px-3">
                {rulesAndRegulations.map((Rule, index) => (
                  <>
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div>
                          <div className="flex items-center justify-center w-10 h-10 border-2 rounded-full font-extrabold text-red-500">
                            {index + 1}
                          </div>
                        </div>
                        <div className="w-px h-full bg-gray-300" />
                      </div>
                      <div className="pt-1 pb-8">
                        <p className="mb-2 text-md md:text-lg font-bold text-black dark:text-white">
                          {Rule}
                        </p>
                      </div>
                    </div>
                    <hr className='-mt-5 mb-4'/>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ====== Recruitment_Process Section End ====== --> */}
      </DefaultLayout>
    );
};

export default Rules;
