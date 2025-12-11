"use client";

import React from "react";
import { StatsGrid } from "./components/StatsGrid";
import { ActivityChart } from "./components/ActivityChart";
import { QuickActions } from "./components/QuickActions";
import { RecentNewsTable } from "./components/RecentNewsTable";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityChart />
        <QuickActions />
      </div>
      <RecentNewsTable />
    </div>
  );
}
