import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordtwo: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //test for certain properties
    if(nextProps.errors) {
      //get errors from redux state, set to component state
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordtwo: this.state.passwordtwo
    };

    //call to action, history allows us to redirect 
    //from within action
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const {errors} = this.state;
    return (
      <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                className={classnames('form-control form-control-lg', {
                  'is-invalid' : errors.name
                })}
                placeholder="Name" 
                name="name"
                value={this.state.name}
                onChange={this.onChange} 
              />
              {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
            </div>
            <div className="form-group">
              <input 
                type="email" 
                className={classnames('form-control form-control-lg', {
                  'is-invalid' : errors.email
                })} 
                placeholder="Email Address" 
                name="email"
                value={this.state.email} 
                onChange={this.onChange}
              />
              {errors.name && (<div className="invalid-feedback">{errors.email}</div>)}
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input 
                type="password" 
                className={classnames('form-control form-control-lg', {
                  'is-invalid' : errors.password
                })} 
                placeholder="Password" 
                name="password"
                value={this.state.password} 
                onChange={this.onChange}
              />
              {errors.name && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div className="form-group">
              <input 
                type="password" 
                className={classnames('form-control form-control-lg', {
                  'is-invalid' : errors.passwordtwo
                })} 
                placeholder="Confirm Password" 
                name="passwordtwo"
                value={this.state.passwordtwo} 
                onChange={this.onChange}
                />
                {errors.name && (<div className="invalid-feedback">{errors.passwordtwo}</div>)}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

//Any properties have in component should map to proptypes
//data type, required or not
Register.propTypes = {
  //action, but also a property
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

//if we want to get our auth state or errors state to component
const mapStateToProps = (state) => ({
auth: state.auth,
errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));