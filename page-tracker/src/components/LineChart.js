import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


export default function BasicArea({ data }) {

  return (
    <div style={{width: "100%"}} >
        <LineChart
            xAxis={[{ data: [1 , 2 , 3, 4]} ]}
            series={[
                {
                data: [1000, 200, 3000, 4000],
                area: true,
                },
            ]}
            height={300}
            />
    </div>
    
  );
}