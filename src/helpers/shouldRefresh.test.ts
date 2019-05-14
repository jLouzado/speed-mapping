import {shouldRefresh} from './shouldRefresh'

it('should return true if newNodes have more nodes', () => {
  expect(
    shouldRefresh({nodes: [], links: []}, {nodes: [{name: 'A'}], links: []})
  ).toEqual(true)
})
it('should return true if oldNodes had more nodes', () => {
  expect(
    shouldRefresh({nodes: [{name: 'A'}], links: []}, {nodes: [], links: []})
  ).toEqual(true)
})
it('should return if newData has more links', () => {
  expect(
    shouldRefresh(
      {nodes: [], links: []},
      {nodes: [], links: [{source: 'A', target: 'B'}]}
    )
  ).toEqual(true)
})
it('should return if newData has less links', () => {
  expect(
    shouldRefresh(
      {nodes: [], links: [{source: 'A', target: 'B'}]},
      {nodes: [], links: []}
    )
  ).toEqual(true)
})
it('should return true if newData has same number of links but different connections', () => {
  expect(
    shouldRefresh(
      {nodes: [], links: [{source: 'A', target: 'B'}]},
      {nodes: [], links: [{source: 'B', target: 'A'}]}
    )
  ).toEqual(true)
})
it('should return false if node count is same and links remain unchanged', () => {
  expect(
    shouldRefresh(
      {
        nodes: [{name: 'A', root: true}, {name: 'B'}],
        links: [{source: 'A', target: 'B'}]
      },
      {
        nodes: [{name: 'A', root: true}, {name: 'B'}],
        links: [{source: 'A', target: 'B'}]
      }
    )
  ).toEqual(false)
})
