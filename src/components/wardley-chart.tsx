import React, {PureComponent} from 'react'
import * as d3 from 'd3'
import * as NodePaths from '../simple-data.json'
import {Simulation} from 'd3'
import {Grid} from './Grid'
import {Nodes} from './Nodes'
import {Links} from './Links'

type AppProps = {
  height: number
  width: number
}

export type Circle = {
  name: string
  type: 'component' | 'process' | 'attribute' | 'user'
  root?: boolean
  fx?: number
  fy?: number
  maturity?: number
}

export type Link = {source: string; target: string}

class WardleyChart extends PureComponent<AppProps> {
  svgEl: SVGSVGElement | null
  simulation: Simulation<Circle, Link>
  constructor(props: AppProps) {
    super(props)
    this.svgEl = null
    this.simulation = d3
      .forceSimulation<Circle>()
      .nodes(NodePaths.nodes as Circle[])
      .force(
        'links',
        d3
          .forceLink(NodePaths.links)
          .id((d: any) => d.name)
          .distance(60)
      )
  }

  componentDidMount() {
    const {width} = this.props
    const node = d3.select('.nodes').selectAll('.component')
    const link = d3.select('.links').selectAll('line')
    this.simulation.nodes(NodePaths.nodes as Circle[]).on('tick', () => {
      if (this.simulation === null) return
      const alpha = this.simulation.alpha()
      node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
      // Drift each node horizontally to it's maturity
      node.each((d: any) => {
        if (d.root) {
          d.x = (width - 25) / 2
          return
        }
        if (d.maturity) {
          const next = d.x + (width * (d.maturity / 100) - d.x) * alpha
          d.x = next
        }
      })

      const k = 18 * alpha
      link
        // Use each link to drift each node vertically
        .each((d: any) => {
          d.source.y -= k
          d.target.y += k * 2
        })
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
    })
  }

  render() {
    const {height, width} = this.props

    return (
      <div style={{width, height}}>
        <svg
          width={width}
          height={height}
          ref={el => (this.svgEl = el)}
          fontFamily="Fira Sans"
        >
          <Grid width={width} height={height} />
          <Links data={NodePaths.links} />
          <Nodes
            data={NodePaths.nodes as Circle[]}
            simulation={this.simulation}
          />
        </svg>
      </div>
    )
  }
}

export default WardleyChart
