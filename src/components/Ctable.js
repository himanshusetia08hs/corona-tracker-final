import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'


class Ctable extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        const {districts, state} = this.props;
        //console.log("Props",this.props);
        console.log("Hello",state,districts.data[state]);
        return (
            <Table striped bordered hover size="sm" responsive style={{ margin: "0px",padding:"0px" }}>
        <small>
            <thead>
              <tr style={{background:"light"}}>
              <th>District</th>
                <th>Active</th>
                <th>Confirmed</th>
                <th>Recovered</th>
                <th>Deaths</th>
              </tr>
              {
                Object.keys(districts.data[state].districtData).map((value)=>{
                    console.log(districts.data[state].districtData[value]);
                    return (
                        <tr>
                        <td>{value}</td>
                        <td>{districts.data[state].districtData[value].active}</td>
                        <td>
                        {
                             districts.data[state].districtData[value].delta.confirmed !==0 ?  <Badge pill variant="warning"><small><i className="fas fa-arrow-up"/></small>{ districts.data[state].districtData[value].delta.confirmed}</Badge>:<></>
                        }
                            {districts.data[state].districtData[value].confirmed}</td>
                        <td>{districts.data[state].districtData[value].recovered}</td>
                        <td>{districts.data[state].districtData[value].deceased}</td>
                              </tr>
                    )
                })
                  
    }
            </thead>
            </small>
            </Table>
        )
    }
}

export default Ctable


