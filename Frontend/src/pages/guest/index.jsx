import React, { Component, useState, useRef } from 'react';
import { Carousel, Image } from 'antd';
import { circle } from './circle'
class Home extends React.Component {
    contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };

    render()
    {
        return (
            <div>
                <h1>Home</h1>
                <div 
                    style = {{position: 'relative'}}
                >
                    <img
                        style={{ objectFit: 'cover' }} 
                        height='300px' width='100%'
                        src="https://www.securityroundtable.org/wp-content/uploads/2017/08/AdobeStock_112284102.jpeg" alt=""/>
                    <div style = {{
                
                //display:"inline-block",
                position:'absolute',
                backgroundColor: "red",
                borderRadius: "50%",
                width:"300px",
                height:"300px",
                left:-10,
                top:0,
                overflow: 'hidden'}} ></div>
                </div>
                    
            </div>
        )
    }
}

export default Home;