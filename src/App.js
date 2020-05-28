import React,{useEffect,useState} from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import moment from 'moment';
import Columns from 'react-columns'
import Form from 'react-bootstrap/Form'

function App() {

  const[latest,setLatest]=useState([])
  const[results,setResults]=useState([])
  const[searchStates,setSearchStates]=useState("")
  


  useEffect(()=>{
    axios
    .all([
    axios.get("https://disease.sh/v2/all"),
    axios.get("https://api.covidindiatracker.com/state_data.json")
    ])
        .then(responseArr=>{
          setLatest(responseArr[0].data);
          setResults(responseArr[1].data)

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
      key={i}
      bg="light"
       text="dark"
      className="text-center"
      style={{ margin: "10px" }}
    >
      
      <Card.Body>
      <Card.Header><b>{data.state}</b></Card.Header>
      <Card.Text>Active:{data.active}</Card.Text>
      <Card.Text>Confirmed:{data.confirmed}</Card.Text>
      <Card.Text>Deceased:{data.deaths}</Card.Text>
      <Card.Text>Recovered:{data.recovered}</Card.Text>
      </Card.Body>
    </Card>
    )
  })

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 750px'
  }];


  return (
   <div>
    <CardDeck>
  <Card bg="secondary" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
        {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small >Last updated {moment(lastUpdated).calendar()}</small>
    </Card.Footer>
  </Card>
  <Card bg="danger" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Deceased</Card.Title>
      <Card.Text>
        {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {moment(lastUpdated).calendar()}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>
        {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {moment(lastUpdated).calendar()}</small>
    </Card.Footer>
  </Card>
</CardDeck>


<Form>
  <Form.Group controlId="formGroupSearch"> 
    <Form.Control type="email" placeholder="Search a state..."  onChange={e => setSearchStates(e.target.value)}/> 
  </Form.Group>
</Form>


  <Columns queries={queries}>{states}</Columns>



    </div>
  );
}

export default App;
