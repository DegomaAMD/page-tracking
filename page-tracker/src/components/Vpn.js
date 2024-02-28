import React, { useEffect } from 'react';
import Axios from 'axios';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function Vpn() {

    function chuyenHuongTheoThietBiVaHeDieuHanh() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Kiá»ƒm tra thiáº¿t bá»‹ iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.replace("https://apps.apple.com/vn/app/1-1-1-1-faster-internet/id1423538627?l=vi");
        }
        // Kiá»ƒm tra thiáº¿t bá»‹ Android
        else if (/android/i.test(userAgent)) {
            window.location.replace("https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone");
        }
        // Kiá»ƒm tra há»‡ Ä‘iá»u hÃ nh Windows
        else if (/Win/.test(userAgent)) {
            window.location.replace("https://1111-releases.cloudflareclient.com/windows/Cloudflare_WARP_Release-x64.msi");
        }
        // Kiá»ƒm tra há»‡ Ä‘iá»u hÃ nh MacOS
        else if (/Mac/.test(userAgent)) {
            window.location.replace("https://1111-releases.cloudflareclient.com/mac/Cloudflare_WARP.zip");
        }
        // TrÆ°á»ng há»£p khÃ¡c
        else {
            // ThÃªm URL hoáº·c mÃ£ xá»­ lÃ½ cho cÃ¡c trÆ°á»ng há»£p khÃ¡c náº¿u cáº§n
        }
    }


    const getDeviceType = (userAgent) => {
        userAgent = userAgent || navigator.userAgent;
        const isTablet = /tablet|ipad|playbook|silk/i.test(userAgent);
        const isMobile = /mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
        const isAndroid = /android/i.test(userAgent);
        const isIphone = /iphone/i.test(userAgent);

        if(isTablet){
            return 'tablet';
        } else if (isIphone && !window.MSStream){
            return 'iPhone';
        } else if (isAndroid && isMobile){
            return 'android';
        } else if (isMobile){
            return 'mobile';
        } else {
            return 'desktop';
        }
    } 

    const getBrowser = (userAgent) => {
        userAgent = userAgent || navigator.userAgent;

        if (userAgent.match(/edg/i)) {
            return 'Edge';
        } else if (userAgent.match(/chrome|chromium|crios/i)) {
            return 'Chrome';
        } else if (userAgent.match(/firefox|fxios/i)) {
            return 'Firefox';
        } else if (userAgent.match(/safari/i)) {
            return 'Safari';
        } else if (userAgent.match(/opr\//i)) {
            return 'Opera';
        } else if (userAgent.match(/msie|trident/i)) {
            return 'Explorer';
        } else {
            return 'Unknown';
        }
    } 

    useEffect(() => {
        const clientData = {
            uri: window.location.href,
            link: window.location.href,
            referrer: document.referrer,
            deviceType: getDeviceType(navigator.userAgent),
            browserType: getBrowser(navigator.userAgent),
        };

        Axios.post('https://hb88la.000webhostapp.com/storeData.php', clientData)
            .then(response => {
                chuyenHuongTheoThietBiVaHeDieuHanh();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    
    
  return (
    <>
    </>
  )
}

export default Vpn