import React from 'react'
import Tile from './Tile.js'

class Board extends React.Component {
    state = {
      arr: [[1, 2, 3], 
            [4, 5, 6], 
            [7, 8, -1]]
    }

    // checks to see if -1 is adjacent to arr[i][j]
    swappable = (arr, i, j) => {
      if ((i + 1 < 3 && arr[i + 1][j] === -1) ||
          (i - 1 >= 0 && arr[i - 1][j] === -1) ||
          (j + 1 < 3 && arr[i][j + 1] === -1) ||
          (j - 1 >= 0 && arr[i][j - 1] === -1)) {
            return true
          }
      return false
    }

    // swaps the elements of arr[i][j] and -1
    swap = (arr, i, j) => {
      let newArr = arr
      for (var a = 0; a < 3; ++a) {
        for (var b = 0; b < 3; ++b) {
          if (arr[a][b] === -1) {
            newArr[a][b] = arr[i][j]
            newArr[i][j] = -1
            a = b = 10
            break
          }
        }
      }
      this.setState({arr: newArr})
    }

    // called when a button is clicked
    handleClick = (index) => {
        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < 3; ++j) {
                // find the indices of the button that was clicked
                if (this.state.arr[i][j] === index){
                    // if the button that was clicked is adjacent to -1, swap
                    if (this.swappable(this.state.arr, i, j)) {
                    this.swap(this.state.arr, i, j)
                    i = j = 10
                    break
                    }
                }
            }
        }
    }

    // dynamic styling: fill all buttons at each index except the -1 element
    getStyle = (i) => {
      return {
        background: i !== -1 ? 'rgb(196, 118, 118)' : 'rgb(255, 255, 255)',
        border: i !== -1 ? ('1px solid rgb(0, 0, 0)'): null,
        textAlign: 'center',
        float: 'left',
        fontSize: '48px',
        lineHeight: '30px',
        height: '100px',
        width: '100px'
      }
    }

    // display tile on the screen
    displayTile = (i) => {
        return (
          <Tile 
            value={i}
            styles={this.getStyle(i)}
            handle={() => {
              this.handleClick(i)
            }} 
          />
        )
    }

    // called when the scramble button is clicked, shuffles the matrix
    handleScramble = () => {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, -1]
      var currentIndex = array.length, temporaryValue, randomIndex;
      // function to shuffle array, from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      let tempArr = this.state.arr
      var count = 0
      for (var i = 0; i < 3; ++i) {
        for (var j = 0; j < 3; ++j) {
          tempArr[i][j] = array[count++]
        }
      }
      this.setState({arr: tempArr})
    }

    render() {
        // styling for each row of the board
        const rowStyle = {
            clear: 'both',
            content: "",
            display: 'table'
        }

        // styling for the scramble button
        const buttonStyle = {
            marginTop: '30px',
            backgroundColor: '#10a1c9',
            border: 'none',
            textAlign: 'center',
            fontSize: '22px',
            display: 'inline-block',
            padding: '15px 32px'
        }

        // display 9 tiles, 3 on each row
        var rows = []
        for (var i = 0; i < 3; ++i) {
            rows.push(
                <div style={rowStyle} key={i}>
                    {this.displayTile(this.state.arr[i][0])}
                    {this.displayTile(this.state.arr[i][1])}
                    {this.displayTile(this.state.arr[i][2])}
                </div>
            )
        }
        return (
        <div>
            {rows}
            <button onClick={this.handleScramble} style={buttonStyle}>Scramble</button>
        </div>
        )
    }
}

export default Board;