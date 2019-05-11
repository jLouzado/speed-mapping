# Speed Mapping

## Purpose

- Creating a Map is Easy, the true test is _Editing_ a Map.
  - These are most of the [tools](https://medium.com/@benmo/wardley-mapping-tools-and-techniques-76ec1bc47bf9) I've already evaluated.
- Introducing **Speed Maps** - Mapping, at the speed of conversation.
- The Project is still in it's infancy, but soon you'll be able to:
  - Add new Nodes and connect existing ones with ease,
  - Rename nodes quickly,
  - Invert Dependencies and many more

## Solution

This Project solves this problem in the following way (for now):

- Map data stored in JSON as an array of Nodes and an array of Links
- D3 to Run a Force-Directed simulation of Nodes where `Source` is Higher and `Target` is lower
  - kind of like this: [Directed Graph with downward-pointing edges](https://ialab.it.monash.edu/webcola/examples/downwardedges.html)

## Setup

- Clone the [speed-mapping](https://github.com/jlouzado/speed-mapping) repo
- run the following:

```
yarn install
yarn start
```

- Check [App.tsx](./App.tsx) for a full list of configurable options and start mapping
  - They're all passed into the `<WardleyChart />` Component
- You'll need to set the following things:
  - Create a file and import data
    - currently it reads from [here](./simple-data.ts)
  - Scaling factor
    - only needs to be increased once the map gets too clustered
- Change the scaling factor if you're map is overshooting the bottom.

## Known Issues

- Currently known issues are listed under [Project-Issues](https://github.com/jlouzado/speed-mapping/issues)
- Workarounds exist for them as well, refer the issues and comment if you have any continuing feedback
- Create a new issue if you find anything not Documented

## Resources for Wardley Mapping

If you're just getting started with Wardley Mapping, I'd recommend the following Resources

- [Crossing the River by Feeling the Stones | Simon Wardley](https://vimeo.com/189984496)
  - Same talk as above, but [15 minute version](https://youtu.be/Ie2KtSU_ndQ)
- [Mapping Maturity: Create context-specific maturity models... | Chris McDermott](https://medium.com/@chrisvmcd/mapping-maturity-create-context-specific-maturity-models-with-wardley-maps-informed-by-cynefin-37ffcd1d315)
  - Found this useful as a practical guide
- [What do Wardley Maps Really map? | Matt Edgar](https://blog.mattedgar.com/2017/08/13/what-do-wardley-maps-really-map-a-settler-writes/)
  - I don't want to pretend that Wardley Mapping is going to solve all your problems,
  - This article is a good reminder that `All models are wrong, but sometimes they're useful`

## Developer Resources

- [Wardley Map in D3](http://mbpfefferle.com/2017/01/11/wardley-map-d3)
- [Force Directed Graph w/ Labels](https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8)
- [3 ways to integrate React and D3](https://frontendcharts.com/react-d3-integrate/)
- [Integrating React and D3](https://spin.atomicobject.com/2017/07/20/d3-react-typescript/)
