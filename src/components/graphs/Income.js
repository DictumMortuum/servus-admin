import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Request from '../Request';

const negative = [ "FMY", "IKA", "Solidarity" ];
const positive = [ "Salary", "Pension", "EdenredIncome", "Overtime", "Bonus", "Referral" ];
const accounts = [...negative, ...positive];
const colors = ["#bf616a", "#d08770", "#b48ead", "#4c566a", "#81a1c1", "#a3be8c"];

const Chart = props => {
  const { data: { response: { data: raw_data }}, q} = props;

  if(raw_data.length === 0) {
    return raw_data;
  }

  const last_date = new Date(raw_data[raw_data.length-1].Date);
  const difference = q - last_date.getMonth();

  const pre_data = raw_data.reduce((pre, cur) => {
    const { Date: raw_date, Name } = cur;
    const date = new Date(raw_date);
    const quarter = Math.floor((date.getMonth() + q) / q);
    const year = raw_date.substr(0, 4) + "Q" +quarter;

    if (pre[year] === undefined) {
      pre[year] = {
        total: cur.Sum,
      }
    } else {
      pre[year].total += cur.Sum
    }

    if (pre[year][Name] === undefined) {
      pre[year][Name] = cur.Sum;
    } else {
      pre[year][Name] += cur.Sum;
    }

    return pre;
  }, {});

  const data = Object.keys(pre_data).sort().map(d => {
    return {
      name: d,
      ...pre_data[d],
    }
  }).map(d => {
    return {
      ...d,
      month: d.total/14,
    }
  });

  const last_value = data[data.length - 1];
  const new_value = {}

  Object.keys(last_value).map(d => {
    new_value[d] = (q/(q - difference)) * last_value[d];
    return d;
  });

  data[data.length-1] = new_value;

  return (
    <div style={{ width: '95%', height: '95%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {positive.map((d, i) => <Bar dataKey={d} stackId="a" stroke={colors[i%colors.length]} fill={colors[i%colors.length]} />)}
          {negative.map((d, i) => <Bar dataKey={d} stackId="b" stroke={colors[i%colors.length]} fill={colors[i%colors.length]} />)}
          <Line type="monotone" dataKey="total" stroke="#4c566a" fill="#4c566a" strokeWidth={3} />
          <Line type="monotone" dataKey="month" stroke="#4c566a" fill="#4c566a" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

const Dashboard = () => {
  return (
    <Request request={`${process.env.REACT_APP_URL}/gnucash/expenses/${accounts.join(",")}`} title="Income" initialState={{ response: { data: []}} }>
      <Chart q={12} />
    </Request>
  )
}

export default Dashboard;
