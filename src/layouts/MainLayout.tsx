import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { fetchLeads } from "../lib/api"; // Import fetchLeads
import { Lead } from "@/types/lead"; // Import Lead type from types

// Helper function to derive title from path (can be improved)
const getTitleFromPath = (pathname: string): string => {
  const pathSegments = pathname.split("/").filter(Boolean);
  if (pathSegments.length === 0) return "Dashboard"; // Default for root of layout?
  const title = pathSegments[pathSegments.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
  // Specific overrides if needed
  if (title === "Gtm Strategy") return "GTM Strategy";
  if (title === "Ai Insights") return "AI Insights";
  return title;
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  const pageTitle = getTitleFromPath(location.pathname);

  // Fetch leads data using React Query
  const {
    data: leads = [], // Default to empty array
    isLoading,
    error,
  } = useQuery<Lead[]>({
    queryKey: ["leads"], // Unique key for this query
    queryFn: fetchLeads, // Function to fetch data
  });

  // Handle loading and error states if needed (e.g., show a spinner or error message)
  // For now, just log errors
  if (error) {
    console.error("Error fetching leads for layout:", error);
  }

  return (
    <div className="flex">
      {/* Pass the fetched leads data to the Sidebar */}
      <Sidebar leads={leads} />
      <div className="flex-1 min-h-screen ml-64">
        {" "}
        {/* Ensure ml-64 matches sidebar width */}
        <Header title={pageTitle} />
        <main className="p-6 page-transition">
          {" "}
          {/* Added padding similar to Dashboard */}
          <Outlet />{" "}
          {/* This is where the routed page component will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
