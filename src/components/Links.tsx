import React from 'react'
import * as d3 from 'd3'
import {Link} from './wardley-chart'
export class Links extends React.PureComponent<{
  data: Link[]
}> {
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
