import React,{useEffect,useState} from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import moment from 'moment';
import Columns from 'react-columns'
import Form from 'react-bootstrap/Form'
import Navi from './components/Navi'
import { FcApproval } from "react-icons/fc";
import { FcGlobe } from "react-icons/fc";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'



function App() {

  const[latest,setLatest]=useState([])
  const[india,setIndia]=useState([])
  const[results,setResults]=useState([])
  const[searchStates,setSearchStates]=useState("")
  const[districts,setDistricts]=useState([])
  
  


  useEffect(()=>{
    axios
    .all([
    axios.get("https://disease.sh/v2/all"),
    axios.get("https://api.covid19india.org/data.json"),
    axios.get("https://disease.sh/v2/countries/india"),
    axios.get("https://api.covid19india.org/state_district_wise.json")
    ])
        .then(responseArr=>{
          setLatest(responseArr[0].data)
          setResults(responseArr[1].data.statewise)
          setIndia(responseArr[2].data)
          console.log(responseArr[3].data)

        })
        .catch(err=>{
          console.log("error");
        });
  },[]);

  
  const date=new Date(parseInt(latest.updated))
  const lastUpdated=date.toString();

  const filterStates = results.filter(item=>{
    return searchStates !== "" ? item.state.toLowerCase().includes(searchStates.toLowerCase()) : item
  })

  const states= filterStates.map((data,i)=>{
    if(data.state === "Total"){ 
      return null;
  }
  else{
      
    return(
      <Card
      border="secondary"
      key={i}
      bg="dark"
       text="light"
      className="text-center"
      style={{ margin: "8px" }}
    >
      <Accordion >
  <Card >
    <Accordion.Toggle as={Card.Header} eventKey="0" >
      <b style={{color:"black"}}>{data.state}</b>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
    <Table striped bordered hover size="sm" responsive style={{ margin: "0px",padding:"0px" }}><small>
  <thead>
    <tr>
      <th>Dist</th>
      <th>active</th>
      <th>confirmed</th>
      <th>deaths</th>
      <th>recovered</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <tr></tr>
      <td>coming</td>
      <td>soon</td>
      <td>!!</td>
      <td></td>
    </tr>
  </tbody>
</small></Table>
    </Accordion.Collapse>
  </Card>
  </Accordion>
      <Card.Body>
        
      
    <Card.Text><b>Active: </b>{data.active}</Card.Text>
      <Card.Text><Badge pill variant="primary"><small>^{data.deltaconfirmed}</small></Badge><b>Confirmed: </b>{data.confirmed}</Card.Text>
      <Card.Text><b>Deceased: </b>{data.deaths}</Card.Text>
      <Card.Text><b>Recovered: </b>{data.recovered}</Card.Text>
      </Card.Body>
    </Card>
    )}
  })

  var queries = [{
    columns: 2,
    query: 'min-width: 400px'
  }, {
    columns: 3,
    query: 'min-width: 870px'
  },{
    columns: 3,
    query: 'min-width: 1100px'
  }];


  return (
   <div>
     <Navi/>
    <CardDeck>
  <Card bg="warning" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title><FcGlobe/>{' '}{latest.cases}</Card.Title>
  <Card.Title ><b  style={{color:"black"}}>IND{' '}</b>{india.cases}</Card.Title>
    </Card.Body>
    <Card.Footer>
        <b>Cases</b>
    </Card.Footer>
  </Card>
  <Card bg="danger" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title><FcGlobe/>{' '}{latest.deaths}</Card.Title>
      <Card.Title><b  style={{color:"black"}}>IND{' '}</b>{india.deaths}</Card.Title>
    </Card.Body>
    <Card.Footer>
        <b>Deceased</b>
    </Card.Footer>
  </Card>
  <Card bg="success" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title><FcGlobe/>{' '}{latest.recovered}</Card.Title>
      <Card.Title><b style={{color:"black"}}>IND{' '}</b>{india.recovered}</Card.Title>
    </Card.Body>
    <Card.Footer>
        <b>Recovered</b>
    </Card.Footer>
  </Card>
</CardDeck>
<small style={{color:"white"}}>Last updated {moment(lastUpdated).calendar()}</small>

<Form>
  <Form.Group controlId="formGroupSearch" > 
    <Form.Control type="email" placeholder="Search a state..."  onChange={e => setSearchStates(e.target.value)}/> 
  </Form.Group>
</Form>


  <Columns queries={queries}>{states}</Columns>

  <Card
      border="dark"
      bg="secondary"
       text="light"
      className="text-center"
      style={{ margin: "8px" }}
    >
      
      
      <Card.Header><b><FcApproval/>Made by: </b><a target="_blank" style={{ color: "white" }}href="https://github.com/gurkiratsinghofficial">Gurkirat Singh</a></Card.Header>
      </Card>
      <ScrollUpButton />

    </div>
  );
}

export default App;
