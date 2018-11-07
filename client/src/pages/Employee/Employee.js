import React, { Component } from "react";

export default class Employee extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <h1>I am employee number {this.props.match.params.id}</h1>;
  }
}
