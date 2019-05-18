import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Empty } from "antd";
import Album from '../Album/Album'
import empty from '../images/empty.png'
import "antd/dist/antd.css";
import './Favourite.css'


class Favourite extends Component {

    static propTypes = {
        sectionName: PropTypes.string.isRequired,  
        stars: PropTypes.string.isRequired,    
        favourites: PropTypes.array.isRequired,      
		updateFavourite: PropTypes.func.isRequired           
    }    

    getSectionColor = () => {
        let style = "favourite--section-color"
        if(this.props.stars === "1" || this.props.stars === "2"){
            return `${style}-bad`
        }else if(this.props.stars === "3"){
            return `${style}-decent`
        }else{
            return `${style}-good`
        }
    }

    render(){
        const starRate = [1, 2, 3, 4, 5];
                
        return(
            <section className="favourite--bg-color">
            <div className="favourite--fixed-bg"></div>            
                <Row className={`favourite--section-name ${this.getSectionColor()}`} type="flex" justify="center">
                    <Col xs={24} sm={24} md={12} lg={12} xl={8} className="favourite--font-size font-roboto-title">
                        {this.props.sectionName}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        {
                            starRate
                                .filter( rating => rating <= this.props.stars )
                                .map( rating => <Icon 
                                                    type="star" 
                                                    style={{ color: "#FFD700" }}
                                                    theme="filled"
                                                    className="favourite--star-icon"
                                                    key={rating}
                                                />   
                                )
                        }                        
                    </Col>                     
                </Row>            
                <div className="favourite--group">
                    {
                        (this.props.favourites.length === 0) && ( 
                            <Empty 
                                className="favourite--empty" 
                                image={empty} 
                                imageStyle={{ height: 60 }}
                            />
                        )
                    }{                        
                        (this.props.favourites.length !== 0) && ( 
                            <Row className="favourite--album-div" type="flex" justify="center">   
                                {this.props.favourites.map(album => {
                                    return  <Col xs={24} sm={18} md={12} lg={12} xl={8} key={album.id}>
                                                <Album
                                                    albumImg={album.albumImg}
                                                    albumName={album.albumName}
                                                    artistName={album.artistName}
                                                    albumYear={album.albumYear}
                                                    id={album.id}
                                                    isFavourite={true}
                                                    ratingValue={this.props.stars}
                                                    favouriteSection={true}
                                                    updateFavourite={this.props.updateFavourite}
                                                />
                                            </Col>
                                })}    
                            </Row>
                        )               
                    }                
                </div>
            </section>
        )
    }

}

export default Favourite
