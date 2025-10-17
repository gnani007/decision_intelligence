import ReactECharts from 'echarts-for-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { pushRevenuePoint, evaluatePaths } from '../features/flowSlice';

export default function Charts() {
  const revenue = useSelector((s: any) => s.flow.revenue);
  const latest = useSelector((s: any) => s.flow.latestRevenue);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.round(900000 + Math.random() * 600000);
      const month = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Math.floor(Math.random() * 7)];
      dispatch(pushRevenuePoint({ month, value: next }));
      dispatch(evaluatePaths());
    }, 2500);
    return () => clearInterval(id);
  }, [dispatch]);

  // Line chart option
  const lineOption = {
    title: { text: `Revenue (latest: ${latest})`, left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: revenue.map((x: any) => x.month) },
    yAxis: { type: 'value' },
    series: [
      {
        data: revenue.map((x: any) => x.value),
        type: 'line',
        smooth: true,
        lineStyle: { color: '#8884d8' },
      },
    ],
  };

  // Bar chart option
  const above = revenue.filter((x: any) => x.value > 1000000).length;
  const below = revenue.length - above;
  const barOption = {
    title: { text: 'Decision Outcome Summary', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category', data: ['Option A', 'Option B'] },
    yAxis: { type: 'value' },
    series: [
      {
        data: [above, below],
        type: 'bar',
        itemStyle: { color: '#0ea5a4' },
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={lineOption} style={{ height: 250, width: '90%', margin: '0 auto' }} />
      <ReactECharts option={barOption} style={{ height: 250, width: '90%', margin: '0 auto' }} />
    </div>
  );
}
