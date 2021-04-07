import React, { Component, Fragment } from 'react';
import { withSnackbar } from 'react-simple-snackbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import axios from 'axios';

const DataCard = ({ data }) => (
  <div className="menu_list">
    <div className="menu_txt">
      <div lass="na">
      <h2>mission name: {data.mission_name}</h2><h2>flight_number: {data.flight_number}</h2> <h2>launch_year: {data.launch_year}</h2> <h2>details: {data.details}</h2>
      <h2>rocket id: {data.rocket.rocket_id}</h2> <h2>rocket name: {data.rocket.rocket_name}</h2> <h2>rocket tpye: {data.rocket.rocket_type}</h2><h2>static fire data  unix: {data.static_fire_date_unix}</h2><h2>static fire date utc: {data.static_fire_date_utc}</h2>
      <h2>launch window: {data.launch_window}</h2> <h2>tentative max precision: {data.tentative_max_precision}</h2>
      
{
data.mission_id.map((m)=>{
    <h3>{m}</h3>
})
}
    </div>
  </div>
  </div>
);

const getAllData = async (url='') => {
  try {
    const response = await axios.get(`https://api.spacexdata.com/v3/launches${url}`);
    return response.data;
  } catch (e) {
    if (e.message.includes(404)) 
      return { body: [] };
    return { error: true };
  }
};

class ListingData extends Component {
  state = {
    Data: [],
    year: null,
    limit:null,
    successfulLanding: null,
    successfulLaunch: null,
    years:[],
    limits:[25,50,100]
  };

  componentDidMount() {
    getAllData().then((res) => {
      if (res.error) return this.props.openSnackbar('Unable to load Data. Try again later!');
      this.setState({ Data: res });
      return this.props.openSnackbar('Data fetched successfully');
    });
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    this.setState({years:range(currentYear, 2002, -1)})
    console.log(this.state);  
  }

  handleChange = (e) =>{
    if(e.target.name === 'year' && e.target.value !== 'all'){
      this.setState({year:e.target.value});   
    }
    if(e.target.name === 'limit' && e.target.value !== 'all'){
      this.setState({limit:e.target.value});  
    }
    console.log(e)
    if(e.target.name === 'landing_success'){
      this.setState({successfulLanding:e.target.value});  
    }
    if(e.target.name === 'launch_success'){
      this.setState({successfulLaunch:e.target.value});  
    }
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let url = '?';
    if(this.state.year){
      if(url !== '?')
        url += '&launch_year='+ this.state.year;
      else
        url += 'launch_year='+this.state.year;      
    }
    if(this.state.limit){
      if(url !== '?')
        url += '&limit='+ this.state.limit;
      else
        url += 'limit='+ this.state.limit;    
    }
    if(this.state.successfulLanding){
      if(url !== '?')
        url += '&land_success='+ this.state.successfulLanding;
      else
        url += 'land_success='+ this.state.successfulLanding;    
    }
    if(this.state.successfulLaunch){
      if(url !== '?')
        url += '&launch_success='+ this.state.successfulLaunch;
      else
        url += 'launch_success='+ this.state.successfulLaunch;    
    }
    getAllData(url).then((res) => {
      if (res.error) return this.props.openSnackbar('Unable to load Data. Try again later!');
      this.setState({ Data: res });
      return this.props.openSnackbar('Data fetched successfully');
    });
  }
  render() {
    const { Data, year, successfulLanding,successfulLaunch, years, limit,limits } = this.state;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>

            <div className="col-md-10">
              <div className="menu_box">
                <h3>Launch details</h3>
              </div>
              {(
                <form onSubmit={this.handleSubmit}>
                  <div style={{ justifyContent: 'flex-end' }} className="form-row">
                    <div className="form-group col-md-3">
                      <label>Year</label>
                      <select
                        style={{ textTransform: 'capitalize' }}
                        name="year"
                        onChange={this.handleChange}
                        className="form-control"
                        value={year}
                      >
                      <option value="all">All</option>
                        {years && years.map((each,index) => (
                          <option
                            key={index}
                            style={{ textTransform: 'capitalize' }}
                            value={each}
                          >
                            {each}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Limit</label>
                      <select
                        style={{ textTransform: 'capitalize' }}
                        name="limit"
                        onChange={this.handleChange}
                        className="form-control"
                        value={limit}
                      >
                      <option value="all">All</option>
                        {limits && limits.map((each,index) => (
                          <option
                            key={index}
                            style={{ textTransform: 'capitalize' }}
                            value={each}
                          >
                            {each}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Successful Landing</label>
                      <input className="form-control" type="checkbox" onChange={this.handleChange} name="landing_success" value="true" />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Successful Launch</label>
                      <input className="form-control" type="checkbox" onChange={this.handleChange} name="launch_success" value="true" />
                    </div>
                    <div className="form-group col-md-2">
                      <button style={{  color: 'white',
                                        border: '2px solid salmon',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        padding: '7px',
                                        borderRadius: '4px',
                                        backgroundColor:'#f85353',
                                        height:'42px',
                                        marginTop:'28px'
                                    }} type='submit'>Apply</button>
                    </div>
                  </div>
                </form>
              )}
              {this.state.Data && this.state.Data.length!==0 ? this.state.Data
                .map((data) => (
                  <DataCard
                    key={data.id}
                    data={data}
                  />
                )):(
                  <p>No Records Found</p>
                )
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withSnackbar(ListingData);