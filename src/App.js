import './App.css';
import React from 'react';
import { useState } from 'react';

const locations = [
    {
        name: 'Jacksonville, FL',
        id: '4160021'
    },
    {
        name: 'Austin, TX',
        id: '4671654'
    },
    {
        name: 'Cleveland, OH',
        id: '5150529'
    },
    {
        name: 'Atlanta, GA',
        id: '4180439'
    },
    {
        name: 'Tampa, FL',
        id: '4174757'
    },
    {
        name: 'San Fransisco, CA',
        id: '5391959'
    },
    {
        name: 'Seattle, WA',
        id: '5809844'
    }
];
function SelectBox1(props) {
        return (
            <div className="form-group">
                <label htmlFor="location1">First Location:</label>&nbsp;
                <select value={props.value} onChange={props.onChange} className="form-control">
                    {locations.map(location => {
                        return <option value={location.id} key={location.id} >{location.name}</option>
                    })}
                </select>
            </div>
        )
}

function SelectBox2(props) {
    return (
        <div className="form-group">
            <label htmlFor="location2">Second Location:</label>&nbsp;
            <select value={props.value} onChange={props.onChange} className="form-control">
                {locations.map(location => {
                    return <option value={location.id} key={location.id} >{location.name}</option>
                })}
            </select>
        </div>
    )
}

function App() {

    const [ selectValue, setSelectValue ] = useState([]);
    const [response,setResponse]=useState([{full_name:"",geoname_id:"",location: {latlon: {latitude: "", longitude: ""}},population:""}, {full_name:"",geoname_id:"",location: {latlon: {latitude: "", longitude: ""}},population:""}]);

    const handleChange = (index) => {
        return ((e) => {
            const newSelectValue = [...selectValue];
            newSelectValue[index] = e.target.value;
            setSelectValue(newSelectValue);
        })
    }
    const userAction = async(e) => {
        e.preventDefault();
        const fetchURL1 = `https://api.teleport.org/api/cities/geonameid%3A${selectValue[0]}`;
        const fetchURL2 = `https://api.teleport.org/api/cities/geonameid%3A${selectValue[1]}`;
        const response = await fetch(fetchURL1, {
            method: 'GET',
            headers: {
                "Content-Type": "application/vnd.teleport.v1+json"
            }
        });
        const myJson = await response.json();

        const response2 = await fetch(fetchURL2, {
            method: 'GET',
            headers: {
                "Content-Type": "application/vnd.teleport.v1+json"
            }
        });
        const myJson2 = await response2.json();

        setResponse([myJson, myJson2]);
    }

    function ResponseDisplay(props){
        return (
            <div>
                <p>Full name: {props.values.full_name}</p>
                <p>Location ID: {props.values.geoname_id}</p>
                <p>Longitude: {props.values.location.latlon.longitude}</p>
                <p>Latitude: {props.values.location.latlon.latitude}</p>
                <p>Population: {props.values.population}</p>
            </div>
        );
    }

  return (
    <div className="App">
        <h1>Select 2 Urban Areas to compare...</h1>
        <form onSubmit={userAction}>
            <SelectBox1 onChange={handleChange(0)}/>
            <SelectBox2 onChange={handleChange(1)}/>
            <button id="butt" type={"submit"}>Compare</button>
        </form>
        <div className="everything">
            <div className="results">
                <ResponseDisplay values={response[0]}/>
            </div>
            <div className="results2">
                <ResponseDisplay values={response[1]}/>
            </div>
        </div>

    </div>
  );
}

export default App;
