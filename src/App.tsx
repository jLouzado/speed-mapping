import React, {PureComponent} from 'react'
import * as d3 from 'd3'
import * as NodePaths from './simple-data.json'

type AppProps = {
  height: number
  width: number
}

type Circle = {name: string; fx?: number; fy?: number; maturity?: number}

type Link = {source: string; target: string}

class App extends PureComponent<AppProps> {
  svgEl: SVGSVGElement | null
  constructor(props: AppProps) {
    super(props)
    this.svgEl = null
  }

  componentDidMount() {
    const {width, height} = this.props

    const svg = d3
      .select(this.svgEl)
      .attr('width', width)
      .attr('height', height)

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data<Link>(NodePaths.links)
      .enter()
      .append('line')
      .style('stroke', '#999')
      .style('stroke-width', 2)

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data<Circle>(NodePaths.nodes)
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

    const simulation = d3
      .forceSimulation()
      .nodes(NodePaths.nodes)
      .force(
        'links',
        d3
          .forceLink(NodePaths.links)
          .id((d: any) => d.name)
          .distance(60)
      )

    simulation.on('tick', () => {
      const alpha = simulation.alpha()
      node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
      // Drift each node horizontally to it's maturity
      node.each((d: any) => {
        if (d.maturity) {
          const next = d.x + (width * (d.maturity / 100) - d.x) * alpha
          d.x = next
        }
      })

      const k = 25 * alpha
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
    const bottomPad = 80
    const mapHeight = height - bottomPad
    const leftPad = 25
    const mapWidth = width - leftPad
    var custMark = mapWidth / 4
    var prodMark = custMark * 2
    var commMark = custMark * 3
    var visMark = mapHeight / 2

    return (
      <div style={{width, height}}>
        <svg ref={el => (this.svgEl = el)} fontFamily="Fira Sans">
          <g id="grid">
            <g
              id="value chain"
              transform={`translate(0,${mapHeight}) rotate(270)`}
            >
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
                x={visMark}
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
                y1={custMark}
                x2={mapHeight}
                y2={custMark}
                stroke="black"
                strokeDasharray="5,5"
              />
              <line
                x1="-3em"
                y1={commMark}
                x2={mapHeight}
                y2={commMark}
                stroke="black"
                strokeDasharray="5,5"
              />
              <line
                x1="-3em"
                y1={prodMark}
                x2={mapHeight}
                y2={prodMark}
                stroke="black"
                strokeDasharray="5,5"
              />
            </g>
            <g id="Evolution" transform={`translate(0,${mapHeight})`}>
              <line x1="0" y1="0" x2={mapHeight} y2="0" stroke="black" />
              <text x={(leftPad + custMark) / 2} y="1em" textAnchor="middle">
                Genesis
              </text>
              <text x={(leftPad + custMark) / 2} y="2em" textAnchor="middle">
                &nbsp;(+ novel)
              </text>
              <text x={(leftPad + custMark) / 2} y="3em" textAnchor="middle">
                &nbsp;(+ unpredictable)
              </text>
              <text x={(custMark + prodMark) / 2} y="1em" textAnchor="middle">
                &nbsp;Custom
              </text>
              <text x={(custMark + prodMark) / 2} y="2em" textAnchor="middle">
                &nbsp;(+ emerging)
              </text>
              <text x={(custMark + prodMark) / 2} y="3em" textAnchor="middle">
                &nbsp;(+ understanding growing)
              </text>
              <text x={(prodMark + commMark) / 2} y="1em" textAnchor="middle">
                &nbsp;Product
              </text>
              <text x={(prodMark + commMark) / 2} y="2em" textAnchor="middle">
                &nbsp;(+ good)
              </text>
              <text x={(prodMark + commMark) / 2} y="3em" textAnchor="middle">
                &nbsp;(+ education growing)
              </text>
              <text x={(commMark + mapWidth) / 2} y="1em" textAnchor="middle">
                &nbsp;Utility
              </text>
              <text x={(commMark + mapWidth) / 2} y="2em" textAnchor="middle">
                &nbsp;(+ best)
              </text>
              <text x={(commMark + mapWidth) / 2} y="3em" textAnchor="middle">
                &nbsp;(+ well defined / measurable)
              </text>
              <text
                x={mapWidth / 2}
                y="4.5em"
                textAnchor="middle"
                fontWeight="bold"
              >
                Evolution
              </text>
            </g>
          </g>
        </svg>
      </div>
    )
  }
}

export default App
