// src/components/MyProfile.js
import React, { useState, useEffect } from 'react';

const MyProfile = () => {
  const userId = 2; // Replace with the actual user ID or get it dynamically
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    // Fetch user data based on the user ID
    fetch(`http://localhost:8080/user/customer/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.mobile,
      address: userData.address.address,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    // Perform API call to update user data with editedData
    // After successful update, update userData and exit edit mode
    // Example API call:
    // fetch(`http://localhost:8080/user/customer/${userId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(editedData),
    // })
    //   .then(response => response.json())
    //   .then(updatedUserData => {
    //     setUserData(updatedUserData);
    //     setIsEditing(false);
    //   })
    //   .catch(error => console.error('Error updating user data:', error));

    // For now, simulate the API call with a timeout
    setTimeout(() => {
      setUserData({ ...userData, ...editedData });
      setIsEditing(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Profile</h1>
      {userData ? (
        <div style={styles.profileCard}>
          <img
            src={userData.imageUrl || 'default-avatar.jpg'}
            alt="User Avatar"
            style={styles.avatar}
          />
          <div style={styles.userInfo}>
            {!isEditing ? (
              <>
                <p>
                  <strong>User ID:</strong> {userData.id}
                </p>
                <p>
                  <strong>Name:</strong> {`${userData.firstName} ${userData.lastName}`}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {userData.mobile}
                </p>
                <p>
                  <strong>Address:</strong> {userData.address.address}, {userData.address.pincode.name}, {userData.address.pincode.state}, {userData.address.pincode.country}
                </p>
              </>
            ) : (
              <form style={styles.editForm}>
                <label>
                  <span>First Name:</span>
                  <input
                    type="text"
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span>Last Name:</span>
                  <input
                    type="text"
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span>Email:</span>
                  <input
                    type="text"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span>Mobile:</span>
                  <input
                    type="text"
                    name="mobile"
                    value={editedData.mobile}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span>Address:</span>
                  <input
                    type="text"
                    name="address"
                    value={editedData.address}
                    onChange={handleInputChange}
                  />
                </label>
                <div style={styles.editButtons}>
                  <button onClick={handleCancelEdit}>Cancel</button>
                  <button onClick={handleSaveEdit}>Save</button>
                </div>
              </form>
            )}
            {!isEditing && (
              <div style={styles.editButtons}>
                <button onClick={handleEditClick}>Edit Profile</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  },
  avatar: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  userInfo: {
    color: '#555',
    width: '100%',
    maxWidth: '400px',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  editButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default MyProfile;
