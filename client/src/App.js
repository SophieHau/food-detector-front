import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import FoodRecognition from './components/foodRecognition/foodRecognition';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import './App.css';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '170c850e3cb041068eb526c625cdfc11'
 });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      food: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: 0,
      joined: data.joined
    }})
  }

  getFoodNames = (data) => {
    const clarifaiFoodList = data.outputs[0].data.concepts;
    const foodList = clarifaiFoodList.map(food => {
      return food.name
    })
    return foodList.slice(0,3);
  }; 

  displayFoodNames = (data) => {
    this.setState({food: 'This is ' + data[0] + ' and/or ' + data[1] + ' and/or ' + data[2] + '!'});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FOOD_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        this.displayFoodNames(this.getFoodNames(response))
      .catch(err => {
        console.log(err);
      })
    })
  }; 

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
  render() {
    const {isSignedIn, route, food, imageUrl, user } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank food={food} name={user.name} entries={user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit}/>
              <FoodRecognition imageUrl={imageUrl}/>
            </div> 
          
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={ this.onRouteChange }/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            ) 
        }
      </div>
    );
  };
};

export default App;