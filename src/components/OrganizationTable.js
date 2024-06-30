import React, { useState, useEffect } from 'react';
import { fetchOrganizationUsers, registerUsers, deleteUsers, updateUsers } from '../services/user';
import { updateOrganizations } from '../services/organization';
import Modal from './OrgModel'; // Assuming you have a Modal component
import UserModal from './UserModal'; // Assuming you have a UserModal component

const OrganizationTable = ({ organizations, authToken, reloadDashboard }) => {
  const [expandedOrgId, setExpandedOrgId] = useState(null);
  const [organizationUsers, setOrganizationUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [editOrgId, setEditOrgId] = useState(null);
  const [editOrgName, setEditOrgName] = useState('');
  const [editOrgAddress, setEditOrgAddress] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const toggleExpand = async (orgId) => {
    if (expandedOrgId === orgId) {
      setExpandedOrgId(null);
    } else {
      setExpandedOrgId(orgId);
      if (!organizationUsers[orgId]) {
        setLoading(true);
        try {
          const response = await fetchOrganizationUsers(orgId, authToken);
          if(response.status){
            setOrganizationUsers((prevUsers) => ({
                ...prevUsers,
                [orgId]: response.data
              }));
        }
        else{
            alert(response.message);
        }
        } catch (error) {
          console.error('Error fetching organization users:', error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleEditOrganization = (orgId, orgName, orgAddress) => {
    setEditOrgId(orgId);
    setEditOrgName(orgName);
    setEditOrgAddress(orgAddress);
  };

  const handleSaveOrganization = async (orgId) => {
    const payLoad = {
      name: editOrgName,
      address: editOrgAddress
    };
    const response = await updateOrganizations(orgId, payLoad, authToken);
    if(response.status){
        setEditOrgId(null);
        setEditOrgName('');
        setEditOrgAddress('');
        reloadDashboard();
    }
    else{
        alert(response.message);
    }
  };

  const handleCancelEdit = () => {
    setEditOrgId(null);
    setEditOrgName('');
    setEditOrgAddress('');
  };

  const handleAddUser = (orgId) => {
    setEditUserId(null);
    setEditUserData({ orgId });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditUserId(user._id);
    setEditUserData(user);
    setShowUserModal(true);
  };

  const handleSaveUser = async(userData) => {
    const response = await registerUsers(userData, authToken);
    if(response.status){
        alert(response.message);
        setShowUserModal(false);
         reloadDashboard();
    }
    else{
        alert(response.message);
    }
    
  };

  const handleDeleteUser = async(userId) =>{
    const response = await deleteUsers(userId, authToken);
    if(response.status){
        alert(response.message);
        reloadDashboard();
    }
    else{
        alert(response.message);
    }
  }

  const handleUpdateUser = async(payLoad) =>{
    const response = await updateUsers(editUserId, payLoad, authToken);
    if(response.status){
        alert(response.message);
        reloadDashboard();
    }
    else{
        alert(response.message);
    }
  }

  
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map((org, index) => (
          <React.Fragment key={org._id}>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{org.name}</td>
              <td>{org.address}</td>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => toggleExpand(org._id)}
                >
                  {expandedOrgId === org._id ? '▼' : '►'}
                </button>
                <button
                  className="btn btn-sm btn-primary mx-1"
                  onClick={() => handleEditOrganization(org._id, org.name, org.address)}
                >
                  Edit Org
                </button>
                <button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => handleAddUser(org._id)}
                >
                  Add User
                </button>
              </td>
            </tr>
            {expandedOrgId === org._id && organizationUsers[org._id] && (
              <>
                <tr>
                  <td colSpan="4">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organizationUsers[org._id].map((user, userIndex) => (
                          <tr key={user._id}>
                            <td>{userIndex + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary mx-1"
                                onClick={() => handleEditUser(user)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger mx-1"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </>
            )}
          </React.Fragment>
        ))}
      </tbody>
      {editOrgId !== null && (
        <Modal
          title="Edit Organization"
          onClose={handleCancelEdit}
          onSave={() => handleSaveOrganization(editOrgId)}
        >
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={editOrgName}
              onChange={(e) => setEditOrgName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={editOrgAddress}
              onChange={(e) => setEditOrgAddress(e.target.value)}
            />
          </div>
        </Modal>
      )}
      {showUserModal && (
        <UserModal
          title={editUserId ? 'Edit User' : 'Add User'}
          onClose={() => setShowUserModal(false)}
          onSave={handleSaveUser}
          onUpdate = {handleUpdateUser}
          initialUserData={editUserData}
          orgId={editUserData.orgId}
        />
      )}
    </table>
  );
};

export default OrganizationTable;
