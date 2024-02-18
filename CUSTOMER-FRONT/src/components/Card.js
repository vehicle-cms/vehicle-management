// src/components/VehicleList.js
import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';

const VehicleList = (
  {vehicle}
) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  const handleBookNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    const bookingDate = new Date(formData.bookingDate);
    const returnDate = new Date(formData.returnDate);
    const daysDifference = Math.ceil((returnDate - bookingDate) / (1000 * 60 * 60 * 24));
    const fare = daysDifference * selectedVehicle.ratePerDay;
    // Handle the form submission logic here

    fetch('http://localhost:8080/user/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      fare,
      vehicleId: selectedVehicle.id,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Form submitted successfully:', data);
      setShowForm(false); // Close the form after successful submission
      setSelectedVehicle(null); // Reset selected vehicle
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      // Handle error if necessary
    });

    console.log('Form submitted with data:', formData);
    setShowForm(false); // Close the form after submission
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedVehicle(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div key={vehicle.id} style={styles.card}>
            <img
              src={vehicle.imageUrl}
              alt={vehicle.name}
              style={styles.cardImage}
            />
            <div style={styles.cardContent}>
              <p>
                <strong>Model:</strong> {vehicle.model}
              </p>
              <p>
                <strong>Vehicle Number:</strong> {vehicle.vehicleNumber}
              </p>
              <p>
                <strong>Vehicle Type:</strong> {vehicle.vehicleType}
              </p>
              {/* Add more details as needed */}
              <p>
                <strong>Rate per Day:</strong> ${vehicle.ratePerDay}
              </p>
              <p>
                <strong>Fuel Type:</strong> {vehicle.fuelType}
              </p>
              <button
                onClick={() => handleBookNow(vehicle)}
                style={styles.bookNowButton}
              >
                Book Now
              </button>
            </div>
          </div>
      </div>
      {showForm && (
        <BookingForm 
          onClose={closeForm} 
          onBook={handleFormSubmit}
          ratePerDay={selectedVehicle.ratePerDay} // Pass ratePerDay as a prop
          />      
      )}
    </div>
  );
};

// Define styles as an object
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '15px',
    margin: '10px',
    overflow: 'hidden',
    width: '300px',
  },
  cardImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
  },
  cardContent: {
    padding: '15px',
  },
  bookNowButton: {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default VehicleList;
