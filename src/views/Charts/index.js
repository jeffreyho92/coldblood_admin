import React from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { config } from "../../config.js";
import axios from "axios";
import {Line, Bar, Bubble} from 'react-chartjs-2';

const options = {
   scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    }
}

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data_line: {},
			data_cat_click: {},
			data_cat_browse: {},
			arr_click_logs: [],
			arr_browse_logs: [],
			arr_count_browse_logs: [],
			arr_count_click_logs: []
		};

		this.generateData = this.generateData.bind(this);
	}

	componentWillMount() {
		this.getData().then(()=>{
			console.log('done getdata');
			this.generateData();
		})
	}

	async getData(){
		let url = ""
		url = config.api_url + "/click_logs";
		await axios.get(url).then(res => {
			if (res.data.length != 0) {
				this.setState({
					arr_click_logs: res.data
				});
				console.log('end arr_click_logs');
			}
		});

		url = config.api_url + "/browse_logs";
		await axios.get(url).then(res => {
			if (res.data.length != 0) {
				this.setState({
					arr_browse_logs: res.data
				});
				console.log('end arr_browse_logs');
			}
		});

		url = config.api_url + "/count_browse_logs";
		await axios.get(url).then(res => {
			if (res.data.length != 0) {
				this.setState({
					arr_count_browse_logs: res.data
				});
				console.log('end arr_count_browse_logs');
			}
		});

		url = config.api_url + "/count_click_logs";
		await axios.get(url).then(res => {
			if (res.data.length != 0) {
				this.setState({
					arr_count_click_logs: res.data
				});
				console.log('end arr_count_click_logs');
			}
		});
	}

	generateData(){
		const data_cat_browse = {
		  labels: [],
		  datasets: []
		};

		const data_line = {
		  labels: [],
		  datasets: [
		    {
		      label: 'Browse logs',
		      fill: true,
		      lineTension: 0.1,
		      backgroundColor: 'rgba(75,192,192,0.4)',
		      borderColor: 'rgba(75,192,192,1)',
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderColor: 'rgba(75,192,192,1)',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      pointHoverBorderColor: 'rgba(220,220,220,1)',
		      pointHoverBorderWidth: 2,
		      pointRadius: 1,
		      pointHitRadius: 10,
		      data: []
		    }
		  ]
		};

		const data_cat_click = {
		  labels: [],
		  datasets: [
		    {
		      label: 'Click Discover',
		      backgroundColor: 'rgba(255,99,132,0.2)',
		      borderColor: 'rgba(255,99,132,1)',
		      borderWidth: 1,
		      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		      hoverBorderColor: 'rgba(255,99,132,1)',
		      data: []
		    }
		  ]
		};

		if(this.state.arr_browse_logs){
			var today = new Date();
			var start = new Date().setDate(today.getDate()-30);
			var end = new Date().setDate(today.getDate()-1);

			var loop = new Date(start);
			while(loop <= end){     
				var value = 0;
				var string_day = loop.getDate();
				var string_month = (parseInt(loop.getMonth()) + 1);
				var string_date = string_day + '/' + string_month;
				data_line.labels.push(string_date);

				var arr1 = this.state.arr_browse_logs;
				for (var i = 0; i < arr1.length; i++) {
					if(string_month == arr1[i]._id.month && string_day == arr1[i]._id.day){
						value = arr1[i].group_count;
						this.state.arr_browse_logs.splice(i, 1);
						break;
					}
				}

				data_line.datasets[0].data.push(value);

				var newDate = loop.setDate(loop.getDate() + 1);
				loop = new Date(newDate);
			}
		}

		if(this.state.arr_count_browse_logs){
			var datasets = [];
			var arr_cat = ['accessories', 'home', 'hype', 'korean', 'local', 'sport', 'techwear'];
			var obj_page = {};

			this.state.arr_count_browse_logs.forEach(function(c) {
				var obj_cat_detail = {};

				var cat = c._id.cat;
				var page = c._id.currentPage;
				var count = c.group_count;

				if(cat == ""){
					cat = 'home';
				}

				if(obj_page.hasOwnProperty(page)){
				  obj_cat_detail = obj_page[page];
					obj_cat_detail[cat] = count;
					obj_page[page] = obj_cat_detail;
				}else{
					obj_cat_detail[cat] = count;
					obj_page[page] = obj_cat_detail;
				}
			});

			console.log(obj_page);

			for (var page in obj_page) {
				console.log(page);

				var page_data = [];
				arr_cat.forEach(function(cat){
					var count = 0;
					if(obj_page[page].hasOwnProperty(cat)){
						count = obj_page[page][cat];
					}
					page_data.push(count);
				});

				var cat_browse_dataset = {
					label: 'Page ' + page,
		      backgroundColor: 'rgba(255,99,132,0.2)',
		      borderColor: 'rgba(255,99,132,1)',
		      borderWidth: 1,
		      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		      hoverBorderColor: 'rgba(255,99,132,1)',
		      data: page_data
				};
				datasets.push(cat_browse_dataset);
			}

			data_cat_browse.labels = arr_cat;
			data_cat_browse.datasets = datasets;
		}

		if(this.state.arr_count_click_logs){
		  /*
		  1 = btnHowToBuy
		  2 = Discover
		  3 = discover Hype
		  4 = discover Sport
		  5 = discover Techwear
		  6 = discover Local
		  7 = discover Minimalist
		  8 = discover Korean
		  9 = discover Accessories
		  */
		  var click_label = [];
		  var click_data = [];
		  var total_click = 0;

			this.state.arr_count_click_logs.sort((a,b) => b.group_count - a.group_count);
		  this.state.arr_count_click_logs.forEach(function(c) {
		  	switch (c._id) {
			    case 1:
			    	click_label.push('btnHowToBuy');
			      break;
			    case 2:
			    	click_label.push('Discover');
			      break;
			    case 3:
			    	click_label.push('discover Hype');
			      break;
			    case 4:
			    	click_label.push('discover Sport');
			      break;
			    case 5:
			    	click_label.push('discover Techwear');
			      break;
			    case 6:
			    	click_label.push('discover Local');
			      break;
			    case 7:
			    	click_label.push('discover Minimalist');
			      break;
			    case 8:
			    	click_label.push('discover Korean');
			      break;
			    case 9:
			    	click_label.push('discover Accessories');
			      break;
			  }

			  click_data.push(c.group_count);
			  total_click += parseInt(c.group_count);
			});

			data_cat_click.labels = click_label;
			data_cat_click.datasets[0].data = click_data;
			console.log(total_click);
		}

		this.setState({
			data_line: data_line,
			data_cat_click: data_cat_click,
			data_cat_browse: data_cat_browse
		});
	}

	render() {
		return (
			<div>
				<h2>Charts</h2>
				<Row>
					<Col>
						<Bar data={this.state.data_cat_browse} options={options} />
						<Line data={this.state.data_line} />
						<br/><hr/><br/>
						<Bar data={this.state.data_cat_click} />
					</Col>
				</Row>
				<br />
			</div>
		);
	}
}
