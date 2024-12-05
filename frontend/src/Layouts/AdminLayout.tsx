import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Admin Layout</div>} />
    </Routes>
  );
};

export default AdminLayout;
