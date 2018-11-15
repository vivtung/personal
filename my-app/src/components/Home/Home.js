import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchAllCars } from '../../actions/CarActions'

//material ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	resultData: [],
    	price: 0,
    	selected_make: "All"
    }
  }

  componentDidMount(){
   this.props.actions.fetchAllCars();
  }

  componentDidUpdate(prevProps){
  	if (this.props.CarStore.get('allCars') != prevProps.CarStore.get('allCars')) {
  		this.setState({
  			resultData: this.props.CarStore.get('allCars')
  		})
  	}
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, () => this.filterData());
  };

  filterData(){
  	let result_data = this.props.CarStore.get('allCars')
  	if (this.state.selected_make !== "All"){
  		// we just need the original set if the selected is "all"
  		result_data = result_data.filter( obj => obj.get("make") === this.state.selected_make );
  	}
  	// looking for any model with a price that is greater than what the user types
		result_data = result_data.filter( obj => obj.get("price") >= this.state.price );


  	this.setState({
  		resultData: result_data
  	})

  }

  renderCar(car, index) {
  	// had to append https to avoid cross origin issue
  	const image_src = "https:" + car.get('photos').first().get('sizes').get('base').get('url')
  	return(
      <Grid item xs={12} md={4} key={index}>
		    <Card className="car-tile">
		      <CardActionArea>
		        <CardMedia
		          image={image_src}
		          className="image-tile"
		          title={car.get('carid')}
		        />
		        <CardContent>
        		<Grid container item spacing={0} justify="center">
		        	<Grid item xs={8}>

		          <Typography gutterBottom variant="h5" component="h2">
		            {car.get('model')} {car.get('model_trim')}
		          </Typography>
		          <Typography component="p">
		          	{car.get('model')} {car.get('mileage')}
		          </Typography>
		          </Grid>
		          <Grid item xs={4} className="car-price">
		          <Typography component="p">
		          	$ {car.get('price')}
		          </Typography>
		          </Grid>
		          </Grid>
		        </CardContent>
		      </CardActionArea>
		      <CardActions>
		        <Button size="small" color="primary">
		          Display Photos
		        </Button>
		      </CardActions>
		    </Card>
      </Grid>
  	)
  }

  renderCars(){
  	let cars = [];
  	const cars_array = this.state.resultData
    for (var i = 0; i < cars_array.size; i++) {
      cars.push(this.renderCar(cars_array.get(i), i));
    }
    return cars;
  }

  renderFilters(){
  	return(
  		<div>
  		<div className="inputField">
      <TextField
        label="Price"
        value={this.state.price}
        onChange={this.handleChange('price')}
        margin="normal"
        variant="filled"
        type="number"
      />
      </div>
  		<div className="inputField">

      <TextField
        id="filled-select-model"
        select
        label="Select a make"
        value={this.state.selected_make}
        onChange={this.handleChange('selected_make')}
        SelectProps={{
          native: true
        }}
        margin="normal"
        variant="filled"
      >
	      <option key="Honda" value="Honda">
	        Honda
	      </option>
	      <option key="Jeep" value="Jeep">
	        Jeep
	      </option>
	      <option key="All" value="All">
	        All
	      </option>
      </TextField>
      </div>
      </div>
  	)
  }

  render() {
  	const cars_array = this.props.CarStore.get('allCars')

    return (
      <div className="container">
      	<div>
      		<Grid container spacing={24}>
      			<Grid item xs={3}>
      				{ this.renderFilters() }
      			</Grid>
      			<Grid item xs={9}>
		      		<Grid container spacing={24}>
		      		{ cars_array.size > 0 && this.renderCars() }
		      		</Grid>
		      		<Grid container spacing={24} className="footer">
		      			<h1 className="footer">
		      				Drive On!
		      			</h1>
		      		</Grid>
      			</Grid>

      		</Grid>
      	</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    CarStore: state.CarStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchAllCars
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

