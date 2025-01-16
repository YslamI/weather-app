"use client";

// Install the necessary dependencies
// npm install @mui/material @emotion/react @emotion/styled axios

import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function Home() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false); // For Info Dialog

  const fetchWeather = async () => {
    try {
      setError(null); // Clear previous errors
      setWeather(null); // Clear previous weather data

      // Geocode the location (city or ZIP code) to get latitude and longitude
      const geoRes = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(location)}`);
      if (geoRes.data.length === 0) {
        throw new Error('Location not found');
      }

      const { lat, lon } = geoRes.data[0];

      // Fetch weather data from the Weather.gov API using latitude and longitude
      const weatherRes = await axios.get(`https://api.weather.gov/points/${lat},${lon}`);
      const forecastUrl = weatherRes.data.properties.forecast;
      const forecastRes = await axios.get(forecastUrl);
      const forecastData = forecastRes.data.properties.periods;

      setWeather(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Ensure the location is valid.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', position: 'relative' }}>
      {/* Info Button in Top-Right Corner */}
      <IconButton
        onClick={() => setInfoOpen(true)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        color="primary"
      >
        <InfoIcon />
      </IconButton>

      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <TextField
        label="Enter City or ZIP Code"
        variant="outlined"
        fullWidth
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchWeather}
        fullWidth
        style={{ marginBottom: '2rem' }}
      >
        Get Weather
      </Button>

      {error && (
        <Typography color="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Typography>
      )}

      {weather && weather.length > 0 && (
        weather.map((period) => (
          <Card key={period.number} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h6">
                {period.name}
              </Typography>
              <Typography>
                {period.temperature} {period.temperatureUnit}
              </Typography>
              <Typography>
                {period.detailedForecast}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      {/* Info Dialog */}
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
        <DialogTitle>About This App</DialogTitle>
        <DialogContent>
          <Typography>
        <b>This is my project for internship at the PM Accelerator. Here is an information about the company:</b><br/>

          The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.

Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.

Here are the examples of services we offer. Check out our website (link under my profile) to learn more about our services.

🚀 PMA Pro
End-to-end product manager job hunting program that helps you master FAANG-level Product Management skills, conduct unlimited mock interviews, and gain job referrals through our largest alumni network. 25% of our offers came from tier 1 companies and get paid as high as $800K/year. 

🚀 AI PM Bootcamp
Gain hands-on AI Product Management skills by building a real-life AI product with a team of AI Engineers, data scientists, and designers. We will also help you launch your product with real user engagement using our 100,000+ PM community and social media channels. 

🚀 PMA Power Skills
Designed for existing product managers to sharpen their product management skills, leadership skills, and executive presentation skills

🚀 PMA Leader
We help you accelerate your product management career, get promoted to Director and product executive levels, and win in the board room. 

🚀 1:1 Resume Review
We help you rewrite your killer product manager resume to stand out from the crowd, with an interview guarantee.Get started by using our FREE killer PM resume template used by over 14,000 product managers. https://www.drnancyli.com/pmresume

🚀 We also published over 500+ free training and courses. Please go to my YouTube channel https://www.youtube.com/c/drnancyli and Instagram @drnancyli to start learning for free today.

Website
https://www.pmaccelerator.io/
Phone
+19548891063Phone number is +19548891063
Industry
E-Learning Providers
Company size
2-10 employees
86 associated members LinkedIn members who’ve listed Product Manager Accelerator as their current workplace on their profile.
Headquarters
Boston, MA
Founded
2020
Specialties
Product Management, Product Manager, Product Management Training, Product Management Certification, Product Lead, Product Executive, Associate Product Manager, product management coaching, product manager resume, Product Management Interview, VP of Product, Director of Product, Chief Product Officer, and AI Product Management
Locatio
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        component="footer"
        sx={{
          width: '100%',
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          marginTop: '2rem',
          textAlign: 'center',
        }}
      >
        <Typography>
          by Yslam Ismailov
        </Typography>
      </Box>
    </Container>
  );
}
