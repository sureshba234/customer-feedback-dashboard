import React, { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

// Use the environment variable for the API URL or fallback to localhost
const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Charts() {
  const [summary, setSummary] = useState({
    by_sentiment: {},
    by_product: {},
    daily_counts: []
  });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const res = await fetch(`${API}/analytics/summary`);
        const data = await res.json();
        if (res.ok) {
          setSummary(data);
        }
      } catch (err) {
        console.error('Failed to load analytics summary:', err);
      }
    };
    loadSummary();
  }, []);

  const sentiments = Object.keys(summary.by_sentiment || {});
  const sentimentVals = sentiments.map(s => summary.by_sentiment[s] || 0);

  const products = Object.keys(summary.by_product || {});
  const productVals = products.map(p => summary.by_product[p] || 0);

  const dates = summary.daily_counts.map(d => d.date);
  const dateVals = summary.daily_counts.map(d => d.count);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
        <h3>Sentiment Breakdown</h3>
        <Pie data={{ labels: sentiments, datasets: [{ data: sentimentVals }] }} />
      </div>

      <div style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
        <h3>Feedback by Product</h3>
        <Bar
          data={{
            labels: products,
            datasets: [{ label: 'Count', data: productVals }]
          }}
        />
      </div>

      <div style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
        <h3>Daily Trend</h3>
        <Line
          data={{
            labels: dates,
            datasets: [{ label: 'Count', data: dateVals }]
          }}
        />
      </div>
    </div>
  );
}
