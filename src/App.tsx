import * as React from 'react'
import WardleyChart from './components/wardley-chart'
import {debounce} from 'typedash'

type AppState = {width: number; height: number}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      debounce(this.updateDimensionsInState.bind(this), 200)
    )
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.updateDimensionsInState.bind(this)
    )
  }

  updateDimensionsInState() {
    this.setState(this.updateDimensions())
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions(): AppState {
    if (window.innerWidth < 500) {
      return {width: 450, height: 800}
    } else {
      const width = window.innerWidth
      const height = window.innerHeight
      return {width, height}
    }
  }

  render() {
    const {width, height} = this.state
    return <WardleyChart height={height} width={width} scaling={5} />
  }
}
