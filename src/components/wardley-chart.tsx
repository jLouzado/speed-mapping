import React, {PureComponent} from 'react'
import * as d3 from 'd3'
import {Simulation} from 'd3'
import {Grid} from './Grid'
import {Nodes} from './Nodes'
import {Links} from './Links'

export type MapData = {
  nodes: Circle[]
  links: Link[]
}

type AppProps = {
  height: number
  width: number
  scaling: number
  marginLeft: number
  marginBottom: number
  data: MapData
}

export type NodeType = 'component' | 'process' | 'attribute' | 'user'

export type Circle = {
  name: string
  type?: NodeType
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
      .nodes(props.data.nodes)
      .force(
        'links',
        d3
          .forceLink(props.data.links)
          .id((d: any) => d.name)
          .distance(60)
      )
  }

  componentDidMount() {
    const {width, scaling, marginLeft, data} = this.props
    const node = d3.select('.nodes').selectAll('.component')
    const link = d3.select('.links').selectAll('line')
    this.simulation.nodes(data.nodes).on('tick', () => {
      if (this.simulation === null) return
      const alpha = this.simulation.alpha()
      node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
      // Drift each node horizontally to it's maturity
      node.each((d: any) => {
        if (d.root) {
          d.x = marginLeft + (width - marginLeft) / 2
          d.y = 50
        } else if (d.maturity) {
          d.x = d.x + (width * (d.maturity / 100) - d.x + marginLeft) * alpha
        }
      })

      const k = scaling * alpha
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
    const {height, width, marginLeft, marginBottom, data} = this.props

    return (
      <div style={{width, height}}>
        <svg
          width={width}
          height={height}
          ref={el => (this.svgEl = el)}
          fontFamily="Fira Sans"
        >
          <Grid
            width={width}
            height={height}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
          />
          <Links data={data.links} />
          <Nodes data={data.nodes} simulation={this.simulation} />
        </svg>
      </div>
    )
  }
}

export default WardleyChart
