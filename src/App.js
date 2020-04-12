import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import FoodRecognition from './components/foodRecognition/foodRecognition';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import './App.css';


const initialState = {
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

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
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
      fetch('https://fooddetector.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://fooddetector.herokuapp.com/image', {
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
              .catch(console.log)
          }
          this.displayFoodNames(this.getFoodNames(response));
    })
  }; 


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
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