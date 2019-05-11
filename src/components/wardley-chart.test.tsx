import React from 'react'
import ReactDOM from 'react-dom'
import WardleyChart from './wardley-chart'

const data = {
  nodes: [{name: 'A', root: true}, {name: 'B'}, {name: 'C'}],
  links: [{source: 'A', target: 'B'}, {source: 'B', target: 'C'}]
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <WardleyChart
      height={1000}
      width={800}
      scaling={18}
      marginLeft={25}
      marginBottom={80}
      data={data}
    />,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
