import React from 'react';

export default class circle extends React.Component {
    style = {
        padding:10,
        margin:20,
        //display:"inline-block",
        // position:'absolute',
        backgroundColor: "red",
        borderRadius: "50%",
        width:100,
        height:100,
        left:0,
        top:0
    }

    render () {
        return (
            <div style = {{padding:10,
                margin:20,
                //display:"inline-block",
                // position:'absolute',
                backgroundColor: "red",
                borderRadius: "50%",
                width:100,
                height:100,
                left:0,
                top:0}} ></div>
        )
    }
}