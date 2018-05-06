import React from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { config } from "../../config.js";
import axios from "axios";

var new_form = {
	item_id: "",
	click_link: "",
	img_link: "",
	shop_name: "",
	tag: ""
};

function ShowImage(props) {
	return (
		<a href={props.click_link} target="_blank">
			<img src={props.src} width="300" height="300" />
		</a>
	);
}

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			form: Object.create(new_form),
			error: {
				code: "invalidCredentials"
			}
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillMount() {
		console.log(this.props);
	}

	handleChange(newPartialInput) {
		this.setState(state => ({
			...state,
			form: {
				...state.form,
				...newPartialInput
			}
		}));
	}

	onSubmit() {
		const props = this.props;
		const url = config.api_url + "/item";
		axios
			.post(url, {
				form: this.state.form
			})
			.then(function(res) {
				if (!res.data.status) {
					alert("item_id duplicated");
				} else {
					props.history.push("/home");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
		/*
		var formBody = [];
		for (var property in this.state.form) {
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(this.state.form[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");

		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: formBody
		})
			.then(res => res.json())
			.then(data => {
				if (!data.status) {
					alert("item_id duplicated");
				} else {
					this.props.history.push("/home");
				}
			})
			.catch(err => console.log(err));
		*/
	}

	render() {
		return (
			<div>
				<h2>Create item</h2>
				<Row>
					<Col sm={7}>
						<Form>
							<FormGroup row>
								<Label sm={2}>item_id</Label>
								<Col sm={6}>
									<Input type="value" name="item_id" value={this.state.form.item_id} onChange={e => this.handleChange({ item_id: e.target.value })} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2}>click_link</Label>
								<Col sm={6}>
									<Input
										type="value"
										name="click_link"
										value={this.state.form.click_link}
										onChange={e => this.handleChange({ click_link: e.target.value })}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2}>img_link</Label>
								<Col sm={6}>
									<Input
										type="value"
										name="img_link"
										value={this.state.form.img_link}
										onChange={e => this.handleChange({ img_link: e.target.value })}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2}>shop_name</Label>
								<Col sm={6}>
									<Input
										type="value"
										name="shop_name"
										value={this.state.form.shop_name}
										onChange={e => this.handleChange({ shop_name: e.target.value })}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2}>tag</Label>
								<Col sm={6}>
									<Input type="value" name="tag" value={this.state.form.tag} onChange={e => this.handleChange({ tag: e.target.value })} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col sm={{ size: 6, offset: 2 }}>
									<Button onClick={this.onSubmit}>Submit</Button>
								</Col>
							</FormGroup>
						</Form>
					</Col>

					<Col sm={5}>{this.state.form.img_link ? <ShowImage src={this.state.form.img_link} click_link={this.state.form.click_link} /> : null}</Col>
				</Row>
				<br />
			</div>
		);
	}
}
