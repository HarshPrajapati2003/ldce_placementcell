import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Recruiters = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Our Recruiters" />
      {/* <!-- ====== Recruiters Section Start ====== --> */}

      <div className="flex items-start justify-center min-h-screen pt-5">
        <img
          src="https://placements.mnit.ac.in/public/assets/img/Our_Recruiters.jpg"
          alt="Our Recruiters"
        />
      </div>
     
      {/* <!-- ====== Recruiters Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Recruiters;
