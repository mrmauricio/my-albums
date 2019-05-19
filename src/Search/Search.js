import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Input, Icon, Row, Col, Radio, BackTop, Alert, Skeleton, Card, Button } from "antd";
import bands from '../utils/ArtistData'
import Album from '../Album/Album'
import sortBy from 'sort-by'
import "antd/dist/antd.css";
import './Search.css'

class Search extends Component {
    
    static propTypes = {
		updateFavourite: PropTypes.func.isRequired           
    }    

    state = {
        albums: [],
        bands: bands,
        disableButtons: true,
        genre: 'all',
        initialAlbums: [],
        initialGenreAlbums: [],
        query: '',
        searchResults: [],
        searchError: false,
        showAllAlbums: false
    }

    abortController = new AbortController()

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount = () => {
        const genres = this.getGenreList()

        genres
            .map(genre => this.state.bands[genre]
                .map(band => this.getAlbums(band)) 
            )     
    }

    componentDidUpdate = () => {
        if (this.state.initialAlbums.length !== 0 && this.state.disableButtons !== false){
            this.disableButtons(false)
        }
    }

    componentWillUnmount = () => {
        this.abortController.abort()
    }

    disableButtons = () => {
        this.setState({ disableButtons: false })
    }

    filterGenre = () => {
        let filteredAlbums;

        if (this.state.genre !== 'all'){           
            filteredAlbums = this.state.albums.filter( album => {
                const genre = this.state.genre
                const genreArtists = this.state.bands[genre]
                if (genreArtists.find(genreArtist => genreArtist === album.artistName)){
                    return album
                }else{
                    return false
                }
            })
            return filteredAlbums
        }else{
            filteredAlbums = this.state.albums
            return filteredAlbums
        }
    }

    filterResults = (query) => {
        if(query) {
            const filteredAlbums = this.filterGenre()
            console.log(filteredAlbums)

            const searchResults = filteredAlbums.filter( album => {
                const albumName = ` ${album.albumName.toLowerCase()}`;
                const artistName = ` ${album.artistName.toLowerCase()}`
                const searchedTerm = query.toLowerCase();

                return albumName.includes(` ${searchedTerm}`) ||
                       artistName.includes(` ${searchedTerm}`) 
            })
            const sortedResults = this.sortArray(searchResults)
            console.log(sortedResults)
            const searchResultsId = this.getArrayOfIds(sortedResults)

            if(searchResults.length) {
                this.setState({ searchResults: searchResultsId })
            } else {
                this.searchResultsError(true);
                this.searchResultsClear();
            }
        }
        else{
			this.searchResultsClear();
			this.searchResultsError(false);
		}
    }

    getAlbumById = (id) => {
        return this.state.albums.find(album => album.id === id)
    }

    getAlbums = (band) => {
        fetch(`https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=${band}`, {signal: this.abortController.signal})
        .then(response => response.json())
        .then(data => {
            console.log(band)            
            console.log(data)
            data.album
            .filter(album => 
                album.strReleaseFormat === "Album" &&
                album.strAlbum &&
                album.strAlbumThumb &&
                album.intYearReleased &&
                album.strArtist &&
                album.idAlbum
            )
            .map(album => 
                this.setState({
                    albums:[...this.state.albums, {
                        albumName: album.strAlbum,
                        albumImg: album.strAlbumThumb,
                        albumYear: album.intYearReleased,
                        artistName: album.strArtist,
                        id: album.idAlbum
                    }]
                })
            )     
        })
        .then( () => this.setInitialAlbums() )
        .catch(error => {
            console.log(band + " error")
            if (error.name === 'AbortError') return // expected, this is the abort, so just return
            throw error 
          })        
    }

    getArrayOfIds = (array) => {
        return array.map(result => result.id)
    }    

    getArtistsRandomAlbum = () => {
        const artistRandomAlbum = []
        const bands = this.getGenreList().map( genre => this.state.bands[genre])
        bands.map( bandsArray => 
            bandsArray.map( bandName => {
                const bandAlbums = this.state.albums.filter( album => album.artistName === bandName)
                const randomNumber = Math.floor((Math.random() * bandAlbums.length) + 1)
                const randomAlbum = bandAlbums[randomNumber - 1]
                if(randomAlbum){
                    artistRandomAlbum.push(randomAlbum)
                }
                return true
            })
        )
        return artistRandomAlbum
    }    

    getGenreList = () => {
        return Object.keys(this.state.bands)
    }

    handleRadioGroup = (event) => {
        this.setState({ genre: event.target.value}, 
                      () => {this.filterResults(this.state.query);
                             this.setInitialGenreAlbums();})	
        this.getArtistsRandomAlbum();
    }

    isFavouriteAlbum = (id) => {
        const favourites = JSON.parse(localStorage.getItem("favourite"))
        const album = favourites.find(fav => fav.id === id)
        if(album){
            return {fav: true, rating: album.rating}
        }else{
            return {fav: false}
        }
    }

