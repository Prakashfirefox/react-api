import React, { useState, useEffect } from 'react';

const UserModal = ({ title, onClose, onSave, onUpdate, initialUserData, orgId }) => {
  const [username, setUsername] = useState(initialUserData?.username || '');
  const [email, setEmail] = useState(initialUserData?.email || '');
  const [firstname, setFirstName] = useState(initialUserData?.firstname || '');
  const [lastname, setLastName] = useState(initialUserData?.lastname || '');
  const [phone, setPhone] = useState(initialUserData?.phone || '');
  const [role, setRole] = useState(initialUserData?.role || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initialUserData) {
      setUsername(initialUserData.username);
      setEmail(initialUserData.email);
      setFirstName(initialUserData.firstname);
      setLastName(initialUserData.lastname);
      setPhone(initialUserData.phone);
      setRole(initialUserData.role);
    }
  }, [initialUserData]);

  const handleSave = () => {
    const userData = { organization: orgId, username, email, firstname, lastname, phone, role, password };
    onSave(userData);
  };

  const handleUpdate = () => {
    const userData = { organization: orgId, username, email, firstname, lastname, phone, role };
    onUpdate(userData);
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {!initialUserData.username && (
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            {!initialUserData.username ? (
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Add
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
