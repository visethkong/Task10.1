import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
				<a className="navbar-brand" href="#">ICrowd</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="collapsibleNavbar">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<a className="nav-link active">Requester Task</a>
						</li>    
					</ul>
				</div>  
		</nav>
		);
    }
}

export default Navbar;
