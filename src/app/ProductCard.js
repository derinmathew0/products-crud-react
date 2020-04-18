import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

export default function ProductCard({ product, deleteProduct }) {
  return (
    <div className="ui card">
      <div className="image">
        <img src={product.cover} alt={product.title} />
      </div>
      <div className="content">
        <div className="header">{product.title}</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/product/${product._id}`} className="ui basic button green">Edit</Link>
          <div className="ui basic button red" onClick={() => deleteProduct(product._id)}>Delete</div>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired
}