    listAvailableArtists = (genre) => {
        let artists = this.state.bands[genre].sort()
        artists = artists.map(artist => ` ${artist}`)
        return artists
    }

    searchResultsClear = () => {
		this.setState({searchResults: []});
    }

	searchResultsError = (value) => {
		this.setState({searchError: value});
    }    

    setInitialAlbums = () => {
        if(this.state.albums.length > 235 
        && this.state.initialAlbums.length === 0){
            const slicedAlbumArray = this.getArtistsRandomAlbum()
            const albums = this.sortArray(slicedAlbumArray)
            const albumsId = albums.map( album => {
                return album.id  
            })
            this.setState({initialAlbums: albumsId})
        }
    }

    setInitialGenreAlbums = () => { 
        if((this.state.query === '' || this.state.searchError) 
         && this.state.genre !== 'all'){
            const initialAlbums = this.filterGenre()
            console.log(initialAlbums)
            const sortedAlbums = this.sortArray(initialAlbums)
            const initialAlbumsId = this.getArrayOfIds(sortedAlbums)

            this.setState({initialGenreAlbums: initialAlbumsId})
        }
    }

    showAllAlbums = (bool) => {
        console.log(this.state.showAllAlbums)
        this.setState({showAllAlbums: bool}, () =>  console.log(this.state.showAllAlbums))
    }

    sortArray = (array) => {
        const lowerCaseAlbums = array.map( album => {
            const albumTemp = {...album}
            albumTemp.albumName = albumTemp.albumName.toLowerCase()
            return albumTemp
        })
        const albums = lowerCaseAlbums.sort(sortBy('albumName'))
        return albums
    }

    updateQuery = (query) => {
        this.setState({ query: query})	
        console.log(query)

        this.filterResults(query);
    }

