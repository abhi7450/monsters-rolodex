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

    render() {
        console.log("render");
        const filteredMonsters = this.state.monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(this.state.searchField);
        });
        return (
            <div className="App">
                <input
                    className="search-box"
                    type="search"
                    placeholder="search monsters"
                    onChange={(event) => {
                        const searchField = event.target.value.toLocaleLowerCase();
                        this.setState(() => {
                            return { searchField };
                        });
                    }}
                />
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
