import React, { useState } from "react";
import VendorCard from "./VendorCard";
import VendorTable from "./VendorTable";
import AdminSideNavs from "../AdminSideNavs";
import AdminDashboardHeader from "../AdminDashboardHeader";

const VendorPage = () => {
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
        <div className="w-[100%] pt-[90px] mb-[30px]">
          <VendorCard />
        </div>
        <VendorTable />
      </div>
    </main>
  );
};

export default VendorPage;
