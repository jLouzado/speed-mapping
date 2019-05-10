import React, {PureComponent} from 'react'
import * as d3 from 'd3'
import * as NodePaths from './simple-data.json'
import {Simulation} from 'd3'

type AppProps = {
  height: number
  width: number
}

export type Circle = {name: string; fx?: number; fy?: number; maturity?: number}

export type Link = {source: string; target: string}

class WardleyChart extends PureComponent<AppProps> {
  svgEl: SVGSVGElement | null
  simulation: Simulation<Circle, Link>
  constructor(props: AppProps) {
    super(props)
    this.svgEl = null
    this.simulation = d3
      .forceSimulation<Circle>()
      .nodes(NodePaths.nodes)
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
    this.simulation.nodes(NodePaths.nodes).on('tick', () => {
      if (this.simulation === null) return
      const alpha = this.simulation.alpha()
      node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
      // Drift each node horizontally to it's maturity
      node.each((d: any) => {
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
          <Nodes data={NodePaths.nodes} simulation={this.simulation} />
        </svg>
      </div>
    )
  }
}

class Links extends React.PureComponent<{data: Link[]}> {
  ref: SVGGElement | null = null

  componentDidMount() {
    const {data} = this.props
    const container = d3.select(this.ref)
    container
      .selectAll('line')
      .data<Link>(data)
      .enter()
      .append('line')
      .style('stroke', '#7f8c8d')
      .style('stroke-width', 1)
  }

  render() {
    return <g className="links" ref={(ref: SVGGElement) => (this.ref = ref)} />
  }
}

export type NodeProps = {data: Circle[]; simulation: Simulation<Circle, Link>}

class Nodes extends React.PureComponent<NodeProps> {
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

const Grid = (props: {width: number; height: number}) => {
  const {width, height} = props
  const bottomPad = 80
  const mapHeight = height - bottomPad
  const leftPad = 25
  const mapWidth = width - leftPad
  const markCustom = mapWidth / 4
  const markProduct = markCustom * 2
  const markCommodity = markCustom * 3
  return (
    <g id="grid">
      <g id="value chain" transform={`translate(0,${mapHeight}) rotate(270)`}>
        <line
          x1="-3em"
          y1={leftPad}
          x2={mapHeight}
          y2={leftPad}
          stroke="black"
        />
        <text x="10" y="1.25em" textAnchor="start">
          Invisible
        </text>
        <text
          x={mapHeight / 2}
          y="1.25em"
          textAnchor="middle"
          fontWeight="bold"
        >
          Value Chain
        </text>
        <text x={mapHeight - 10} y="1.25em" textAnchor="end">
          Visible
        </text>
        <line
          x1="-3em"
          y1={markCustom}
          x2={mapHeight}
          y2={markCustom}
          stroke="black"
          strokeDasharray="5,5"
        />
        <line
          x1="-3em"
          y1={markCommodity}
          x2={mapHeight}
          y2={markCommodity}
          stroke="black"
          strokeDasharray="5,5"
        />
        <line
          x1="-3em"
          y1={markProduct}
          x2={mapHeight}
          y2={markProduct}
          stroke="black"
          strokeDasharray="5,5"
        />
      </g>
      <g id="Evolution" transform={`translate(0,${mapHeight})`}>
        <line x1="0" y1="0" x2={mapHeight} y2="0" stroke="black" />
        <text x={(leftPad + markCustom) / 2} y="1em" textAnchor="middle">
          Genesis
        </text>
        <text x={(leftPad + markCustom) / 2} y="2em" textAnchor="middle">
          &nbsp;(+ novel)
        </text>
        <text x={(leftPad + markCustom) / 2} y="3em" textAnchor="middle">
          &nbsp;(+ unpredictable)
        </text>
        <text x={(markCustom + markProduct) / 2} y="1em" textAnchor="middle">
          &nbsp;Custom
        </text>
        <text x={(markCustom + markProduct) / 2} y="2em" textAnchor="middle">
          &nbsp;(+ emerging)
        </text>
        <text x={(markCustom + markProduct) / 2} y="3em" textAnchor="middle">
          &nbsp;(+ understanding growing)
        </text>
        <text x={(markProduct + markCommodity) / 2} y="1em" textAnchor="middle">
          &nbsp;Product
        </text>
        <text x={(markProduct + markCommodity) / 2} y="2em" textAnchor="middle">
          &nbsp;(+ good)
        </text>
        <text x={(markProduct + markCommodity) / 2} y="3em" textAnchor="middle">
          &nbsp;(+ education growing)
        </text>
        <text x={(markCommodity + mapWidth) / 2} y="1em" textAnchor="middle">
          &nbsp;Utility
        </text>
        <text x={(markCommodity + mapWidth) / 2} y="2em" textAnchor="middle">
          &nbsp;(+ best)
        </text>
        <text x={(markCommodity + mapWidth) / 2} y="3em" textAnchor="middle">
          &nbsp;(+ well defined / measurable)
        </text>
        <text x={mapWidth / 2} y="4.5em" textAnchor="middle" fontWeight="bold">
          Evolution
        </text>
      </g>
    </g>
  )
}

export default WardleyChart
