import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

export default function ProductsList({ products, deleteProduct }) {

  const [allProducts, setProducts] = useState([]);

  useEffect(() => {
    createArray();
  }, [products]);

  const createArray = () => {

    setProducts([...products]);
  };

  const emptyMessage = (
    <p>There are no products yet in your collection.</p>
  );

  const productsList = (

    <div className="ui four cards">
      {allProducts.map(product => <ProductCard product={product} key={product._id} deleteProduct={deleteProduct} />)}
    </div>
  );

  var timeout = 0;

  function doSearch(evt) {
    var searchText = evt.target.value.toLowerCase();; // this is the search text
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      let currentProducts = [...products]
      let newProducts = currentProducts.filter((product, index) => {
        let productName = product.title.toLowerCase();
        return productName.indexOf(searchText) >= 0;
      });

      setProducts(newProducts);
    }, 300);


  }

  return (
    <div>


      <input
        type="test"

        onChange={evt => doSearch(evt)}
        placeholder={'Search product'} className="product-search" />

      {products.length === 0 ? emptyMessage : productsList}
    </div>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  deleteProduct: PropTypes.func.isRequired
}
