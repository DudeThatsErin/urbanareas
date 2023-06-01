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
function SelectBox1() {
    const [value, setValue] = useState(null);

        return (
            <div className="form-group">
                <label htmlFor="location1">First Location:</label>&nbsp;
                <select value="firstSelect" onChange={(e) => setValue(e.target.value)} className="form-control">
                    {locations.map(location => {
                        return <option value={location.id} key={location.id} >{location.name}</option>
                    })}
                </select>
            </div>
        )
}

function SelectBox2() {
    const [value, setValue] = useState(null);

    return (
        <div className="form-group">
            <label htmlFor="location2">Second Location:</label>&nbsp;
            <select value="secondSelect" onChange={(e2) => setValue(e2.target.value)} className="form-control">
                {locations.map(location => {
                    return <option value={location.id} key={location.id} >{location.name}</option>
                })}
            </select>
        </div>
    )
}
const userAction = async() => {
    const fetchURL1 = `https://api.teleport.org/api/cities/geonameid%3A${SelectBox1.value}`;
    const fetchURL2 = `https://api.teleport.org/api/cities/geonameid%3A${SelectBox2.value}`;
    const response = await fetch(fetchURL1, {
        method: 'GET',
        headers: {
            "Content-Type": "application/vnd.teleport.v1+json"
        }
    });
    //console.log('response', response);
    const myJson = await response.json();
    document.getElementById('response').innerText = await myJson;
    console.log('myjson', myJson);

    const response2 = await fetch(fetchURL2, {
        method: 'GET',
        headers: {
            "Content-Type": "application/vnd.teleport.v1+json"
        }
    });
    //console.log('response2', response2);
    const myJson2 = await response2.json();
    console.log('myjson2', myJson2);
    document.getElementById('response2').innerText = await myJson2;


}

function App() {
  return (
    <div className="App">
        <h1>Select 2 Urban Areas to compare...</h1>
        <form action={userAction()}>
            <SelectBox1 />
            <SelectBox2 />
            <button id="butt" type={"submit"}>Compare</button>
        </form>
        <div id="response"></div>
        <div id="response2"></div>
    </div>
  );
}

export default App;
