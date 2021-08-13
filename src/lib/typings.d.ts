declare module "virtual-window" {
  interface ConfigureInfo {
    expectedSize: number
    scrollingElement: HTMLElement
  }

  interface VirtualWindowProps {
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

  interface Size {
    width: number
    height: number
    element: HTMLElement
  }

  function VirtualWindow(props: VirtualWindowProps): JSX.Element

  function useMeasurement(): [size: Size, attach: (target: HTMLElement | null | any) => void, current: HTMLElement]


}
