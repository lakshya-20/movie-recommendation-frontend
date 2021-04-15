import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,Button, Row, Col, Label } from 'reactstrap';
import {Link} from 'react-router-dom'

const Contact=()=>{


    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div> 
            </div>
            <div className="row row-content">
                    <div className="col-12">
                        <h3>Information</h3>
                    </div>
                    {/* <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                                Galgotias University<br />
                                Greater Noida, U.P<br />
                                INDIA<br />
                                <i className="fa fa-phone"></i>: +9999999999<br />
                                <i className="fa fa-fax"></i>: +9999999999<br />
                                <i className="fa fa-envelope"></i>: <a href="mailto:info@flick.com">info@flick.com</a>
                            </address>
                    </div> */}
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Contact Developer</h5>
                        <developer>
                            Lakshya Bansal<br/>                            
                            <i className="fa fa-github"></i>: <a href="https://github.com/lakshya-20" target="_blank">lakshya-20</a><br />
                            <i className="fa fa-user"></i>: <a href="http://www.lakshyabansal.me/" target="_blank">lakshyabansal.me</a>

                        </developer>
                    </div>
                    {/* <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href=""><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="info@flick.com"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div> */}
                </div>
        </div>
    )
}

export default Contact;