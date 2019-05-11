import React, {Fragment} from 'react'
import {circleTypes} from './Nodes'

export const Grid = (props: {
  width: number
  height: number
  marginBottom: number
  marginLeft: number
}) => {
  const {width, height, marginBottom, marginLeft} = props
  const mapHeight = height - marginBottom
  const mapWidth = width - marginLeft
  const columnWidth = mapWidth / 4
  const axisOvershoot = 45
  return (
    <g id="grid">
      <g id="legend">
        <text x={marginLeft + 70} y="2em" textAnchor="middle" fontWeight="bold">
          Legend
        </text>
        {Object.keys(circleTypes).map((key: string, i: number) => {
          const {r, width, stroke, fill} = circleTypes[key]
          return (
            <Fragment>
              <circle
                cx={marginLeft + 50}
                cy={`${3 + i}em`}
                fill={fill}
                stroke={stroke}
                r={r}
                strokeWidth={width}
              />
              <text x={marginLeft + 70} y={`${3 + i}em`} textAnchor="start">
                {key}
              </text>
            </Fragment>
          )
        })}
      </g>
      <g id="lines">
        <line
          x1={marginLeft}
          y1={-axisOvershoot}
          x2={marginLeft}
          y2={mapHeight + axisOvershoot}
          stroke="black"
        />
        <line
          x1={marginLeft + columnWidth}
          y1={-axisOvershoot}
          x2={marginLeft + columnWidth}
          y2={mapHeight + axisOvershoot}
          stroke="black"
          strokeDasharray="5,5"
        />
        <line
          x1={marginLeft + 2 * columnWidth}
          y1={-axisOvershoot}
          x2={marginLeft + 2 * columnWidth}
          y2={mapHeight + axisOvershoot}
          stroke="black"
          strokeDasharray="5,5"
        />
        <line
          x1={marginLeft + 3 * columnWidth}
          y1={-axisOvershoot}
          x2={marginLeft + 3 * columnWidth}
          y2={mapHeight + axisOvershoot}
          stroke="black"
          strokeDasharray="5,5"
        />
        <line
          x1={marginLeft - axisOvershoot}
          y1={mapHeight}
          x2={width}
          y2={mapHeight}
          stroke="black"
        />
      </g>
      <g id="value chain" transform={`translate(0,${mapHeight}) rotate(270)`}>
        <text x="10" y={marginLeft - 5} textAnchor="start">
          Invisible
        </text>
        <text
          x={mapHeight / 2}
          y={marginLeft - 5}
          textAnchor="middle"
          fontWeight="bold"
        >
          Value Chain
        </text>
        <text x={mapHeight - 10} y={marginLeft - 5} textAnchor="end">
          Visible
        </text>
      </g>
      <g id="Evolution" transform={`translate(0,${mapHeight})`}>
        <text x={marginLeft + columnWidth / 2} y="1em" textAnchor="middle">
          Genesis
        </text>
        <text x={marginLeft + columnWidth / 2} y="2em" textAnchor="middle">
          &nbsp;(+ novel)
        </text>
        <text x={marginLeft + columnWidth / 2} y="3em" textAnchor="middle">
          &nbsp;(+ unpredictable)
        </text>
        <text x={marginLeft + 1.5 * columnWidth} y="1em" textAnchor="middle">
          &nbsp;Custom
        </text>
        <text x={marginLeft + 1.5 * columnWidth} y="2em" textAnchor="middle">
          &nbsp;(+ emerging)
        </text>
        <text x={marginLeft + 1.5 * columnWidth} y="3em" textAnchor="middle">
          &nbsp;(+ growing understanding)
        </text>
        <text x={marginLeft + 2.5 * columnWidth} y="1em" textAnchor="middle">
          &nbsp;Product
        </text>
        <text x={marginLeft + 2.5 * columnWidth} y="2em" textAnchor="middle">
          &nbsp;(+ good)
        </text>
        <text x={marginLeft + 2.5 * columnWidth} y="3em" textAnchor="middle">
          &nbsp;(+ growing confidence)
        </text>
        <text x={marginLeft + 3.5 * columnWidth} y="1em" textAnchor="middle">
          &nbsp;Utility
        </text>
        <text x={marginLeft + 3.5 * columnWidth} y="2em" textAnchor="middle">
          &nbsp;(+ best)
        </text>
        <text x={marginLeft + 3.5 * columnWidth} y="3em" textAnchor="middle">
          &nbsp;(+ defined / measurable)
        </text>
        <text x={mapWidth / 2} y="4.5em" textAnchor="middle" fontWeight="bold">
          Evolution / Maturity
        </text>
      </g>
    </g>
  )
}
