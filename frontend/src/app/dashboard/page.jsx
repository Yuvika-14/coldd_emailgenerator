import React from "react";
import UrlInputBar from "./comp/Url";

const Dashboard = () => {
  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 py-8 px-4">
      <UrlInputBar />
    </main>
  );
};

export default Dashboard;
