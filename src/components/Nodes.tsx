import React from 'react'
import * as d3 from 'd3'
import {Simulation} from 'd3'
import {Circle, Link} from './wardley-chart'
export type NodeProps = {
  data: Circle[]
  simulation: Simulation<Circle, Link>
}
export class Nodes extends React.PureComponent<NodeProps> {
  ref: SVGGElement | null = null
  componentDidMount() {
    const {data} = this.props
    const container = d3.select(this.ref)
    const nodes = container
      .selectAll('g')
      .data<Circle>(data)
      .enter()
      .append('g')
      .attr('class', 'component')
      .attr('id', (d: any) => d.name)
      .on('click', (target: any) => {
        // Redraw the clicked node on top
        d3.select(`#${target.name}`)
          .raise()
          .classed('active', true)
        // Highlight connected links
        d3.select('.links')
          .selectAll('line')
          .style('stroke', (link: any) =>
            link.source.name === target.name
              ? '#3498db'
              : link.target.name === target.name
              ? '#16a085'
              : '#bdc3c7'
          )
          .style('stroke-width', (link: any) =>
            link.source.name === target.name || link.target.name === target.name
              ? 1.5
              : 0.8
          )
      })
    // Circles
    nodes
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'red')
    // Labels
    const yPositions = [-3, 3, 12]
    nodes
      .append('text')
      .text((d: any) => d.name)
      .attr('x', 6)
      .attr('y', () => yPositions[Math.floor(3 * Math.random())])
  }
  render() {
    return <g className="nodes" ref={(ref: SVGGElement) => (this.ref = ref)} />
  }
}
