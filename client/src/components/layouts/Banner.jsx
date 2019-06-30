import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section id="index-banner">
			<div className="vertical-center">
				<h2>WELCOME TO POLITICO</h2>
				<h3>A transparent system that allows you to vote with integrity.</h3>
				<center><Link to="/register"><input type="submit" name="registerBtn" id="index-register-btn" value="Create Account" /></Link></center>
			</div>
		</section>
  )
}

export default Banner