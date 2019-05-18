import React, { Component } from 'react';
import Favourite from '../Favourite/Favourite'

class FavouriteGroup extends Component {

    render(){
        return(
            <div>
   	   		   	<Favourite
					sectionName={'Masterpiece'}
					stars={"5"}
				/>
   	   		   	<Favourite
					sectionName={'4 estrela'}
					stars={"4"}
				/>
   	   		   	<Favourite
					sectionName={'3 estrela'}
					stars={"3"}
				/>
   	   		   	<Favourite
					sectionName={'2 estrela'}
					stars={"2"}
				/>
   	   		   	<Favourite
					sectionName={'1 estrela'}
					stars={"1"}
				/>			        
            </div>
        )
    }

}

export default FavouriteGroup
