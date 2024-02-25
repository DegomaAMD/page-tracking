const express = require('express');
const bodyParser = require('body-parser');
const Axios = require('axios');
const mysql = require('mysql');
const cors = require("cors");
const port = 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'page_click_tracking',
});

con.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});


// STORING DATA TO THE DATABASE
app.post('/api/capture', async (req, res) => {
    const clientData = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const visitDateTime = new Date();

    let country = null;

    try {
        const geoResponse = await Axios.get(`https://ipapi.co/${ip}/json/`);
        if (geoResponse && geoResponse.data && geoResponse.data.country_name) {
            country = geoResponse.data.country_name;
        } else {
            console.log('Geolocation data not found or in unexpected format');
        }
    } catch (error) {
        console.error('Geolocation error:', error);
    }
    

    con.query("INSERT INTO user_info (user_country, user_ip, uri, link, host, referrer, clicked_on, device_type, browser_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [country,
        ip,
        clientData.uri,
        clientData.link,
        clientData.host,
        clientData.referrer,
        visitDateTime,
        clientData.deviceType,
        clientData.browserType], (error, results) => {
        if (error) {
            console.error('Error inserting data: ', error);
            res.status(500).send('Error inserting data into database');
            return;
        } else{
            console.log('Data inserted: ', results);
            res.send({status: 'Data captured and saved', id: results.insertId });
        }
        
    } )
});

// FETCH ALL DATA FROM DATABASE
app.get('/api/capture', async (req, res) => {
    try {
        con.query("SELECT * FROM user_info ORDER BY clicked_on DESC LIMIT 100", (error, results) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error inserting data into database');
                return;
            } else{
                console.log('Data inserted: ', results);
                res.json(results);
            }
        });
    } catch (error) {
        console.error('Server error: ', error);
        res.status(500).send('Server error');
    }
});

// FETCHING TOTAL PER DATE
app.get('/clicks-per-day', async (req, res) => {
    try {
        con.query("SELECT DATE(clicked_on) AS  Date, COUNT(*) AS TotalRows FROM user_info GROUP BY DATE(clicked_on) ORDER BY Date", (error, results) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error inserting data into database');
                return;
            } else{
                console.log('Data inserted: ', results);
                res.json(results);
            }
        });
    } catch (error) {
        console.error('Server error: ', error);
        res.status(500).send('Server error');
    }
});
// FETCHING TOTAL USER DEVICES
app.get('/device-info', async (req, res) => {
    try {
        con.query("SELECT device_type FROM user_info", (error, results) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error inserting data into database');
                return;
            } else{
                console.log('Data inserted: ', results);
                res.json(results);
            }
        });
    } catch (error) {
        console.error('Server error: ', error);
        res.status(500).send('Server error');
    }
});
// FETCHING TOTAL USER BROWSERS
app.get('/browser-info', async (req, res) => {
    try {
        con.query("SELECT browser_type FROM user_info", (error, results) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error inserting data into database');
                return;
            } else{
                console.log('Data inserted: ', results);
                res.json(results);
            }
        });
    } catch (error) {
        console.error('Server error: ', error);
        res.status(500).send('Server error');
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});