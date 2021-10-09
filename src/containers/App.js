import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

class App extends Component {
    constructor () {
        super() // calls constructor method of App component
        this.state = { // App Component (parent) now owns state with (2) states
            robots: [], // state #1 is passed down as a 'prop' to the robots child component;
            searchField: '' // state #2 is passed down as a 'prop' to the search box child component
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users') // fetch user list
        .then(response => response.json()) // convert response to a json object
        .then(users => this.setState({ robots: users })); // pass results of users to robots state
    }

    // custom function to capture events on search field
    onSearchChange = (event) => {
        this.setState({searchField: event.target.value}) // set state by passing value from search field.
    }
    
    // filter input values then pass values to CardList component and render changes to DOM on screen
    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => { // filter input values and set to lower case to avoid case comparison issues
            return robot.name.toLowerCase().includes(searchField.toLowerCase());  // filter to only "include" what is in the search field and compare robot name with what search field value
        })
        // if statement used to account for delay in return of user data above. We are using the ternary syntax instead
        return !robots.length ?
        <h1>Loading...</h1> :
            (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary> 
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;