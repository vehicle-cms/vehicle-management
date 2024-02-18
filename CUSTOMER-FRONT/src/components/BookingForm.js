// src/components/BookingForm.js
import React, { useState } from 'react';

const BookingForm = ({ onClose, onBook, ratePerDay }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    returnDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateFare = () => {
    // Calculate the difference between booking date and return date
    const bookingDate = new Date(formData.bookingDate);
    const returnDate = new Date(formData.returnDate);
    const differenceInDays = Math.ceil((returnDate - bookingDate) / (1000 * 60 * 60 * 24));

    // Calculate the fare based on the difference and the price per day
    const fare = differenceInDays * ratePerDay;

    // Return the calculated fare
    return isNaN(fare) ? 0 : fare;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the fare before submitting
    const fare = calculateFare();

    // Add fare to the form data
    const formDataWithFare = {
      ...formData,
      fare,
    };

    // Handle the form submission logic here
    onBook(formDataWithFare);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>Booking Form</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Booking Date:
            <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleInputChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Return Date:
            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} style={styles.input} />
          </label>
          {/* Add more form fields as needed */}
          <p style={styles.fare}>
            <strong>Fare:</strong> ${calculateFare()}
          </p>
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '100%',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    margin: '10px 0',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  fare: {
    margin: '10px 0',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    width: '100%',
    padding: '10px',
    background: '#ccc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default BookingForm;
