import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,Button, Row, Col, Label } from 'reactstrap';
import {Link} from 'react-router-dom'

const About=()=>{


    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div> 
            </div>
            <div className="row row-content">
                    <div className="col-12 col-md-6">
                        <h3>Flick</h3>
                        <p>Flick is a Content based recommender system, recommender systems are information filtering tools that aspire to predict the rating for users and items.This recommendation system will collect information about the user’s preferences and recommend them movies based on their profile.</p>
                    </div>
                    
                </div>
        </div>
    )
}

export default About;