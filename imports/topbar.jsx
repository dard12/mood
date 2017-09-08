import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Topbar extends Component {
  isActive(path) {
    // return this.props.location.pathname === path;
    return false;
  }

  routes() {
    return [
      { path: '/', label: 'Yourself' },
      { path: '/relationships', label: 'Relationships' },
    ];
  }

  renderLinks() {
    return _.map(this.routes(), ({ path, label }) => {
      return (
        <Link key={path} to={path} className={this.isActive(path) && 'active'}>
          {label}
        </Link>
      );
    });
  }

  render() {
    return <ul className="topbar"> {this.renderLinks()} </ul>;
  }
}
