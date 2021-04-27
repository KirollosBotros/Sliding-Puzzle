import React from 'react'

function Tile(props) {
    // if the value of this tile is not -1 (valid), display the tile
    if (props.value !== -1) {
        return (
            <button onClick={props.handle} style={props.styles}>{props.value}</button>
        )
    } else {
        // otherwise, display nothing (but still consume the same space as a tile)
        return (
            <div style={props.styles}></div>
        )
    }
}
  
export default Tile;