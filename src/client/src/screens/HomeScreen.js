import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Carousel, Image } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Meta />
      <div className="hero-section">
        <Carousel pause='hover' className='bg-dark'>
          
          <Carousel.Item>
            <Image
              src='/images/banner2.jpg'
              alt='Second slide'
              fluid
              className='carousel-image'
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="featured-section">
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row className="products-grid">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <div className="product-card">
                  <Link to={`/product/${product._id}`}>
                    <div className="product-image-container">
                      <Image src={product.image} alt={product.name} fluid className="product-image" />
                      <div className="product-overlay">
                        <span className="view-details">View Details</span>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < product.rating ? 'text-warning' : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="product-price">${product.price}</p>
                    </div>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <div className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <Row className="categories-grid">
          <Col md={4}>
            <Link to="/category/electronics" className="category-card">
              <div className="category-content">
                <i className="fas fa-laptop category-icon"></i>
                <h3>Electronics</h3>
              </div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/category/clothing" className="category-card">
              <div className="category-content">
                <i className="fas fa-tshirt category-icon"></i>
                <h3>Clothing</h3>
              </div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/category/home" className="category-card">
              <div className="category-content">
                <i className="fas fa-home category-icon"></i>
                <h3>Home & Living</h3>
              </div>
            </Link>
          </Col>
        </Row>
      </div>

    </>
  );
};

export default HomeScreen; 