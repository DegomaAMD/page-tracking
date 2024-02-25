import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from './Table';

function Vpn() {
    function chuyenHuongTheoThietBiVaHeDieuHanh() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Kiểm tra thiết bị iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.replace("https://apps.apple.com/vn/app/1-1-1-1-faster-internet/id1423538627?l=vi");
        }
        // Kiểm tra thiết bị Android
        else if (/android/i.test(userAgent)) {
            window.location.replace("https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone");
        }
        // Kiểm tra hệ điều hành Windows
        else if (/Win/.test(userAgent)) {
            window.location.replace("https://1111-releases.cloudflareclient.com/windows/Cloudflare_WARP_Release-x64.msi");
        }
        // Kiểm tra hệ điều hành MacOS
        else if (/Mac/.test(userAgent)) {
            window.location.replace("https://1111-releases.cloudflareclient.com/mac/Cloudflare_WARP.zip");
        }
        // Trường hợp khác
        else {
            // Thêm URL hoặc mã xử lý cho các trường hợp khác nếu cần
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
            host: window.location.host,
            referrer: document.referrer,
            deviceType: getDeviceType(navigator.userAgent),
            browserType: getBrowser(navigator.userAgent),
        };

        Axios.post('https://page-tracking.vercel.app/api/capture', clientData)
            .then(response => {
                console.log('Data: ', response.data);
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