import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  overflow: 'hidden',
  marginBottom: '2rem',
};

const cardHoverStyle = {
  transform: 'translateY(-6px) scale(1.03)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
};

const imgStyle = {
  width: '100%',
  height: '220px',
  objectFit: 'cover',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  transition: 'filter 0.2s',
};

const bodyStyle = {
  padding: '1.5rem',
};

const titleStyle = {
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#222',
  marginBottom: '0.5rem',
};

const priceStyle = {
  color: '#007bff',
  fontSize: '1.3rem',
  fontWeight: 700,
  margin: 0,
};

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    const { product } = this.props;
    return (
      <Card
        style={this.state.hover ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' style={imgStyle} />
        </Link>
        <Card.Body style={bodyStyle}>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div' style={titleStyle}>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>
          <Card.Text as='h3' style={priceStyle}>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Product; 