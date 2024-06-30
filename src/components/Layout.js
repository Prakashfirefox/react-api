import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children, isAuthenticated, authToken, user }) => {
  return (
    <div>
      <Header isAuthenticated={isAuthenticated} authToken={authToken} user={user}/>
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
