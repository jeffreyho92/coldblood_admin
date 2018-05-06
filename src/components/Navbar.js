import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Navbar color="" light expand="md" className="navbar-dark bg-dark">
					<NavbarBrand href="/">Coldblood Admin</NavbarBrand>
					<Nav navbar>
						<NavItem>{/*
							<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
						*/}</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}
