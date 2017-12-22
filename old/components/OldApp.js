import React from 'react';
import Footer from './Footer.jsx'
import Header from './Header.jsx'

class App extends React.Component {

	constructor() {
		super();

		this.state = {data: []};

	};

	componentDidMount() {
		fetch('/api/video_categories')
			.then(response => response.json())
			.then(data => this.setState({data}))
	};

	render() {
		return(
			<div>
				<Header />
				Hey there.

				<ul>
					{this.state.data.map((category, i) => <li><a href={'/categories/' + category.id}> {category.name}: {category.description}</a></li>)}
				</ul>

				<Footer />
			</div>
		);
	};

}

export default App;
