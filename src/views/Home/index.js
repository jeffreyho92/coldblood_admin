import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Label, Input, Row } from "reactstrap";
import { config } from "../../config.js";
import axios from "axios";
import moment from "moment";

var new_form = {
	item_id: "",
	click_link: "",
	img_link: "",
	shop_name: "",
	tag: "",
	created_time: "",
	img_valid: "",
	promote: ""
};

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arr_lists: [],
			primary: false,
			form: Object.create(new_form),
			toggleIndex: ""
		};

		this.togglePrimary = this.togglePrimary.bind(this);
		this.togglePrimaryClose = this.togglePrimaryClose.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.loadLists = this.loadLists.bind(this);
	}

	componentWillMount() {
		console.log("componentWillMount");
		this.loadLists();
	}

	loadLists() {
		const url = config.api_url + "/lists";
		axios.get(url).then(res => {
			if (res.data.length != 0) {
				this.setState({
					arr_lists: res.data
				});
			}
		});
		/*
		fetch(url)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
			*/
	}

	togglePrimary(ID) {
		console.log("togglePrimary " + ID);
		if (this.state.form.item_id !== "") {
			return;
		}

		this.state.arr_lists.map(l => {
			if (l.item_id == ID) {
				var form = Object.create(new_form);

				form = l;
				/*
				form.item_id = l.item_id;
				form.click_link = l.click_link;
				form.img_link = l.img_link;
				form.shop_name = l.shop_name;
				form.tag = l.tag;
				form.created_time = l.created_time;
				form.img_valid = l.img_valid;
				*/

				this.setState({
					form: form
				});
			}
		});

		this.setState({
			primary: !this.state.primary
		});
	}

	togglePrimaryClose() {
		this.setState({
			primary: false,
			toggleIndex: "",
			form: Object.create(new_form)
		});
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

	deleteItem() {
		var item_id = this.state.form.item_id;
		var confirmDel = window.confirm("Are you sure want to delete " + item_id + "?");
		if (!confirmDel) {
			return;
		}

		const url = config.api_url + "/item_delete";
		axios
			.post(url, {
				item_id: item_id
			})
			.then(function(res) {
				if (!res.data.status) {
					alert("Error");
				} else {
					window.location.reload();
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	updateForm() {
		var form = this.state.form;
		if (form.promote == "") {
			delete form.promote;
		}

		var self = this;
		const url = config.api_url + "/item_update";
		axios
			.post(url, {
				form: form
			})
			.then(function(res) {
				if (!res.data.status) {
					alert("Error");
				} else {
					self.loadLists();
					self.togglePrimaryClose();
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<h2>
					Lists &emsp;
					<Link to={"/create_item"}>
						<Button color="primary">Create item</Button>
					</Link>
				</h2>
				<Row>
					<Col>
						<Table hover responsive className="">
							<thead className="">
								<tr>
									<th className="text-center">Item_ID</th>
									<th>Img_link</th>
									<th>Shop_name</th>
									<th>Tag</th>
									<th>Created_time</th>
									<th>Img_valid</th>
									<th>Promote</th>
									<th>Click</th>
								</tr>
							</thead>
							<tbody>
								{this.state.arr_lists.map(
									(list, index) => (
										<tr key={index} onClick={this.togglePrimary.bind(this, list.item_id)} className="hand-cursor">
											<td className="text-center">{list.item_id}</td>
											<td>
												<img src={list.img_link} width="100" height="100" />
											</td>
											<td>{list.shop_name}</td>
											<td>{list.tag}</td>
											<td>{moment.unix(list.created_time).format("YYYY/MM/DD HH:mm:ss")}</td>
											<td>{list.img_valid ? "True" : "False"}</td>
											<td>{list.promote}</td>
											<td />
										</tr>
									),
									this
								)}
							</tbody>
						</Table>
					</Col>
				</Row>

				<Modal isOpen={this.state.primary} toggle={this.togglePrimaryClose} className={"modal-lg modal-primary " + this.props.className}>
					<ModalHeader toggle={this.togglePrimaryClose}>Item_ID : {this.state.form.item_id}</ModalHeader>
					<ModalBody>
						<Row>
							<Col sm={7}>
								<Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
									<FormGroup row>
										<Label sm={3}>click_link</Label>
										<Col sm={9}>
											<Input
												type="value"
												name="click_link"
												value={this.state.form.click_link}
												onChange={e => this.handleChange({ click_link: e.target.value })}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={3}>img_link</Label>
										<Col sm={9}>
											<Input
												type="value"
												name="img_link"
												value={this.state.form.img_link}
												onChange={e => this.handleChange({ img_link: e.target.value })}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={3}>shop_name</Label>
										<Col sm={9}>
											<Input
												type="value"
												name="shop_name"
												value={this.state.form.shop_name}
												onChange={e => this.handleChange({ shop_name: e.target.value })}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={3}>tag</Label>
										<Col sm={9}>
											<Input type="value" name="tag" value={this.state.form.tag} onChange={e => this.handleChange({ tag: e.target.value })} />
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={3}>promote</Label>
										<Col sm={9}>
											<Input
												type="value"
												name="promote"
												value={this.state.form.promote}
												onChange={e => this.handleChange({ promote: e.target.value })}
											/>
										</Col>
									</FormGroup>
								</Form>
							</Col>

							<Col sm={5}>
								<a href={this.state.form.click_link} target="_blank">
									<img src={this.state.form.img_link} width="300" height="300" />
								</a>
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<div className="col-auto mr-auto">
							<Button color="danger" onClick={this.deleteItem}>
								Delete
							</Button>
						</div>
						<div className="col-auto">
							<Button
								color="primary"
								onClick={event => {
									this.updateForm();
								}}
							>
								Update
							</Button>
							&emsp;
							<Button color="secondary" onClick={this.togglePrimaryClose}>
								Cancel
							</Button>
						</div>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
