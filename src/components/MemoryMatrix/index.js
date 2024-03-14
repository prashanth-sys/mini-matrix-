import {Component} from 'react'
import {FaArrowLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import RulesModal from '../RulesModel'
import './index.css'

class MemoryMatrix extends Component {
  state = {
    highlightedIndices: [],
    clickedIndex: null,
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  }

  componentDidMount() {
    this.getGridButtons()
    this.intervalId = setInterval(this.getGridButtons, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getGridButtons = () => {
    const {array} = this.state
    const myArray = array
    const shuffledArray = myArray.sort(() => Math.random() - 0.5)
    const slicedArray = shuffledArray.slice(0, 3)
    console.log(slicedArray)
    this.setState({highlightedIndices: slicedArray}, () => {
      setTimeout(() => {}, 3000)
    })

    console.log('New grid buttons:', slicedArray)
  }

  toggleModel = () => {
    this.setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
    }))
  }

  onClickCell = index => {
    clearInterval(this.intervalId)
    const {highlightedIndices} = this.state
    const isMatch = highlightedIndices.includes(index + 1)

    if (isMatch) {
      console.log('matched')
      this.setState({clickedIndex: index})
    } else {
      console.log('not matched')
    }
  }

  render() {
    const {highlightedIndices, clickedIndex, isModelOpen} = this.state

    return (
      <div className="memory-matrix-container">
        <div className="game-rules-container">
          <Link to="/memory/matrix" className="link">
            <button type="button" className="back-button">
              <FaArrowLeft className="icon" />
              <p className="back">Back</p>
            </button>
          </Link>
          <RulesModal isOpen={isModelOpen} onClose={this.toggleModel} />
          <button
            type="button"
            className="rules-button"
            onClick={this.toggleModel}
          >
            Rules
          </button>
        </div>
        <h1 className="game-heading">Memory Matrix</h1>
        <div className="level-container">
          <p className="level">Level-1</p>
          <p className="level">Max Level-00</p>
        </div>
        <div className="game-container">
          {Array.from({length: 9}, (_, index) => (
            <button
              key={index}
              type="button"
              className={`button ${
                highlightedIndices.includes(index + 1) ? 'highlight' : ''
              } ${clickedIndex === index ? 'clicked' : ''}`}
              onClick={() => this.onClickCell(index)}
            >
              {_}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default MemoryMatrix
