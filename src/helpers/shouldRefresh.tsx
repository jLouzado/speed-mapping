import {MapData, Link} from '../components/wardley-chart'

export const shouldRefresh = (oldData: MapData, newData: MapData): boolean => {
  if (oldData.nodes.length !== newData.nodes.length) return true

  return (
    oldData.links.length !== newData.links.length ||
    !oldData.links.every(
      (value: Link, index: number): boolean =>
        value.source === newData.links[index].source &&
        value.target === newData.links[index].target
    )
  )
}
