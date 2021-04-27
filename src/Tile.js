import React from 'react'

function Tile(props) {
    if (props.value !== -1) {
        return (
            <button onClick={props.handle} style={props.styles}>{props.value}</button>
        )
    } else {
        return (
            <div style={props.styles}></div>
        )
    }
}
  
export default Tile;