import React, { useState, useEffect } from "react";
import { Search } from "lucide-react"; // Import the Search icon
import ShowMedicalReports from "../components/ShowMedicalRecords";

function AdminRecords() {
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword
  const [fetchUrl, setFetchUrl] = useState(
    "http://localhost:3000/api/medical-reports/medical-reports"
  ); // State for fetch URL

  // Update fetchUrl when searchKeyword changes
  useEffect(() => {
    if (searchKeyword.trim() === "") {
      // If search keyword is empty, fetch all records
      setFetchUrl("http://localhost:3000/api/medical-reports/medical-reports");
    } else {
      // If search keyword is not empty, fetch records matching the keyword
      setFetchUrl(
        `http://localhost:3000/api/medical-reports/medical-report/search?keyword=${searchKeyword}`
      );
    }
  }, [searchKeyword]);

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4 text-center my-8">
        Medical Reports
      </h2>
      {/* Search Bar */}
      <div className="mb-6 relative w-[50vw] mx-auto mt-8">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search medical reports..."
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Search Icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* ShowMedicalReports Component */}
      <ShowMedicalReports fetchUrl={fetchUrl} />
    </div>
  );
}

export default AdminRecords;
