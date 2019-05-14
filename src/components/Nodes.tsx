import React from 'react'
import * as d3 from 'd3'
import {Simulation} from 'd3'
import {Circle, Link} from './wardley-chart'

export type NodeProps = {
  data: Circle[]
  simulation: Simulation<Circle, Link>
}

export type CircleDescription = {
  stroke: string
  width: number
  r: number
  fill: string
}

export const circleTypes: {[key: string]: CircleDescription} = {
  component: {
    r: 5,
    width: 0,
    stroke: '',
    fill: 'red'
  },
  attribute: {
    r: 5,
    width: 2,
    stroke: '#2c3e50',
    fill: '#ecf0f1'
  },
  process: {
    r: 5,
    width: 2,
    stroke: '#34495e',
    fill: '#f1c40f'
  },
  user: {
    r: 7,
    width: 1,
    stroke: 'black',
    fill: '#bdc3c7'
  }
}

class NodeComponent extends React.PureComponent<{node: Circle}> {
  ref: SVGCircleElement | null = null

  componentDidMount() {
    d3.select(this.ref)
      .data<Circle>([this.props.node])
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
  }

  render() {
    const {
      node: {type, name}
    } = this.props
    const circleType = type ? circleTypes[type] : circleTypes['component']
    const labelPositions = [-3, 3, 12]
    return (
      <g
        id={name}
        className="component"
        ref={(ref: SVGCircleElement) => (this.ref = ref)}
      >
        <circle
          r={circleType.r}
          fill={circleType.fill}
          stroke={circleType.stroke}
          strokeWidth={circleType.width}
        />
        <text x={6} y={labelPositions[Math.floor(3 * Math.random())]}>
          {name}
        </text>
      </g>
    )
  }
}

export class Nodes extends React.PureComponent<NodeProps> {
  render() {
    return (
      <g className="nodes">
        {this.props.data.map((node: Circle, index: number) => (
          <NodeComponent key={index} node={node} />
        ))}
      </g>
    )
  }
}
