import React, {PureComponent} from 'react'
import * as d3 from 'd3'
import * as NodePaths from './simple-data.json'

type AppProps = {
  height: number
  width: number
}

type Bubble = {x: number; y: number}

type AppState = {data: Array<Bubble>}

class App extends PureComponent<AppProps, AppState> {
  svgEl: HTMLDivElement | null
  constructor(props: AppProps) {
    super(props)
    this.svgEl = null
  }

  componentDidMount() {
    const {width, height} = this.props
    const simulation = d3
      .forceSimulation()
      .nodes(NodePaths.nodes)
      .force('charge_force', d3.forceManyBody())
      .force('center_force', d3.forceCenter(width / 2, height / 2))

    const svg = d3
      .select(this.svgEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(NodePaths.nodes as any)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'red')

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(NodePaths.links)
      .enter()
      .append('line')
      .style('stroke', '#999')
      .style('stroke-width', 2)

    const link_force = d3.forceLink(NodePaths.links).id((d: any) => d.name)

    simulation.force('links', link_force)

    simulation.on('tick', () => {
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)

      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
    })
  }

  render() {
    const {height, width} = this.props
    return (
      <div
        style={{width, height, border: '1px solid #bada55'}}
        ref={el => (this.svgEl = el)}
      />
    )
  }
}

export default App
