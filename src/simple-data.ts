import {NodeType} from './components/wardley-chart'

const COMPONENT: NodeType = 'component'
const USER: NodeType = 'user'
const PROCESS: NodeType = 'process'
const ATTRIBUTE: NodeType = 'attribute'

export const NodePaths = {
  nodes: [
    {
      name: 'user',
      root: true,
      type: USER
    },
    {
      name: 'needs',
      type: COMPONENT,
      maturity: 70
    },
    {
      name: 'd11-app',
      maturity: 40
    },
    {
      name: 'build-right-thing',
      type: PROCESS,
      maturity: 50
    },
    {
      name: 'product-quality',
      type: ATTRIBUTE,
      maturity: 20
    },
    {
      name: 'execution-speed',
      maturity: 65
    }
  ],
  links: [
    {
      source: 'user',
      target: 'needs'
    },
    {
      source: 'needs',
      target: 'd11-app'
    },
    {
      source: 'd11-app',
      target: 'build-right-thing'
    },
    {
      source: 'd11-app',
      target: 'build-right-thing'
    },
    {
      source: 'build-right-thing',
      target: 'product-quality'
    },
    {
      source: 'execution-speed',
      target: 'build-right-thing'
    }
  ]
}
