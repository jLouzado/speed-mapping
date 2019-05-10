import React, {Fragment} from 'react'
import {circleTypes} from './Nodes'

export const Grid = (props: {width: number; height: number}) => {
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
      <g id="legend">
        <text x={3.5 * leftPad} y="2em" textAnchor="middle" fontWeight="bold">
          Legend
        </text>
        {Object.keys(circleTypes).map((key: string, i: number) => {
          const {r, width, stroke, fill} = circleTypes[key]
          return (
            <Fragment>
              <circle
                cx={2.5 * leftPad}
                cy={`${3 + i}em`}
                fill={fill}
                stroke={stroke}
                r={r}
                strokeWidth={width}
              />
              <text x={4.5 * leftPad} y={`${3 + i}em`} textAnchor="start">
                {key}
              </text>
            </Fragment>
          )
        })}
      </g>
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
        <line x1="0" y1="0" x2={mapWidth} y2="0" stroke="black" />
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
          Evolution / Maturity
        </text>
      </g>
    </g>
  )
}
