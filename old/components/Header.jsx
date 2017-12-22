import React from 'react';

class Header extends React.Component {
	render() {
		return(
			<div>
				Welcome, {this.props.username}.
				<button className="btn btn-primary">Log in</button>
			</div>
		);
	};
}

export default Header;
