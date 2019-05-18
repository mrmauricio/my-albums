import React, { Component } from 'react';
import PropTypes from 'prop-types'	
import {Card, Icon, Row, Col, Modal, Popconfirm, message} from "antd";
import "antd/dist/antd.css";
import './Album.css'

class Album extends Component {

    static propTypes = {
      	artistName: PropTypes.string.isRequired,  
      	albumName: PropTypes.string.isRequired, 
   	  	albumImg: PropTypes.string.isRequired,        
	  	albumYear: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		isFavourite: PropTypes.bool.isRequired,
		ratingValue: PropTypes.string.isRequired,
		favouriteSection: PropTypes.bool,  
		updateFavourite: PropTypes.func.isRequired 
	}    
	
	state = {
		isModalVisible: false,
		ratingIcon: ["", "", "", "", "", ""],
		starClicked: false,
		ratingValue: 0,
		modalOkDisabled: true
	}

	addLocalStorage = (rating) => {
		const currentFavourites = this.addToFavourites(rating)
		console.log(currentFavourites)	
		this.setFavourites(currentFavourites)
		this.updateFavouritesComponent()		
	}

	addToFavourites = (rating) => {
		let favourites = this.getFavourites()
		console.log(favourites)
		favourites = this.removeFavourites(favourites, this.props.id)
		console.log(favourites)
		favourites = [...favourites, {
						artistName: this.props.artistName,
						albumName: this.props.albumName, 
					 	albumImg: this.props.albumImg,
						albumYear: this.props.albumYear,
						id: this.props.id,
						rating: rating
					 }]
		return favourites
	}

	getFavouriteChanges = () => {
		let background = ""
		if(!this.props.favouriteSection){
			background = "#FAFAD2" 
		}

		if(this.props.isFavourite) {
			return {icon: "star",
					style: { color: "#FFD700" },
					theme: "filled",
					background: { background: background },
					className: "",
					modalBackground: {height:"360px", background:"rgb(255, 255, 227)"}
			}
		}else{
			return {icon: "plus-circle",
					style: {},			
					theme: "twoTone", 
					className: "pulse",
					modalBackground: {height:"360px", background:"rgb(248, 251, 255)"}					
			}			
		}
	}

	getFavourites = () => {
		return JSON.parse(localStorage.getItem("favourite"))
	}

    getSectionColor = () => {
        let style = "album--color"
        if(this.props.ratingValue === "1" || this.props.ratingValue === "2"){
            return `${style}-bad`
        }else if(this.props.ratingValue === "3"){
            return `${style}-decent`
        }else{
            return `${style}-good`
        }
	}

	handleFavRemove = (id) => {
		let currentFavourites = this.getFavourites() 
		currentFavourites = this.removeFavourites(currentFavourites, id)
		this.setFavourites(currentFavourites)
		this.updateFavouritesComponent()
		message.success('Album removed successfully');
	}
	
	handleStarClick = (stars) => {
		if(this.state.ratingValue < stars){
			this.handleStarMouseHover(stars, "filled", true)
		}else{ 
			this.setState({ ratingIcon: ["", "", "", "", "", ""] },
							() => this.handleStarMouseHover(stars, "filled", true) )		
		}
		this.setState({ starClicked: true, ratingValue: stars, modalOkDisabled: false })
	}	

	handleStarMouseHover = (star, value, alreadyFavourite) => {
		if(this.state.starClicked === false || alreadyFavourite){
			const ratingIcon = this.state.ratingIcon
			let count = 0;
			const newRating = ratingIcon.map(currentValue => {
				if (count <= star){
					count++
					return value
				}else{
					count++
					if(alreadyFavourite){
						return ""
					}else{
						return currentValue
					}
				}
			})
			this.setState({ ratingIcon: newRating })	
		}
	} 

	handleStarMouseLeave = () => {
		if(this.state.starClicked === false){
			this.setState({ ratingIcon: ["", "", "", "", "", ""] })
		}
	}

	modalShow = () => {
		this.setState({ isModalVisible: true })
		if(this.props.ratingValue !== 0){
			this.handleStarMouseHover(this.props.ratingValue, "filled")
		}
	}

	modalHandleOk = () => {
		if(this.state.ratingValue > 0) {
			this.addLocalStorage(this.state.ratingValue)
		}
		this.setState({ isModalVisible: false })
		setTimeout( () => this.setInitialState(), 500)	
	}

	modalHandleCancel = () => {
		this.setState({ isModalVisible: false })
		setTimeout( () => this.setInitialState(), 500)	
	}	

	removeFavourites = (favourites, currentFavouriteId) => {
		if (favourites.find( fav => fav.id === currentFavouriteId)){
			return favourites.filter( fav => fav.id !== currentFavouriteId)
		}else{
			return favourites
		}
	}

	setFavourites = (currentFavourites) => {
		localStorage.setItem("favourite", JSON.stringify(currentFavourites));
	}

