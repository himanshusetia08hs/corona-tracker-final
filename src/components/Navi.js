import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { FcMindMap } from "react-icons/fc";


class Navi extends Component {
    render() {
        return (
            <div>
                <Navbar bg="black" variant="dark" className="text-center">
    <Navbar.Brand href="#home">
    <FcMindMap/>{' '}
      COV-19 Tracker
    </Navbar.Brand>
    
  </Navbar>
            </div>
        )
    }
}

export default Navi
