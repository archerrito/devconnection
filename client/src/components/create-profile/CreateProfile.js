import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from'../common/TextFieldGroup';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername:'',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin:'',
            youtube:'',
            instagram: '',
            errors: {}
        }
    }
    //create component state values
    render() {
        return (
        <div className="create-profile">
            <div className="container">
                <div className = "row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Create your Profile</h1>
                        <p className="lead tex-center">
                            Let's get some information 
                        </p>  
                        <small className = "d-block pb-3">* = required fields</small>
                    </div>
                </div>
            </div>            
        </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile);