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
  const markCustom = mapWidth / 4
  const markProduct = markCustom * 2
  const markCommodity = markCustom * 3
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
      <g id="value chain" transform={`translate(0,${mapHeight}) rotate(270)`}>
        <line
          x1={-axisOvershoot}
          y1={marginLeft}
          x2={mapHeight}
          y2={marginLeft}
          stroke="black"
        />
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
        <line
          x1={-axisOvershoot}
          y1={marginLeft + markCustom}
          x2={mapHeight}
          y2={marginLeft + markCustom}
          stroke="black"
          strokeDasharray="5,5"
        />
        <line
          x1={-axisOvershoot}
          y1={marginLeft + markCommodity}
          x2={mapHeight}
          y2={marginLeft + markCommodity}
          stroke="black"
          strokeDasharray="5,5"
        />
        <line
          x1={-axisOvershoot}
          y1={marginLeft + markProduct}
          x2={mapHeight}
          y2={marginLeft + markProduct}
          stroke="black"
          strokeDasharray="5,5"
        />
      </g>
      <g id="Evolution" transform={`translate(0,${mapHeight})`}>
        <line
          x1={marginLeft - axisOvershoot}
          y1="0"
          x2={width}
          y2="0"
          stroke="black"
        />
        <text x={marginLeft + markCustom / 2} y="1em" textAnchor="middle">
          Genesis
        </text>
        <text x={marginLeft + markCustom / 2} y="2em" textAnchor="middle">
          &nbsp;(+ novel)
        </text>
        <text x={marginLeft + markCustom / 2} y="3em" textAnchor="middle">
          &nbsp;(+ unpredictable)
        </text>
        <text
          x={marginLeft + (markCustom + markProduct) / 2}
          y="1em"
          textAnchor="middle"
        >
          &nbsp;Custom
        </text>
        <text
          x={marginLeft + (markCustom + markProduct) / 2}
          y="2em"
          textAnchor="middle"
        >
          &nbsp;(+ emerging)
        </text>
        <text
          x={marginLeft + (markCustom + markProduct) / 2}
          y="3em"
          textAnchor="middle"
        >
          &nbsp;(+ growing understanding)
        </text>
        <text
          x={marginLeft + (markProduct + markCommodity) / 2}
          y="1em"
          textAnchor="middle"
        >
          &nbsp;Product
        </text>
        <text
          x={marginLeft + (markProduct + markCommodity) / 2}
          y="2em"
          textAnchor="middle"
        >
          &nbsp;(+ good)
        </text>
        <text
          x={marginLeft + (markProduct + markCommodity) / 2}
          y="3em"
          textAnchor="middle"
        >
          &nbsp;(+ growing confidence)
        </text>
        <text
          x={marginLeft + (markCommodity + mapWidth) / 2}
          y="1em"
          textAnchor="middle"
        >
          &nbsp;Utility
        </text>
        <text
          x={marginLeft + (markCommodity + mapWidth) / 2}
          y="2em"
          textAnchor="middle"
        >
          &nbsp;(+ best)
        </text>
        <text
          x={marginLeft + (markCommodity + mapWidth) / 2}
          y="3em"
          textAnchor="middle"
        >
          &nbsp;(+ defined / measurable)
        </text>
        <text x={mapWidth / 2} y="4.5em" textAnchor="middle" fontWeight="bold">
          Evolution / Maturity
        </text>
      </g>
    </g>
  )
}
