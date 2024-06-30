import React, { useEffect, useState } from 'react';
import { fetchAllOrganizations, fetchOrganization, addOrganization } from '../services/organization';
import OrganizationTable from '../components/OrganizationTable';
import OrgModal from '../components/OrgModel';

const Dashboard = ({ user, authToken }) => {
  const [organizations, setOrganizations] = useState([]);
  const [singleOrganization, setSingleOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [orgAddress, setOrgAddress] = useState('');

  useEffect(() => {
    fetchData();
  }, [user, authToken]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (user.role === 'admin') {
        const response = await fetchAllOrganizations(authToken);
        if(response.status){
            setOrganizations(response.data);
        }else{
            alert(response.message);
        }
        
      } else if (user.role === 'user') {
        const response = await fetchOrganization(user.organization, authToken);
        if(response.status){
            setSingleOrganization(response.data);
        }else{
            alert(response.message);
        }
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrganization = async () => {
    try {
      const response = await addOrganization({ name: orgName, address: orgAddress }, authToken);
      if(response.status){
        alert(response.message);
        fetchData(); // Refresh data after adding
        setModalOpen(false);
      }
      else{
        alert(response.message)
      }
    } catch (error) {
      console.error('Error adding organization:', error);
    }
  };

  const clearForm = () => {
    setOrgName('');
    setOrgAddress('');
  };

  const handleModalOpen = () => {
    clearForm();
    setModalOpen(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Organization</h2>
      {user.role === 'admin' ? (
        <>
          <button className="btn btn-primary" onClick={() => handleModalOpen()}>Add Organization</button>
          <OrganizationTable organizations={organizations} authToken={authToken} reloadDashboard={fetchData} />
        </>
      ) : (
        singleOrganization && (
          <div>
            <h3>{singleOrganization.name}</h3>
            <p>{singleOrganization.address}</p>
          </div>
        )
      )}
      {modalOpen && (
        <OrgModal
          title="Add Organization"
          onClose={() => setModalOpen(false)}
          onSave={handleAddOrganization}
        >
          <form>
            <div className="mb-3">
              <label className="form-label">Organization Name</label>
              <input
                type="text"
                className="form-control"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={orgAddress}
                onChange={(e) => setOrgAddress(e.target.value)}
              />
            </div>
          </form>
        </OrgModal>
      )}
    </div>
  );
};

export default Dashboard;
