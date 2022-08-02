import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
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
    }
    // constructor -> render -> componentDidMount ->setState(render)=>
    // setState will triger render
    // props change will also triger render
    componentDidMount() {
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
        const { monsters, searchField } = this.state;
        console.log("Render from App");
        const { onSearchChange } = this;
        const filteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });
        return (
            <div className="App">
                <SearchBox
                    className="monster-search-box"
                    onChangeHandler={onSearchChange}
                    placeholder="search monsters"
                />
                <CardList monsters={filteredMonsters} />
            </div>
        );
    }
}

export default App;
