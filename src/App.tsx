import * as React from 'react'
import WardleyChart, {MapData} from './components/wardley-chart'
import {debounce} from 'typedash'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
import {shouldRefresh} from './helpers/shouldRefresh'

type AppState = {
  width: number
  height: number
  data: MapData
  refreshCount: number
}

export default class App extends React.Component<{}, AppState> {
  socket: SocketIOClient.Socket
  constructor(props: {}) {
    super(props)
    const {height, width} = this.updateDimensions()
    this.state = {height, width, refreshCount: 0, data: {nodes: [], links: []}}
    this.socket = socketIOClient('localhost:4001')

    this.handleChanged = this.handleChanged.bind(this)
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      debounce(this.updateDimensionsInState.bind(this), 200)
    )
    this.socket.on('changed', this.handleChanged)
    axios
      .get('http://localhost:4001/data')
      .then(res => this.setState({data: res.data}))
  }

  handleChanged() {
    console.log('change detected')
    const {refreshCount, data} = this.state
    axios.get('http://localhost:4001/data').then(res =>
      this.setState({
        data: res.data,
        refreshCount: shouldRefresh(res.data, data)
          ? refreshCount + 1
          : refreshCount
      })
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
  updateDimensions() {
    if (window.innerWidth < 500) {
      return {width: 450, height: 800}
    } else {
      const width = window.innerWidth
      const height = window.innerHeight
      return {width, height}
    }
  }

  render() {
    const {width, height, data, refreshCount} = this.state
    return (
      data.nodes.length > 0 && (
        <WardleyChart
          key={refreshCount}
          height={height}
          width={width}
          scaling={18}
          marginLeft={25}
          marginBottom={80}
          data={data}
        />
      )
    )
  }
}
