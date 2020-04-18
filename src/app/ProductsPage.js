import React from 'react';
import ProductsList from './ProductsList';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct } from './actions/productActions';
import PropTypes from 'prop-types'; 

class ProductsPage extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
        <h1>Products List</h1>

        <ProductsList products={this.props.products} deleteProduct={this.props.deleteProduct} />
      </div>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(ProductsPage);
