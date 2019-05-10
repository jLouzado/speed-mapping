import * as React from 'react'
import WardleyChart from './wardley-chart'

export default class App extends React.Component {
  render() {
    return <WardleyChart height={1000} width={800} />
  }
}
