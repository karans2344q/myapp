import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FiUser, FiMail, FiHome, FiCalendar, FiEdit, FiSave } from 'react-icons/fi';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    address: '',
    createdAt: ''
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            username: data.username || '',
            email: data.email || user.email || '',
            address: data.address || '',
            createdAt: data.createdAt || ''
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          username: profile.username,
          address: profile.address
        });
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Update failed:', err);
        setSuccessMessage('Update failed. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2><FiUser /> My Profile</h2>
        {!isEditing ? (
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <FiEdit /> Edit Profile
          </button>
        ) : (
          <button 
            className="cancel-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
      </div>

      {successMessage && (
        <div className={`alert ${successMessage.includes('failed') ? 'error' : 'success'}`}>
          {successMessage}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          {isEditing ? (
            <div className="profile-form">
              <div className="form-group">
                <label><FiUser /> Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label><FiMail /> Email</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  readOnly 
                  className="read-only"
                />
              </div>

              <div className="form-group">
                <label><FiHome /> Address</label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows="3"
                ></textarea>
              </div>

              <button 
                className="save-btn"
                onClick={handleUpdate}
              >
                <FiSave /> Save Changes
              </button>
            </div>
          ) : (
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label"><FiUser /> Username</span>
                <span className="detail-value">{profile.username || 'Not set'}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label"><FiMail /> Email</span>
                <span className="detail-value">{profile.email}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label"><FiHome /> Address</span>
                <span className="detail-value">
                  {profile.address || 'No address provided'}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label"><FiCalendar /> Member Since</span>
                <span className="detail-value">
                  {profile.createdAt 
                    ? new Date(profile.createdAt).toLocaleDateString() 
                    : 'Unknown'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;