// src/components/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        setUser(userDoc.data());
        setName(userDoc.data().name);
      }
    };
    if (auth.currentUser) {
      fetchUserData();
    }
  }, []);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(firestore, 'users', auth.currentUser.uid), { name });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Profile</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
