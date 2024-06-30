import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
      <h6 className="card-subtitle mb-2 text-muted">{user.username}</h6>
        <h5 className="card-title">{user.firstname} {user.lastname}</h5>
        <p className="card-text"><strong>Email:</strong> {user.email}</p>
        <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
        <p className="card-text"><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
