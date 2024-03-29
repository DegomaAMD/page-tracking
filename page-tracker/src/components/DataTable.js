import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { Button, CircularProgress } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider
} from "@mui/material/styles";
import Axios from 'axios';
import { Link } from '@mui/material';
import Cards from './Cards';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import StayPrimaryPortraitIcon from '@mui/icons-material/StayPrimaryPortrait';
import PhonelinkOffIcon from '@mui/icons-material/PhonelinkOff';
import Tooltip from '@mui/material/Tooltip';
import Vietnam from '../assets/img/vietnam.png';
import Worldwide from '../assets/img/worldwide.png';
import Chrome from '../assets/img/chrome.png';
import Edge from '../assets/img/microsoft.png';
import Explorer from '../assets/img/internet-explorer.png';
import Firefox from '../assets/img/firefox.png';
import Safari from '../assets/img/safari.png';
import WebBrowser from '../assets/img/web-browser.png';
import Apple from '../assets/img/apple-logo.png';

const columns = [
  {
    name: "user_ip",
    label: "IP",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "uri",
    label: "URI",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "link",
    label: "LINK",
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: "host",
    label: "HOST",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "referrer",
    label: "REFERRER",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "clicked_on",
    label: "CLICKED ON",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "device_type",
    label: "INFO",
    options: {
      filter: false,
      sort: false
    }
  },
];


const options = {
  responsive: "standard",
  selectableRows: false, 
};

export default function DataTable() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const pageReload = () => {
      window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Axios.get('https://hb88la.000webhostapp.com/fetchAllData.php');
            let data = response.data;
          
            setLoading(false);
            setData(data);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

  return (
    <>
    <Box sx={{paddingX: '10px', borderBottom: '1px solid #d4d7dd', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: {xs: 'column', md:'row'}}}>
      <Typography variant="h1" gutterBottom sx={{fontSize: '48px', fontWeight: '700'}}>
          Dashboard
      </Typography>
      <Button onClick={pageReload} variant="contained" color='success' sx={{color: '#fff', paddingX: '20px', fontSize: '14px', textTransform: 'capitalize', borderRadius: '10px'}}>Refresh</Button>
    </Box>
    
    <Cards />
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <Box sx={{width: '100%', maxWidth: '98%', marginX: 'auto', marginY: '20px'}}>
          <MUIDataTable
            loading={loading}
          title={"Clicks Details"}
          data={data.map((d) => {
            const browserTypeIcon = (browser, device) => {
                if(browser === 'Chrome'){
                  return <img src={Chrome} alt='Google Chrome icon' style={{width: '15px'}}/>
                } else if(browser === 'Edge'){
                  return <img src={Edge} alt='Microsoft Edge icon' style={{width: '15px'}}/>
                } else if(browser === 'Explorer'){
                  return <img src={Explorer} alt='Internet Explorer icon' style={{width: '15px'}}/>
                } else if(browser === 'Firefox'){
                  return <img src={Firefox} alt='Firefox icon' style={{width: '15px'}}/>
                }else if(browser === 'Safari' && device === 'iPhone'){
                  return <img src={Apple} alt='Safari icon' style={{width: '15px'}}/>
                }else if(browser === 'Safari' && device === 'desktop'){
                  return <img src={Safari} alt='Safari icon' style={{width: '15px'}}/>
                } else if (browser === 'Safari'){
                  return <img src={Safari} alt='Apple icon' style={{width: '15px'}}/>
                } else{
                  return <img src={WebBrowser} alt='Web Browser icon' style={{width: '15px'}}/>
                }   
            }

            const dateTimeFormat = (dateTime) => {
              const date = new Date(dateTime);
              const day = date.getDate().toString().padStart(2, '0');
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const year = date.getFullYear();
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const visitDateTime = `${day}/${month}/${year} ${hours}:${minutes}`

              return visitDateTime;
            }

            const paths = (pathName) => {
              const url = new URL(pathName);

              return url.pathname;
            }

            
            return [  <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px'}}>
                        <Tooltip title={d.user_country === null ? 'unknown' : d.user_country}>
                          {d.user_country === 'Unknown' && d.user_country === 'Local' ? <img src={Worldwide} alt='world icon' style={{width: '20px'}}/> : <img src={`https://flagsapi.com/${d.user_country}/flat/64.png`} style={{width: '20px'}}/>}
                        </Tooltip> {d.user_ip}
                      </Box>,
                      d.uri !== null && d.uri !== "" ? paths(d.uri) : '',
                      <Link href={d.link} underline="none">{d.link === null && d.link === "" ? '' : d.link}</Link>,
                      d.host === null && d.host === "" ? '' : d.host,
                      d.referrer === null &&  d.referrer === "" ? '' : d.referrer,
                      dateTimeFormat(d.clicked_on),
                      <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Tooltip title={d.device_type === null || d.device_type === "" ? "Unknown" : d.device_type}>
                            {d.device_type === null || d.device_type === "" ? <PhonelinkOffIcon sx={{ fontSize: 15 }} /> : d.device_type === 'desktop' ? <PersonalVideoIcon sx={{ fontSize: 15 }}/> : <StayPrimaryPortraitIcon sx={{ fontSize: 15 }}/> }
                        </Tooltip>
                        <Tooltip title={d.browser_type === null || d.browser_type === "" ? 'Unknown' : d.browser_type}>
                        {browserTypeIcon(d.browser_type, d.device_type)}
                        </Tooltip>
                      </Box>
                  ]
          })}
          columns={columns}
          options={options}
        />
        </Box>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
    </>
    
  );
}