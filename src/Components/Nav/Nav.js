import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';
import {connect} from 'react-redux'
import {updateUser, logout} from './../.././Redux/reducer'

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => this.props.store.getUser)
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(_ => this.props.store.logout)
  }
  
  render() {
    console.log(this.props)
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container' >
            <div className='nav-profile-pic' style={{BackgroundImage: this.props.REDUX_STATE_PIC}}></div>
            {console.log(this.props.REDUX_STATE_PIC)}
            <p>placeholder username</p>
          </div>
          <div className='nav-links'>
            <Link to='/dash'><img className='nav-img' src={homeLogo} alt='home' /></Link>
            <Link to='/form'><img className='nav-img' src={newLogo} alt='new post' /></Link>
          </div>
          <Link to='/' onClick={this.logout}><img className='nav-img logout' src={logoutLogo} alt='logout' /></Link>
        </div>
  }
}
const mapStateToProps = (store) => store

export default withRouter(connect(mapStateToProps)(Nav))