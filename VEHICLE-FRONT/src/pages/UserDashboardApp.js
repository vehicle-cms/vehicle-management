// material
import '../App.css';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import Page from '../components/Page';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

import VehicleCard from '../components/Card';


export default function UserDashboardApp() {

  //  const selectedOrder = useSelector(
  //   state => state.CampaignReducer.selectedCampaign
  // );

  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    // Fetch data from the specific API endpoint
    fetch('http://localhost:8080/vehicles/active')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  return (
    <Page title="VMS">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }} style={{ display: 'flex' }}>
          <div style={{ width: '80%' }}>
            <Typography variant="h4">
              Book Now{' '}
            </Typography>
          </div>
        </Box>

        <Grid container spacing={3}>
          {vehicles?.map((vehicle) => (
            <Grid item key={vehicle.id} xs={12} sm={4} md={4}>
              {/* Use the VehicleCard component */}
              <VehicleCard
               vehicle={vehicle}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
