import React from 'react';
import { Button, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../styles/steps.scss'

export const Header = ({ username, isDashboard }) => {
  const getDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    let date = {};
    date.day = today.getDate();
    date.month = monthNames[today.getMonth()];
    date.year = today.getFullYear();
    return date;
  }
  const date = getDate();
  return (
    <div className="containter">
      <Media as="h4" className="align-items-center font-weight-bold py-3 mb-4">
        <Media.Body className="ml-3">
          Welcome back, {username}!
          <div className="text-muted text-tiny mt-1"><small className="font-weight-normal">Today is {date.day} {date.month} {date.year}</small></div>
        </Media.Body>
        {isDashboard && <Button variant="primary" as={Link} to="/add-account" >Add Account</Button>}
      </Media>

      <hr className="container-m-nx mt-0 mb-4" />
    </div>
  )
};