import React from 'react'
import * as d3 from 'd3'
import {Link} from './wardley-chart'

class LinkComponent extends React.PureComponent<{link: Link}> {
  ref: SVGLineElement | null = null

  componentDidMount() {
    d3.select(this.ref).data([this.props.link])
  }

  render() {
    return (
      <line
        ref={(ref: SVGLineElement) => (this.ref = ref)}
        stroke="#7f8c8d"
        strokeWidth={1}
      />
    )
  }
}
export class Links extends React.PureComponent<{
  data: Link[]
}> {
  render() {
    return (
      <g className="links">
        {this.props.data.map((link: Link, index: number) => (
          <LinkComponent key={index} link={link} />
        ))}
      </g>
    )
  }
}
