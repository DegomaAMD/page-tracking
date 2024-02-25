import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';


export default function BasicArea() {

  const [totalClickData, setTotalClickData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/clicks-per-day');
        let totalClick = response.data;
      

        setTotalClickData(totalClick);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  const dates = totalClickData.map(item => {

    const date = new Date(item.Date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const visitDateTime = `${day}-${month}`

    return visitDateTime;
  });
  const totals = totalClickData.map(item => item.TotalRows);
console.log(dates, totals);

const xAxisCommon = {
  data: dates,
  scaleType: 'time',
};


  return (
    <div style={{width: "100%"}} >
        <LineChart
            xAxis={[{ ...xAxisCommon, scaleType: 'point' } ]}
            series={[
                {
                data: totals,
                area: true,
                },
            ]}
            height={300}
            />
    </div>
    
  );
}