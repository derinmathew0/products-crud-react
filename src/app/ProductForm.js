import React from 'react';
import classnames from 'classnames';

class ProductForm extends React.Component {
  state = {
    _id: this.props.product ? this.props.product._id : null,
    title: this.props.product ? this.props.product.title : '',
    cover: this.props.product ? this.props.product.cover : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.product._id,
      title: nextProps.product.title,
      cover: nextProps.product.cover
    });
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    }
     else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  isValidImageURL=(url) =>{
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(url) && url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    //return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    
    // validation
    let errors = {};
    let isValidUrl=this.isValidImageURL(this.state.cover);
    
    if (this.state.title === '') errors.title = "This field is required";
    if (!isValidUrl) errors.cover = "Invalid Image Url";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, title, cover } = this.state;
      this.setState({ loading: true });
      this.props.saveProduct({ _id, title, cover })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Add new product</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title"
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.cover})}>
          <label htmlFor="cover">Product Image URL</label>
          <input
            name="cover"
            value={this.state.cover}
            onChange={this.handleChange}
            id="cover"
          />
          <span>{this.state.errors.cover}</span>
        </div>

        <div className="field">
          {this.state.cover !== '' && <img src={this.state.cover} alt={this.state.title} className="ui small bordered image"/>}
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return (
      <div>
        { form }
      </div>
    );
  }
}


export default ProductForm;
