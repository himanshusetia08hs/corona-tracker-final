import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { FcMindMap } from "react-icons/fc";


class Navi extends Component {
    render() {
        return (
            <div>
                <Navbar bg="black" variant="dark" className="text-center">
    <Navbar.Brand href="#home">
    <img width="41ch" src="logomain.png"/>{' '}
      COV-19 Tracker
    </Navbar.Brand>
    
  </Navbar>
            </div>
        )
    }
}

export default Navi
