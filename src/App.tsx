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
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge_force', d3.forceManyBody().strength(-90))
      .force('gravity', d3.forceY(50))

    const link_force = d3.forceLink(NodePaths.links).id((d: any) => d.name)

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

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data<Link>(NodePaths.links)
      .enter()
      .append('line')
      .style('stroke', '#999')
      .style('stroke-width', 2)

    simulation.on('tick', () => {
      const alpha = simulation.alpha()
      const k = 50 * alpha
      node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
      node.each((d: any) => {
        if (d.maturity) {
          const next = d.x + (width * (d.maturity / 100) - d.x) * alpha
          d.x = next
        }
      })

      link
        .each((d: any) => {
          d.source.y -= k / 2
          d.target.y += k
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
      <div
        style={{width, height, border: '1px solid #bada55'}}
        ref={el => (this.svgEl = el)}
      />
    )
  }
}

export default App
