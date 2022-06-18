import { Component } from "react";
// import logo from "./logo.svg"
import "./App.css";
import React from "react";

/**
 * App components contains the entire application
 */
class App extends Component {
    constructor() {
        super();
        this.state = {
            monsters: [],
            searchField: "",
        };
        console.log("Constructor");
    }
    componentDidMount() {
        console.log("ComponentDidMount");
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((users) => {
                this.setState(() => {
                    return { monsters: users };
                });
            });
    }
    onSearchChange = (event) => {
        // doesn't render extra anonamous function every time search is changed
        // Only initializes once when the class component is initialized
        const searchField = event.target.value.toLocaleLowerCase();
        this.setState(() => {
            return { searchField };
        });
    };
    render() {
        console.log("render");
        const { monsters, searchField } = this.state;
        const { onSearchChange } = this;
        const filteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });
        return (
            <div className="App">
                <input className="search-box" type="search" placeholder="search monsters" onChange={onSearchChange} />
                {filteredMonsters.map((monster) => {
                    return (
                        <div key={monster.id}>
                            <h1>{monster.name}</h1>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default App;