    render(){
        const RadioButton = Radio.Button
        const RadioGroup = Radio.Group
        let allAlbums
        
        (!this.state.showAllAlbums) 
        ? (allAlbums = this.state.initialAlbums) 
        : (allAlbums = this.getArrayOfIds(this.sortArray(this.state.albums))) 

        return(
            <div className="search">                
                <header className="search--header">
                    <Link to={'/'}>
                        <Icon className="search--return-btn" type="arrow-left" />
                    </Link>
                </header>
                <main>
                    <div className="search--fixed-bg"></div>
                    <section className="search--menu search--header-gradient">          
                        <Row className="search--category search--font font-roboto-title">
                            Search by artist or album name:
                        </Row>  
                        <Row className="search--input" type="flex" justify="start">
                            <Col xs={24} sm={24} md={18} lg={12} xl={12}>
                                <Input
                                    placeholder={` Search on the category "${this.capitalizeFirstLetter(this.state.genre)}"`}
                                    prefix={<Icon type="search" className="search--icon" />}
                                    value={this.state.query}
                                    onChange={(event) => this.updateQuery(event.target.value)}
                                    disabled={this.state.disableButtons}
                                /> 
                            </Col> 
                        </Row>
                        <Row className="search--category search--font font-roboto-title">
                            Select the genre:
                        </Row>
                        <Row>
                            <RadioGroup onChange={this.handleRadioGroup} defaultValue="all">
                                <RadioButton 
                                    className="search--radio-btn" 
                                    disabled={this.state.disableButtons} 
                                    value="all"
                                > All </RadioButton>                        
                                {this.getGenreList().map( genre => 
                                    <RadioButton 
                                        className="search--radio-btn" 
                                        disabled={this.state.disableButtons} 
                                        key={genre} 
                                        value={genre}
                                    > {this.capitalizeFirstLetter(genre)} </RadioButton>
                                )}
                            </RadioGroup>
                        </Row>
                    </section>
                    <section>
                        {
                            (this.state.searchResults.length !== 0) &&
                            (this.state.query !== "") && (
                                <Row className="search--info">
                                    <Alert 
                                        message={` Found ${this.state.searchResults.length} results for "${this.state.query}" `} 
                                        type="info" 
                                    />
                                </Row>
                            )
                        }{
                            (this.state.searchError) &&
                            (this.state.searchResults.length === 0) && (
                                <div>
                                    <Row className="search--info">
                                        <Alert 
                                            message={` No results were found for "${this.state.query}"`} 
                                            type="error" 
                                        />                   
                                    </Row>
                                    <Row className="search--info-bands search--info-bands-category-block-bands">                            
                                        <Alert  
                                            message="Try searching for one of these artists:" 
                                            type="info" 
                                        />                                       
                                    </Row>    
                                    {
                                        this.getGenreList().map(genre => {
                                            return  <div key={genre}>
                                                        <Col className="search--info-bands-category-block" span={24}>
                                                            <Alert message={`${genre.toUpperCase()}`} type="info" style={{background:"white"}} /> 
                                                        </Col>   
                                                        <Col className="search--info-bands-category-block-bands font-courier" span={24}>
                                                            <Alert message={`${this.listAvailableArtists(genre)}`} type="info" /> 
                                                        </Col>  
                                                    </div>
                                        })
                                    }                                                                                                                                                                                  
                                </div>                                                                
                            )
                        }
                    </section>
                    <section>
                        {
                            (this.state.initialAlbums.length !== 0) && (!this.state.searchError) && 
                            (this.state.genre === "all") && (this.state.query === "") && 
                            (!this.state.showAllAlbums) && ( 
                                <Row className="search--info">
                                    <Alert message={` Showing ${this.state.initialAlbums.length} of ${this.state.albums.length} albums `} type="info" />
                                    <Button 
                                        className="search--info-button" 
                                        size="small" 
                                        ghost 
                                        onClick={() => this.showAllAlbums(true)}
                                    > Show all </Button>
                                </Row>
                            )
                        }{
                            (this.state.initialAlbums.length !== 0) && (!this.state.searchError) && 
                            (this.state.genre === "all") && (this.state.query === "") && 
                            (this.state.showAllAlbums) && ( 
                                <Row className="search--info">
                                    <Alert message={` Showing ${this.state.albums.length} of ${this.state.albums.length} albums `} type="info" />
                                    <Button 
                                        className="search--info-button" 
                                        size="small" 
                                        ghost 
                                        onClick={() => this.showAllAlbums(false)}
                                    > Show less </Button>
                                </Row>
                            )
                        }{
                            (this.state.searchResults.length === 0) &&
                            (!this.state.searchError) && 
                            (this.state.genre !== "all") && ( 
                                <Row className="search--info">
                                    <Alert message={` Found ${this.state.initialGenreAlbums.length} ${this.capitalizeFirstLetter(this.state.genre)} albums `} type="info" />
                                </Row>    
                            )                         
                        }
                        <div className="search--results-group">
                            {
                                (this.state.initialAlbums.length === 0) && (
                                    <Row type="flex" justify="center">
                                        {this.state.bands.rock.map( (band) => {
                                            return  <Card 
                                                        key={band}
                                                        className="album--card"                    				  
                                                    >
                                                        <Skeleton active/> 
                                                    </Card>  

                                        })}
                                    </Row> 
                                )
                            }{
                                (this.state.searchResults.length === 0) &&
                                (!this.state.searchError) && 
                                (this.state.genre !== "all") && (                                
                                    <Row type="flex" justify="center"> 
                                        {this.state.initialGenreAlbums.map(albumId => {
                                            const album = this.getAlbumById(albumId);
                                            return <Album
                                                albumImg={album.albumImg}
                                                albumName={album.albumName}
                                                artistName={album.artistName}
                                                albumYear={album.albumYear}
                                                key={albumId}
                                                id={albumId}
                                                isFavourite={this.isFavouriteAlbum(albumId).fav}
                                                ratingValue={(this.isFavouriteAlbum(albumId).fav) ? (this.isFavouriteAlbum(albumId).rating) : "0"}
                                                updateFavourite={this.props.updateFavourite}
                                            />
                                        })}
                                    </Row>
                                )               
                            }{
                                (this.state.searchResults.length === 0) &&
                                (!this.state.searchError) && 
                                (this.state.genre === "all") && ( 
                                    <Row type="flex" justify="center"> 
                                        {allAlbums.map(albumId => {
                                            const album = this.getAlbumById(albumId);
                                            return <Album
                                                albumImg={album.albumImg}
                                                albumName={album.albumName}
                                                artistName={album.artistName}
                                                albumYear={album.albumYear}
                                                key={albumId}
                                                id={albumId}
                                                isFavourite={this.isFavouriteAlbum(albumId).fav}
                                                ratingValue={(this.isFavouriteAlbum(albumId).fav) ? (this.isFavouriteAlbum(albumId).rating) : "0"}
                                                updateFavourite={this.props.updateFavourite}
                                            />
                                        })}
                                    </Row>
                                )               
                            }{                        
                                (this.state.searchResults !== []) && (
                                    <Row type="flex" justify="center">
                                        {this.state.searchResults.map(albumId => {
                                            const album = this.getAlbumById(albumId);
                                            return <Album
                                                albumImg={album.albumImg}
                                                albumName={album.albumName}
                                                artistName={album.artistName}
                                                albumYear={album.albumYear}
                                                key={album.id}
                                                id={albumId}
                                                isFavourite={this.isFavouriteAlbum(albumId).fav}
                                                ratingValue={(this.isFavouriteAlbum(albumId).fav) ? (this.isFavouriteAlbum(albumId).rating) : "0"}
                                                updateFavourite={this.props.updateFavourite}
                                            />
                                        })}
                                    </Row>
                                )
                            } 
                        </div>                                              
                    </section>
                    <BackTop>
                        <div className="search--backtop">
                            <Icon type="arrow-up" />
                        </div>
                    </BackTop>
                </main> 
            </div>
        )
    }

}

export default Search
