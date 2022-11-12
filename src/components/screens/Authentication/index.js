import React,{ useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Login from './Login';
import Signup from './Signup';

const Authentication = ({toggleAuthModal}) => {
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (index) => {
    setActiveTab(index);
  }
  const handleGoogleLogin=()=>{
    window.open(process.env.REACT_APP_BACKENDURL+"/api/auth/google", "_self");
  }
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink 
            className={classnames({ active: activeTab === "1" })}
            onClick={()=> toggleTab("1")}
          >
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink 
            className={classnames({ active: activeTab === "2" })}
            onClick={()=> toggleTab("2")}
          >
            Signup
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="my-2">
        <TabPane tabId="1">
          <Login toggleAuthModal={toggleAuthModal} handleGoogleLogin={handleGoogleLogin}/>
        </TabPane>
        <TabPane tabId="2">
          <Signup toggleAuthModal={toggleAuthModal} handleGoogleLogin={handleGoogleLogin}/>
        </TabPane>
      </TabContent>
    </div>
  )
}
export default Authentication;