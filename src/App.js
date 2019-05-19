import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Favourite from './Favourite/Favourite'
import Search from './Search/Search'
import { setInitialData } from './utils/InitialData'
import { Icon, BackTop } from "antd";
import logo from './images/logo.png'
import './App.css'
import "antd/dist/antd.css";

class App extends Component {

    state = {
        favourites: []
    }
	
	componentDidMount = () => {
        setInitialData()
        this.updateFavourite()
	}

	filterFavourites = (favourites, rating) => {
        return favourites.filter(fav => fav.rating === rating)		
	}

	getFavourites = () => {
		const favourites = JSON.parse(localStorage.getItem("favourite"))
		this.setState({favourites: favourites}, () => console.log(this.state.favourites))
	}

	updateFavourite = () => {
        this.getFavourites()
	}
	
	render() {
		const starRate = ['1','2','3','4','5'];

		return (
   	 		<div className='app font-roboto'>				
   	   			<Route path={'/search'} render={() => (
					<Search
						updateFavourite={this.updateFavourite}	
					/>
   	   			)}/>     	
				<Route exact path={'/'} render={() => (  
					<div>
						<header className="app--header">
							<div className="app--add">
								<Link to='/search'>
									<Icon type="plus-circle" theme="filled" className="app--icon" style={{color:"white"}}/>									
   	         					</Link> 	
							</div>					
							<div>
								<img className="app--logo" src={ logo } alt="my albums"/>														
							</div>	
						</header>
						<main>											
							<Favourite
								sectionName={'Masterpiece'}
								favourites={this.filterFavourites(this.state.favourites, starRate[4])}
								updateFavourite={this.updateFavourite}
								stars={starRate[4]}
							/>
   	   		   				<Favourite
								sectionName={'Amazing'}
								favourites={this.filterFavourites(this.state.favourites, starRate[3])}
								updateFavourite={this.updateFavourite}						
								stars={starRate[3]}
							/>
   	   		   				<Favourite
								sectionName={'Decent'}
								favourites={this.filterFavourites(this.state.favourites, starRate[2])}
								updateFavourite={this.updateFavourite}						
								stars={starRate[2]}
							/>
   	   		   				<Favourite
								sectionName={'Bad'}
								favourites={this.filterFavourites(this.state.favourites, starRate[1])}
								updateFavourite={this.updateFavourite}						
								stars={starRate[1]}
							/>
   	   		   				<Favourite
								sectionName={'Terrible'}
								favourites={this.filterFavourites(this.state.favourites, starRate[0])}	
								updateFavourite={this.updateFavourite}						
								stars={starRate[0]}
							/>	
                    		<BackTop>
                    		    <div className="app--backtop">
                    		        <Icon type="arrow-up" />
                    		    </div>
                    		</BackTop>											
						</main>											
					</div>
   	   			)}/>
				<footer className="app--footer">
					<p> My Albums  -  2019 </p>
				</footer>	
			</div>
		);
	}
}

export default App;
