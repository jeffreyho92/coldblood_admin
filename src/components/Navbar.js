import React from "react";
import { Link } from "react-router-dom";
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
						<Link to={"/charts"}>
							<NavItem>
								<NavLink>Charts</NavLink>
							</NavItem>
						</Link>
					</Nav>
				</Navbar>
			</div>
		);
	}
}