	setInitialState = () => {
		this.setState({ 
			starClicked: false, 
			ratingIcon: ["", "", "", "", "", ""], 
			modalOkDisabled: true
		})		
	}

	updateFavouritesComponent = () => {
		this.props.updateFavourite()
	}

    render(){
		const { Meta } = Card;
		const starRate = ['1','2','3','4','5'];

        return(
          	<div className="album">
				{
					(!this.props.favouriteSection) && (
            			<Card 
							className="album--card"
							style={ this.getFavouriteChanges().background }
						  	size="small"					  
							cover={<img alt={this.props.albumName} 
						  			  	className="album--img" 
						  			  	src={this.props.albumImg} 
						/>}
            			> 
							<Meta
								title={	<span style={{fontWeight:"bold"}}>
								  			{this.props.albumName}
								  		</span>}
								className="album--title"
            			    /> 				
							<Row className="album--font-size-name album--artist-name-fit">
								{this.props.artistName}
							</Row> 
							<Row>
								<Col span={21} className="album--font-size-year">
									{this.props.albumYear}
								</Col>
								<Col span={3} className="album--icon">
									<Icon 
										type={this.getFavouriteChanges().icon} 
										theme={this.getFavouriteChanges().theme}  
										style={this.getFavouriteChanges().style}
										onClick={() => this.modalShow()} 
										className={this.getFavouriteChanges().className}
									/>
								</Col>	
							</Row>
						</Card>  
					)
				}
				{
					(this.props.favouriteSection) && (
						<Row type="flex" justify="center">
							<Col xs={6} sm={6} md={6} lg={6} xl={6} className={`album--card-fav-section-img-div ${this.getSectionColor()}`}> 
								<img alt={this.props.albumName} 
						  			 className="album--card-fav-section-img" 
						  			 src={this.props.albumImg} 
								/>
							</Col>
							<Col xs={16} sm={16} md={16} lg={18} xl={18}>
								<Card 
									className="album--card-fav-section"
									style={ this.getFavouriteChanges().background }
								  	size="small"					  
            					>
									<Row>
										<Col span={21}> 
											<Meta
												title={	<span style={{fontWeight:"bold"}}>
												  			{this.props.albumName}
												  		</span>}
												className="album--title"
            						    	/> 				
										</Col>
										<Col span={1}>
										</Col>
										<Col span={2} className="album--icon-close">
											<Popconfirm
												title="Are you sure you want to remove this album?"
												icon={<Icon type="question-circle-o" style={{ color: "#DC143C" }} />}
  											  	onConfirm={() => this.handleFavRemove(this.props.id)}
  											  	onCancel={() => {}}
  											  	okText="Yes"
  											 	cancelText="No"
  											>
											<Icon 
												type="close-circle" 
												theme="outlined"
												style={{ color:"#DC143C" }}
											/>
											</Popconfirm>
										</Col>
									</Row>
									<Row>
										<Col className="album--font-size-name album--artist-name-fit">
											{this.props.artistName}
										</Col> 
									</Row>
									<Row>
										<Col span={22} className="album--font-size-year">
											{this.props.albumYear}
										</Col>
										<Col span={2} className="album--icon">
											<Icon 
												type={this.getFavouriteChanges().icon} 
												theme={this.getFavouriteChanges().theme}  
												style={this.getFavouriteChanges().style}
												onClick={() => this.modalShow()} 
												className={this.getFavouriteChanges().className}
											/>
										</Col>	
									</Row>
								</Card>  
							</Col>
						</Row>
					)
				}				
				<Modal
        		  	title="Rate Album"
        		  	visible={this.state.isModalVisible}
        		  	onOk={this.modalHandleOk}
					onCancel={this.modalHandleCancel}
					bodyStyle={this.getFavouriteChanges().modalBackground}
					okButtonProps={{ disabled: this.state.modalOkDisabled }}
        		>
					<Row>
						<Col className="album--modal-info">
							{this.props.albumName} | {this.props.artistName}
						</Col>
					</Row>
					<Row>
						<Col className="album--img-modal-div">
							<img 	
								alt={this.props.albumName} 
					  			className="album--img-modal" 
					  			src={this.props.albumImg} 
							/>
						</Col> 
					</Row>
					<Row>
						<Col className="album--stars">						
							{starRate.map( stars =>
								<div className="album--star-wrapper" key={stars}>
									<Icon 
										type="star" 
										style={{ color: "#FFD700" }}
										theme={this.state.ratingIcon[stars]}
										className="album--star-icon"
										onMouseEnter={() => this.handleStarMouseHover(stars, "filled")}
										onMouseLeave={() => this.handleStarMouseLeave()}
										onClick={() => this.handleStarClick(stars)} 	
									/>
								</div>
							)}
						</Col> 		
					</Row>
        		</Modal>				
          	</div>  
        )
    }
}

export default Album
