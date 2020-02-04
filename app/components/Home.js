// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;
  constructor(){
    super();
    this.state = {
      CurrValue: '',
      Chg: '',
      ChgPer: ''
    }
  }

   componentDidMount(){
    setInterval(async() => {
      let data = await fetch('https://api.bseindia.com/BseIndiaAPI/api/GetSensexDataN/w');
      data = await data.json();
      this.setState({CurrValue: data.CurrValue});
      this.setState({Chg: data.Chg});
      this.setState({ChgPer: data.ChgPer});
    }, 2000);
  }

  render() {
    return (
      <div style={{height: '38px', backgroundColor: 'black', padding: '9px 15px'}}>
        <span style={{fontWeight: 600, color: '#d8d8d8'}}>BSE SENSEX</span>
        <div style={{marginTop: '3px'}}>
        <strong>{this.state.CurrValue}</strong>
        &nbsp;
        {this.state.Chg[0] === '+' && <strong style={{color: 'rgb(118, 255, 14)', fontWeight: 700, fontFamily: 'Lato Bold'}}>{this.state.Chg}</strong>}&nbsp;
        {this.state.ChgPer[0] === '+' && <strong style={{color: 'rgb(118, 255, 14)', fontWeight: 700, fontFamily: 'Lato Bold'}}>({this.state.ChgPer})</strong>}&nbsp;
        {this.state.Chg[0] === '-' && <strong style={{color: 'rgb(255, 112, 112)', fontWeight: 700, fontFamily: 'Lato Bold'}}>{this.state.Chg}</strong>}&nbsp;
        {this.state.ChgPer[0] === '-' && <strong style={{color: 'rgb(255, 112, 112)', fontWeight: 700, fontFamily: 'Lato Bold'}}>({this.state.ChgPer})</strong>}&nbsp;
        </div>

      </div>
    );
  }
}
