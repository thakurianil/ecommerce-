import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import '../styles/Header.css'; // Add custom styles

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2" collapseOnSelect>
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-4 text-warning">Home</Navbar.Brand>
          </LinkContainer>

          {/* Search Box */}
          <div className="d-flex flex-grow-1 mx-3">
            <SearchBox />
          </div>

          {/* Navigation Links */}
          <Nav className="d-flex align-items-center">
            {/* User Account */}
            {userInfo ? (
              <NavDropdown title={<span><i className="fas fa-user"></i> {userInfo.name}</span>} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="text-white">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Orders Link (only visible if logged in) */}
            {userInfo && (
              <LinkContainer to="/orders">
                <Nav.Link className="text-white">Returns & Orders</Nav.Link>
              </LinkContainer>
            )}

            {/* Cart */}
            <LinkContainer to="/cart">
              <Nav.Link className="text-white">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>

            {/* Admin Menu (only for admin users) */}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu" className="text-white">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
