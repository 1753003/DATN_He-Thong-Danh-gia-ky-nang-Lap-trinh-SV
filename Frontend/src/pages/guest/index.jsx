import React, { Component, useState, useRef } from 'react';
import { Row, Col, Button } from 'antd';
import { circle } from './circle'
class Home extends React.Component {
    render()
    {
        return (
            <div>
                <div 
                    style = {{position: 'relative'}}
                >
                    <img
                        style={{ objectFit: 'cover' }} 
                        height='350px' width='100%'
                        src="https://www.securityroundtable.org/wp-content/uploads/2017/08/AdobeStock_112284102.jpeg" alt=""/>
                    <div style = {{
                        position:'absolute',
                        backgroundColor: '#011730',
                        borderRadius: "50%",
                        width:"400px",
                        height:"400px",
                        left:-40,
                        top:50,                 
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: '40px',
                        fontWeight: 'bolder',
                        color: 'white',
                        paddingLeft: 80,
                        paddingRight: 20}}>
                            <p>Training & Testing your <span style = {{color: '#4AD5CF'}}>coding</span> level</p>
                    </div>
                </div>
                <div className = 'students' style = {{
                    marginTop: 100
                }}>
                    <Row>
                        <Col span={10} style={{position:"relative"}}>
                            <div style={{position: 'absolute', top: '25%', left: '20px' }}>
                                    <div
                                        style = {{
                                            fontSize: '30px',
                                            color:'#011730',
                                            fontWeight: 'bold'
                                        }}>
                                        For students - developers
                                    </div>
                                    <div
                                        style = {{
                                            fontSize: '20px',
                                            color:'#011730',
                                            fontWeight: '500'
                                        }}>
                                        We provide you with a multitude of tests on different fields to train your programming abilities
                                    </div>
                                    <Button style = 
                                    {{backgroundColor:'#011730',
                                      borderRadius: '10%',
                                      marginTop: '10px',
                                      color:'white',
                                      fontSize: '20px',
                                      height: '40px'
                                      }}>More</Button>
                            </div>
                        </Col>
                        <Col span={14} style={{position:"relative"}}>
                            <div style = {{
                                backgroundColor: '#4AD5CF',
                                borderRadius: "50%",
                                width:"400px",
                                height:"400px",
                                
                            }}>
                                <img
                                style={{ objectFit: 'cover', position: 'absolute', top: '15%', left: '10%' }} 
                                width='90%'
                                height='280px'
                                src="https://www.securityroundtable.org/wp-content/uploads/2017/08/AdobeStock_112284102.jpeg" alt=""/>
                                
                            </div>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col span={14} style = {{position: 'relative', marginTop: '90px'}}>
                            <div style = {{
                                width:"400px",
                                height:"400px",
                                
                            }}>
                                <div
                                    style = {{
                                        backgroundColor: '#315EA0',
                                        borderRadius: "50%",
                                        width:"400px",
                                        height:"400px",
                                        position: 'absolute',
                                        right: 0      
                                    }}
                                ></div>
                                <img
                                    style={{ objectFit: 'cover', position: 'absolute', top: '15%', left: '-10%' }} 
                                    width='100%'
                                    height='280px'
                                    src="https://www.securityroundtable.org/wp-content/uploads/2017/08/AdobeStock_112284102.jpeg" alt=""/>
                            </div>
                        </Col>
                        <Col span={10} style={{position:"relative"}}>
                            <div style={{position: 'absolute', top: '35%', left: '20px' }}>
                                    <div
                                        style = {{
                                            fontSize: '30px',
                                            color:'#011730',
                                            fontWeight: 'bold'
                                        }}>
                                        For students - developers
                                    </div>
                                    <div
                                        style = {{
                                            fontSize: '20px',
                                            color:'#011730',
                                            fontWeight: '500'
                                        }}>
                                        We provide you with a multitude of tests on different fields to train your programming abilities
                                    </div>
                            </div>
                        </Col>
                       
                    </Row>
                </div>   
            </div>
            
        )
    }
}

export default Home;