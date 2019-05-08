import React, {PureComponent} from 'react'
import * as d3 from 'd3'
import './App.css'

function getData() {
  let numItems = 20 + Math.floor(20 * Math.random())
  let data = []
  for (let i = 0; i < numItems; i++) {
    data.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random(),
      colour: i % 5
    })
  }
  return data
}

const colours = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

type AppProps = {
  height: number
  width: number
}

type Bubble = {x: number; y: number; r: number; colour: number}

type AppState = {data: Array<Bubble>}

class App extends PureComponent<AppProps, AppState> {
  svgEl: SVGSVGElement | null
  constructor(props: AppProps) {
    super(props)
    this.svgEl = null
    this.state = {
      data: getData()
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      data: getData()
    })
  }

  componentDidMount() {
    this.updateChart()
  }

  componentDidUpdate() {
    this.updateChart()
  }

  updateChart() {
    if (this.svgEl === null) return null
    const maxRadius = 40
    const xScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.width])
    const yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.height])
    const rScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, maxRadius])

    const u = d3
      .select(this.svgEl)
      .selectAll('circle')
      .data(this.state.data)

    u.enter()
      .append('circle')
      .attr('cx', 0.5 * this.props.width)
      .attr('cy', 0.5 * this.props.height)
      .style('fill', '#fff')
      .merge(u as any)
      .transition()
      .duration(1000)
      .attr('cx', (d: Bubble) => xScale(d.x))
      .attr('cy', (d: Bubble) => yScale(d.y))
      .attr('r', (d: Bubble) => rScale(d.r))
      .style('fill', (d: Bubble) => colours[d.colour])

    u.exit().remove()
  }

  render() {
    return (
      <div className="App">
        <svg
          width={this.props.width}
          height={this.props.height}
          ref={el => (this.svgEl = el)}
        />
        <div>
          <button onClick={this.handleClick}>Update</button>
        </div>
      </div>
    )
  }
}

export default App
