import React, {PureComponent} from 'react'
import * as d3 from 'd3'
import * as NodePaths from './simple-data.json'

type AppProps = {
  height: number
  width: number
}

type Bubble = {x: number; y: number}

class App extends PureComponent<AppProps> {
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
      .force('charge_force', d3.forceManyBody().strength(-80))
      .force('gravity', d3.forceY(250))

    const link_force = d3
      .forceLink(NodePaths.links)
      .id((d: any) => d.name)
      .distance(() => 50)

    simulation.force('links', link_force)

    const svg = d3
      .select(this.svgEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(NodePaths.nodes as any)
      .enter()
      .append('g')

    // Circles
    node
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'red')

    // Labels
    node
      .append('text')
      .text((d: any) => d.name)
      .attr('x', 6)
      .attr('y', 3)

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(NodePaths.links)
      .enter()
      .append('line')
      .style('stroke', '#999')
      .style('stroke-width', 2)

    simulation.on('tick', () => {
      node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')

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
