import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Request from '../Request';

const Chart = props => {
  const { data: { response: { data: raw_data }}} = props;
  let total = 0;

  const data = raw_data.slice(30).map(d => {
    total += d.Sum;

    return ({
      name: d.Date.substr(0, 7),
      stand: d.Sum,
      total: total,
    })
  });

  return (
    <div style={{ width: '95%', height: '95%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="total" stroke="#5e81ac" fill="#5e81ac" />
          <Area type="monotone" dataKey="stand" stroke="#bf616a" fill="#bf616a" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const Dashboard = props => {
  const { disable_title } = props;

  return (
    <Request
      request={`${process.env.REACT_APP_URL}/gnucash/expenses/games`}
      title={disable_title ? "" : "Games expenses"}
      initialState={{ response: { data: []}}}
    >
      <Chart />
    </Request>
  )
}

export default Dashboard;
