// app/dashboard/analytics/page.tsx
"use client";

import React from 'react';
import AnalyticsGraph from './_components/AnalyticsGraph';

const AnalyticsPage = ({ formRecord }) => {
  return (
    <div className="flex">
      <div className="w-1/4">
        {/* Sidebar content */}
      </div>
      <div className="w-3/4 p-4">
        <AnalyticsGraph formRecord={formRecord} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
