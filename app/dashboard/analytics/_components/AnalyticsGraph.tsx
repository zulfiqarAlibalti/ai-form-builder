import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import { eq } from 'drizzle-orm';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsGraph = ({ formRecord }) => {
  const [responseCount, setResponseCount] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (formRecord && formRecord.id) {
      fetchResponseData();
    } else {
      console.error('Form record or form record ID is undefined');
    }
  }, [formRecord]);

  const fetchResponseData = async () => {
    try {
      const result = await db.select().from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id));
      
      console.log('Fetched Data:', result);

      const responsesByDate = result.reduce((acc, response) => {
        const date = new Date(response.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('Responses by Date:', responsesByDate);

      setResponseCount(result.length);
      setChartData({
        labels: Object.keys(responsesByDate),
        datasets: [
          {
            label: 'Number of Responses',
            data: Object.values(responsesByDate),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching response data:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">Responses Analytics</h2>
      <h3 className="text-sm text-gray-500">Total Responses: {responseCount}</h3>
      {chartData ? (
        <div className="mt-4">
          <Line data={chartData} options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Responses',
                },
                beginAtZero: true,
              },
            },
          }} />
        </div>
      ) : (
        <p className="text-gray-500">Loading chart...</p>
      )}
    </div>
  );
};

export default AnalyticsGraph;
