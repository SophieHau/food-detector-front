import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import FoodRecognition from './components/foodRecognition/foodRecognition';
import Signin from './components/signin/signin';
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
    }
  }

  getFoodNames = (data) => {
    const clarifaiFoodList = data.outputs[0].data.concepts;
    const foodList = clarifaiFoodList.map(food => {
      return food.name
    })
    return foodList.slice(0,3);
  }; 

  displayFoodNames = (data) => {
    console.log(data);
    this.setState({food: 'This is ' + data[0] + ' or ' + data[1] + ' or ' + data[2] + '!'});
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
      .then(response => this.displayFoodNames(this.getFoodNames(response)))
      .catch(err => {
        console.log(err);
      })
  }; 
  
  render() {
    return (
      <div className="App">
        <Navigation />
        <Signin />
        <Logo />
        <Rank food={this.state.food}/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onSubmit={this.onSubmit}/>
        <FoodRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  };
};

export default App;