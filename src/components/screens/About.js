import React from 'react';
import {Link} from 'react-router-dom'

const About=()=>{
    return(
        <div className="container">
            <div className="row">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb cust_breadcrumb">
                        <li class="breadcrumb-item "><Link to='/' className="cust_breadcrumb_link">Home</Link></li>
                        <li class="breadcrumb-item text-light active" aria-current="page">About</li>
                    </ol>
                </nav>
                <div className="col-12">
                    <h3 className="main_heading">About</h3>
                </div> 
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6 text-light">
                    <h3>Flick</h3>
                    <p>Flick is a Content boosted recommender system, recommender systems are information filtering tools that aspire to predict the rating for users and items.This recommendation system will collect information about the user’s preferences and recommend them movies based on their profile.</p>
                </div>
            </div>
        </div>
    )
}

export default About;