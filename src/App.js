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



function App() {

  const[latest,setLatest]=useState([])
  const[india,setIndia]=useState([])
  const[results,setResults]=useState([])
  const[searchStates,setSearchStates]=useState("")
  


  useEffect(()=>{
    axios
    .all([
    axios.get("https://disease.sh/v2/all"),
    axios.get("https://api.covidindiatracker.com/state_data.json"),
    axios.get("https://disease.sh/v2/countries/india")
    ])
        .then(responseArr=>{
          setLatest(responseArr[0].data);
          setResults(responseArr[1].data)
          setIndia(responseArr[2].data)

        })
        .catch(err=>{
          console.log("error");
        });
  },[]);

  
  const date=new Date(parseInt(latest.updated))
  const lastUpdated=date.toString();

  const filterStates = results.filter(item=>{
    return searchStates !== "" ? item.state.includes(searchStates) : item
  })

  const states= filterStates.map((data,i)=>{
    return(
      <Card
      border="secondary"
      key={i}
      bg="dark"
       text="light"
      className="text-center"
      style={{ margin: "12px" }}
    >
      
      <Card.Body>
      <Card.Header><b>{data.state}</b></Card.Header>
    <Card.Text><Badge pill variant="primary">{data.aChanges}</Badge><b>Active: </b>{data.active}</Card.Text>
      <Card.Text><Badge pill variant="warning">{data.cChanges}</Badge><b>Confirmed: </b>{data.confirmed}</Card.Text>
      <Card.Text><Badge pill variant="danger">{data.dChanges}</Badge><b>Deceased: </b>{data.deaths}</Card.Text>
      <Card.Text><Badge pill variant="success">{data.rChanges}</Badge><b>Recovered: </b>{data.recovered}</Card.Text>
      </Card.Body>
    </Card>
    )
  })

  var queries = [{
    columns: 2,
    query: 'min-width: 400px'
  }, {
    columns: 3,
    query: 'min-width: 750px'
  },{
    columns: 5,
    query: 'min-width: 1000px'
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
      style={{ margin: "12px" }}
    >
      
      
      <Card.Header><b><FcApproval/>Made by: </b><a target="_blank" style={{ color: "white" }}href="https://github.com/gurkiratsinghofficial">Gurkirat Singh</a></Card.Header>
      </Card>
      <ScrollUpButton />

    </div>
  );
}

export default App;
