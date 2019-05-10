import * as React from 'react'
import WardleyChart from './wardley-chart'

export default class App extends React.Component<
  {},
  {width: number; height: number}
> {
  constructor(props: {}) {
    super(props)
    this.state = {
      width: 800,
      height: 1024
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    if (window.innerWidth < 500) {
      this.setState({width: 450, height: 800})
    } else {
      const width = window.innerWidth - 100
      const height = window.innerHeight - 100
      this.setState({width, height})
    }
  }

  render() {
    const {width, height} = this.state
    return <WardleyChart height={height} width={width} />
  }
}
