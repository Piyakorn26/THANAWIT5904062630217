import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import '../Custom.css';
import math from 'mathjs';
import Plot from 'react-plotly.js';
import {Table} from 'antd';

var X,Y,YE,XE,Columns,dataSource;
class MEuler extends Component {
  constructor(props){
    super(props);
    this.state={submitted:false,y:"",h:"",e:"",exact:"",start:"",end:"",showOutput:false};
    X=[];
    Y=[];
    XE=[];
    YE=[];
    Columns=[];
    dataSource=[];
    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.MEuler=this.MEuler.bind(this);
  }
  clear(event){
    event.preventDefault();
    this.setState({submitted:false,y:"",h:"",e:"",exact:"",start:"",end:"",showOutput:false});
    X=[];
    Y=[];
    XE=[];
    YE=[];
    Columns=[];
    dataSource=[];
  }
  handleSubmit(event) {
    let str=this.state.e;
    let c=0;
    for(let i=0;i<str.length;i++){
      if(str[i]==="x"||str[i]==="X"){
        c++;
      }
    }
    if((str.length!==0)&&(c!==0)&&this.state.submitted){
      X=[];
      Y=[];
      XE=[];
      YE=[];
      Columns=[];
      dataSource=[];
      this.MEuler();
      this.setState({submitted:false,showOutput:true});
    }
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({submitted:true});
  }

  initColumns(h) {
    Columns.push(
      {
        title: "x",
        dataIndex: "x",
        key: "x"
      },
      {
        title: "Exact y at h = "+h,
        dataIndex: "exacty",
        key: "exacty"
      },
      {
        title: "y at h = "+h,
        dataIndex: "y",
        key: "y"
      }
    );
  }



  MEuler(event){
    var func=(x,y)=>{
        let scope={x:x,y:y}
        let code=math.compile(this.state.e);
        return code.eval(scope);
      }

      var funcX=(x)=>{
          let scope={x:x}
          let code=math.compile(this.state.exact);
          return code.eval(scope);
        }

        var graph=(start,end,h)=>{
          for(let i=start+h;i<=end;i+=h){
              X.push(i);
              Y.push(funcX(i));
          }
        }


    var y=parseFloat(this.state.y);
    var h=parseFloat(this.state.h);
    var start=parseFloat(this.state.start);
    var end=parseFloat(this.state.end);
    var nextX=start;
    var nextY=y;
    XE.push(start);
    YE.push(y);
    X.push(start);
    Y.push(y);
    for(let i=start;i<end;i+=h){
      let s0=func(nextX,nextY);
      let y1=nextY+s0*h/2;
      let x1=nextX+h/2;
      let sa=func(x1,y1);
      nextY=nextY+sa*h;
      nextX=nextX+h;
      XE.push(nextX);
      YE.push(nextY);
    }
    graph(start,end,h);
    this.initColumns(h.toFixed(2));
    for(let i=0;i<XE.length;i++){
      dataSource.push({x:XE[i],exacty:Y[i],y:YE[i]});
    }

  }
  render() {
    return (

      <div className="columns has-background-black">
                  <div className="column is-2">
                      <a href="#F"><div className="box has-text-centered is-custom">
                          <strong>Equation</strong>
                      </div></a>

                      <br/><br/>
                      <a href="#T"><div className="box has-text-centered is-custom">
                          <strong>Table</strong>
                      </div></a>
                      <br/><br/>
                      <a href="#C"><div className="box has-text-centered is-custom">
                          <strong>Graph</strong>
                      </div></a>
                  </div>
                  <div className="column is-10 is-custom">
                      <form id="F" className="box has-background-dark" onSubmit={this.handleSubmit}>
                          <h1 className="title is-1 has-text-white"><strong>Equation</strong></h1>
                          <hr className="is-divider"/>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    Equation :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="e" type="text" style={{width:"100vh"}} value={this.state.e} onChange={this.handleChange} placeholder="Enter Equation" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    Exact :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="exact" type="text" style={{width:"100vh"}} value={this.state.exact} onChange={this.handleChange} placeholder="Enter Exact" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    y :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="y" type="number" style={{width:"110vh"}} step="any" value={this.state.y} onChange={this.handleChange} placeholder="Enter y" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    Start :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="start" type="number" style={{width:"102vh"}} step="any" value={this.state.start} onChange={this.handleChange} placeholder="Enter Start Point" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    End :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="end" type="number" style={{width:"102vh"}} step="any" value={this.state.end} onChange={this.handleChange} placeholder="Enter End Point" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-large" href="#undefined" >
                                    h :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-primary is-large" name="h" type="number" style={{width:"102vh"}} step="any" value={this.state.h} onChange={this.handleChange} placeholder="Enter h" />
                              </p>
                          </div><br/>
                          <div className="field has-addons">
                              <div className="control">
                                  <input type="submit" value="Submit" className="button is-success is-rounded"/>
                              </div>
                              <div className="control">
                                  <button className="button is-danger is-rounded" onClick={this.clear}>  Reset  </button>
                              </div>
                          </div>
                      </form>
                      {(this.state.showOutput)&&
                          <div>
                          <div className="box has-background-dark" id="T">
                              <h1 className="title is-1 has-text-white">Table</h1>
                              <hr className="is-divider"/>
                              <Table columns={Columns} bordered dataSource={dataSource}
                              bodyStyle={{fontWeight: "bold", fontSize: "16px", color: "white", overflowX: "scroll", border:"2px solid white"}}></Table>
                          </div>
                              <div className="box has-background-dark" id="C">
                                  <h1 className="title is-1 has-text-white">Graph</h1>
                                  <hr className="is-divider"/>
                                  <div>
                                      <Plot
                                          data={[
                                              {
                                                  x:X,
                                                  y:Y,
                                                  type:'scatter'
                                              },
                                              {
                                                  x:XE,
                                                  y:YE,
                                                  type:'scatter'
                                              }
                                          ]}
                                          latout={{width:500,height:300}}
                                      />
                                  </div>
                              </div>

                          </div>
                      }

                  </div>
      </div>
    );
  }
}
export default MEuler;
