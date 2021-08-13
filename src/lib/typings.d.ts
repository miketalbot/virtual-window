declare module 'virtual-window' {
  declare interface ConfigureInfo {
    expectedSize: number
    scrollingElement: HTMLElement
  }

  declare interface VirtualWindowProps {
    list?: any[],
    totalCount?: number,
    item?: JSX.Element,
    pass?: string,
    children?: JSX.Element[],
    itemSize?: number,
    overscan?: number,
    keyFn?: (data: any) => string | number,
    onConfigure: (info: ConfigureInfo) => void,
    onVisibleChanged: (firstVisibleIndex?: number, lastVisibleIndex?: number) => void
  }

  declare interface Size {
    width: number
    height: number
    element: HTMLElement
  }

  declare function VirtualWindow(props: VirtualWindowProps): JSX.Element

  declare function useMeasurement(): [size: Size, attach: (target: HTMLElement|null|any)=>void, current: HTMLElement]


}
