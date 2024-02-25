import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import PieActiveArc from './PieChart';
import BasicArea from './LineChart';
import { Typography } from '@mui/material';
import { PieChart, LineChart } from '@mui/x-charts/PieChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Cards() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/device-info');
            let deviceType = response.data;
          
            setLoading(false);
            setData(deviceType);
            console.log(deviceType);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      const deviceData = data.reduce((acc, currVal) => {
        const deviceType = currVal.device_type;
        acc[deviceType] = (acc[deviceType] || 0) + 1;
        return acc;
      }, {});

      console.log(deviceData);

      const dataForDevice = deviceData.map

  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: '98%', marginX: 'auto', marginY: '20px' }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Clicks History</Typography>
            <Item>
                <BasicArea data={data} />
            </Item>
        </Grid>
        <Grid xs={6}>
            <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Locations</Typography>
            <Item>
            <PieActiveArc/>
            </Item>
        </Grid>
        <Grid xs={6}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Referrers</Typography>
        <Item>
        <PieActiveArc/>
            </Item>
        </Grid>
        <Grid xs={4}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Devices</Typography>
            <Item>
            <PieChart
                series={[
                            {
                            deviceData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
      height={200}
    />
    {/* <PieActiveArc/> */}
            </Item>
        </Grid>
        <Grid xs={4}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Browsers</Typography>
            <Item>
            <PieActiveArc/>
            </Item>
        </Grid>
        <Grid xs={4}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Platforms</Typography>
            <Item>
            <PieActiveArc/>
            </Item>
        </Grid>
      </Grid>
    </Box>
  );
}