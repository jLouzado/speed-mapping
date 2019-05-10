import React from 'react'
import ReactDOM from 'react-dom'
import WardleyChart from './wardley-chart'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<WardleyChart height={1000} width={800} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
