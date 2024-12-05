import React from "react";
import { Route, Routes } from "react-router-dom";

const VendorLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Vendor Route</div>} />
    </Routes>
  );
};

export default VendorLayout;
