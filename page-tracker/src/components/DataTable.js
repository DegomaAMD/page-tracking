import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { CircularProgress, Container } from '@mui/material';
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
      filter: true,
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
      filter: true,
      sort: false
    }
  },
  {
    name: "host",
    label: "HOST",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "referrer",
    label: "REFERRER",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "clicked_on",
    label: "CLICKED ON",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "device_type",
    label: "INFO",
    options: {
      filter: true,
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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/api/capture');
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
    <Typography variant="h1" gutterBottom sx={{paddingX: '10px', fontSize: '48px', fontWeight: '700', borderBottom: '1px solid #d4d7dd', paddingBottom: '10px'}}>
        Dashboard
    </Typography>
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
            
            return [  <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px'}}>
                        <Tooltip title={d.user_country === null ? 'unknown' : d.user_country}>
                          {d.user_country === 'Vietnam' ? <img src={Vietnam} alt='vietnam flag icon' style={{width: '20px'}}/> : <img src={Worldwide} alt='world icon' style={{width: '20px'}}/>}
                        </Tooltip> {d.user_ip}
                      </Box>,
                      d.uri,
                      <Link href="#" underline="none">{d.link}</Link>,
                      d.host,
                      d.referrer,
                      dateTimeFormat(d.clicked_on),
                      <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Tooltip title={d.device_type}>
                            {d.device_type === 'desktop' ? <PersonalVideoIcon sx={{ fontSize: 15 }}/> : <StayPrimaryPortraitIcon sx={{ fontSize: 15 }}/>}
                        </Tooltip>
                        <Tooltip title={d.browser_type}>
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