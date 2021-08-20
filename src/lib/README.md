# virtual-window

For background on this component, [see this Dev.to Article for details](https://dev.to/miketalbot/react-virtual-window-virtualise-anything-for-a-performance-boost-full-tutorial-3moe).

## Installation

```bash
npm i virtual-window
```

## Usage

You can place a Virtual Window over a set of arbitrary
React components by simply wrapping them

```jsx
function MyComponent({ list }) {
  return (
    <VirtualWindow>
      <MyComponent1 />
      {list.map(l => (
        <SomeComponent key={l.id} data={l} />
      ))}
      <MyLastComponent />
    </VirtualWindow>
  )
}
```

You can also use the mode where it is a virtual list, in this
mode you specify a number of parameters

| Parameter | Default       | Purpose                                                                                                                                  |
| --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| item      | Fragment Like | The item that will be used to display this element. This component is passed properties for the item being displayed and the index of it |
