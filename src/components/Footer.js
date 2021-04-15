import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-4">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/aboutus'>About</Link></li>
                        <li><Link to='/movies'>Movies</Link></li>
                        <li><Link to='/contactus'>Contact</Link></li>
                    </ul>
                </div>                
                <div className="col-6 col-sm-4 ">
                    <div >
                        <h5>Contact Developer</h5>
                        <developer>
                            Lakshya Bansal<br/>                            
                            <i className="fa fa-github"></i>: <a href="https://github.com/lakshya-20" target="_blank">lakshya-20</a><br />
                            <i className="fa fa-user"></i>: <a href="http://www.lakshyabansal.me/" target="_blank">lakshyabansal.me</a>
                        </developer>                    
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-1">             
                <div className="col-auto">
                    <p>© Copyright 2021 Flick Movie Recommendation</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;