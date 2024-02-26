import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import BasicArea from './LineChart';
import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { CircularProgress } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Cards() {

    const [deviceData, setDeviceData] = useState([]);
    const [browserData, setBrowserData] = useState([]);
    const [referrerData, setReferrerData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [clickData, setClickData] = useState([]);
    const [uniqueClickData, setUniqueClickData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeviceData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/device-info');
            let deviceType = response.data;
        
            setDeviceData(deviceType);
            setLoading(false);

          } catch (error) {
            console.log(error);
            setLoading(false);

          }
        };
        const fetchBrowserData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/browser-info');
            let browserType = response.data;
          
            setBrowserData(browserType);
            setLoading(false);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        const fetchReferrerData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/referrer-info');
            let referrerType = response.data;
          
            setReferrerData(referrerType);
            setLoading(false);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        const fetchLocationData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/country-info');
            let countryType = response.data;
          
            setCountryData(countryType);
            setLoading(false);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        const fetchClickData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/click-info');
            let clickType = response.data;
          
            setClickData(clickType);
            setLoading(false);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        const fetchUniqueClickData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/click-unique-info');
            let uniqueClickType = response.data;
          
            setUniqueClickData(uniqueClickType);
            setLoading(false);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };

    
        fetchDeviceData();
        fetchBrowserData();
        fetchReferrerData();
        fetchLocationData();
        fetchClickData();
        fetchUniqueClickData();

      }, []);
      

        const deviceResult = deviceData.reduce((acc, currVal) => {
          const dataType = currVal.device_type;
          acc[dataType] = (acc[dataType] || 0) + 1;
          return acc;
        }, {});
        const browserResult = browserData.reduce((acc, currVal) => {
          const dataType = currVal.browser_type;
          acc[dataType] = (acc[dataType] || 0) + 1;
          return acc;
        }, {});
        const referrerResult = referrerData.map((item, index) => {

          if(item.referrer_info){
            const hostName = new URL(item.referrer_info);
            
            return hostName.hostname;
          }
          
          return {
            id: index,
            value: item.total_referrer,
            label:  item.referrer_info === "" ? 'Unknown' : hostName.hostname
          }
          
        });

        const countryResult = countryData.map((item, index) => ({
          id: index,
          value: item.total_country,
          label: item.country === null ? 'Unknown' : item.country

        }));

        const clickResult = clickData.map((d) => d.total_click);
        const uniqueClickResult = uniqueClickData.map((d) => d.total_unique_click);

      const devicePieData = Object.keys(deviceResult).map((key, index) => {
        return {
          id: index,
          value: deviceResult[key],
          label: key 
        }
      });
      const browserPieData = Object.keys(browserResult).map((key, index) => {
        return {
          id: index,
          value: browserResult[key],
          label: key 
        }
      });


  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: '98%', marginX: 'auto', marginY: '20px' }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={5} lg={3}>
            <Item sx={{display: 'flex', alignItems: 'center', gap: '15px', padding: '20px'}}>
              <i class="fa-solid fa-arrow-pointer"></i>
               <div>
               <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '18px', fontWeight: '400'}}>Total Clicks</Typography>
               {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
               <Typography variant="h2" gutterBottom sx={{fontSize: '18px', fontWeight: '400', textAlign:'left'}}>{clickResult}</Typography>
      )}
               
               </div>
            </Item>
        </Grid>
        <Grid xs={12} md={5} lg={3}>
       
        <Item sx={{display: 'flex', alignItems: 'center', gap: '15px', padding: '20px'}}>
              <i class="fa-solid fa-arrow-pointer"></i>
               <div>
               <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '18px', fontWeight: '400'}}>Unique Clicks</Typography>
               {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
               <Typography variant="h2" gutterBottom sx={{fontSize: '18px', fontWeight: '400', textAlign:'left'}}>{uniqueClickResult}</Typography>
      )}
               </div>
            </Item>
        </Grid>
        <Grid xs={12}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Clicks History</Typography>
            <Item>
                <BasicArea />
            </Item>
        </Grid>
        <Grid xs={12} md={6}>
            <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Locations</Typography>
            <Item sx={{paddingY: '20px'}}>
            {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
            <PieChart
                series={[
                            {
                            data: countryResult,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        slotProps={{
                          legend: {
                            itemMarkWidth: 8,
                            itemMarkHeight: 2,
                            markGap: 5,
                            itemGap: 10,
                            labelStyle: {
                              fontSize: 13,
                            },
                          }
                        }}
      height={200}
    />)}
            </Item>
        </Grid>
        <Grid xs={12} md={6}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Referrers</Typography>
        <Item sx={{paddingY: '20px'}}>
        {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
        <PieChart
                series={[
                            {
                              data: referrerResult,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        slotProps={{
                          legend: {
                            itemMarkWidth: 8,
                            itemMarkHeight: 2,
                            markGap: 5,
                            itemGap: 10,
                            labelStyle: {
                              fontSize: 13,
                            },
                          }
                        }}
      height={200}
    />)}
            </Item>
        </Grid>
        <Grid xs={12} md={4}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Devices</Typography>
            <Item sx={{paddingY: '20px'}}>
            {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
            <PieChart
                series={[
                            {
                              data: devicePieData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        slotProps={{
                          legend: {
                            itemMarkWidth: 8,
                            itemMarkHeight: 2,
                            markGap: 5,
                            itemGap: 10,
                            labelStyle: {
                              fontSize: 13,
                            },
                          }
                        }}
      height={200}
    />)}
            </Item>
        </Grid>
        <Grid xs={12} md={4}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Browsers</Typography>
            <Item sx={{paddingY: '20px'}}>
            {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
            <PieChart
                series={[
                            {
                              data: browserPieData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        slotProps={{
                          legend: {
                            itemMarkWidth: 8,
                            itemMarkHeight: 2,
                            markGap: 5,
                            itemGap: 10,
                            labelStyle: {
                              fontSize: 13,
                            },
                          }
                        }}
      height={200}
    />)}
            </Item>
        </Grid>
        <Grid xs={12} md={4}>
        <Typography variant="h2" gutterBottom sx={{paddingY: '10px', fontSize: '24px', fontWeight: '600'}}>Top Platforms</Typography>
            <Item sx={{paddingY: '20px'}}>
            {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
            <PieChart
                series={[
                            {
                              data: devicePieData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            
                            },
                      ]}
                slotProps={{
                  legend: {
                    itemMarkWidth: 8,
                    itemMarkHeight: 2,
                    markGap: 5,
                    itemGap: 10,
                    labelStyle: {
                      fontSize: 13,
                    },
                  }
                }}
                      height={200}  
    />)}
            </Item>
        </Grid>
      </Grid>
    </Box>
  );
}