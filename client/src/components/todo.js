import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

import Header from './header';
import List from './list';

export default class Todo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shipments: [],
			isLoading: true,
			shipmentsListIsEmpty: false,
			buttons: [
				{
					text: 'Pick Up',
					type: 'pickup'
				},
				{
					text: 'Deliver',
					type: 'deliver'
				}
			],
		}
	}

	  getMyShipments() {
		    let userId = '5b51abb66423f83a82678516';
		    axios.request({
		      method: 'GET',
		      url: 'http://localhost:4877/shipments/courier/' + userId,
		    })
		    .then(response => {
		      console.log('response:', response);
		      this.setState({
		        shipments: response.data,
		        isLoading: false
		      }, () => {
		        console.log(this.state.shipment);
		      });
		      if (response.data.length === 0) {
		      	this.setState({
		      		shipmentsListIsEmpty: true,
		      	});
		      }
		    })
		    .catch(error => {
		      console.error(error);
		    });
		}

	componentWillMount() {
		console.log('getting my shipments...');
		this.getMyShipments();
	}

	render() {
		return (
			<Route path='/todo' render={ (props) => (
	            <div>
	              	<Header {...props} text="Courier To-Do Web Tool"/>
	              	<List {...props} headings={this.props.headings} caption={'My Shipments'} shipments={this.state.shipments}/>
	            	{this.state.isLoading && <p>Loading...</p>}
	            	{this.state.shipmentsListIsEmpty && <p>No shipments found!</p>}
	            </div>
	        )}/>
		)
	}
}
