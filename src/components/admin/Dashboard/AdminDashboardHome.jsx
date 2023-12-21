// import scrap_img from "../../assets/PNG/dashboard//Scrap.png";
import AdminSideNavs from "./AdminSideNavs";
import AdminDashboardHeader from "./AdminDashboardHeader";
import { useState } from "react";
import First from "./Home/First";
import Second from "./Home/Second";
import Third from "./Home/Third";

const AdminDashboardHome = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);

  return (
    <main>
      <AdminSideNavs showNav={vendorNav} hideNav={closeVendorNav} />
      <AdminDashboardHeader
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />

      <div className="lg:ml-[18%]  h-full lg:bg-green-50 max-er:ml-0">
        <section className="flex justify-center items-center h-full w-[100%]">
          <div>
            <div className="w-[100%]">
              <First />
            </div>
            <div className="w-[100%]">
              <Second />
            </div>
            <div className="w-[100%]">
              <Third />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboardHome;
