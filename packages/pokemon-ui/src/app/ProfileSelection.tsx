// packages/pokemon-ui/src/app/ProfileSelection.tsx
import React, { useEffect, useState } from 'react';
import './ProfileSelection.css';
import { fetchProfiles, createProfile, deleteProfile } from '../services/api';
import { Profile } from "../services/types";

const ProfileSelection = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [newProfileName, setNewProfileName] = useState<string>('');

  useEffect(() => {
    fetchProfiles().then(data => setProfiles(data));
  }, []);

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(Number(event.target.value));
  };

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      createProfile(newProfileName).then(profile => {
        setProfiles([...profiles, profile]);
        setNewProfileName('');
      });
    }
  };

  const handleDeleteProfile = (id: number) => {
    deleteProfile(id).then(() => {
      setProfiles(profiles.filter(profile => profile.id !== id));
      if (selectedProfile === id) {
        setSelectedProfile(null);
      }
    });
  };

  return (
    <div className="profile-selection">
      <h2>Select Profile</h2>
      <select onChange={handleProfileChange} value={selectedProfile ?? ''}>
        <option value="" disabled>Select a profile</option>
        {profiles.map(profile => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>
      <div className="profile-actions">
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="New profile name"
        />
        <button onClick={handleCreateProfile}>Create Profile</button>
        {selectedProfile && (
          <button onClick={() => handleDeleteProfile(selectedProfile)}>Delete Profile</button>
        )}
      </div>
    </div>
  );
};

export default ProfileSelection;