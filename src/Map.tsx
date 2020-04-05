import * as React from "react";

export const MapContext: React.Context<kakao.maps.Map> = React.createContext(
  {} as kakao.maps.Map
);

export interface MapProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onLoad" | "onClick" | "onDragEnd"
  > {
  minLevel?: number;
  maxLevel?: number;
  options: kakao.maps.MapOptions;
  zoomable?: boolean;
  cursor?: string;
  onBoundChanged?(map: kakao.maps.Map): void;
  onCenterChanged?(map: kakao.maps.Map): void;
  onClick?(e: kakao.maps.event.MouseEvent, map: kakao.maps.Map): void;
  onLoad?(map: kakao.maps.Map): void;
  onZoomChanged?(map: kakao.maps.Map): void;
  onDragEnd?(map: kakao.maps.Map): void;
}

interface State {
  map?: kakao.maps.Map;
}

enum MapEvent {
  bound_changed = "bounds_changed",
  center_changed = "center_changed",
  click = "click",
  zoom_changed = "zoom_changed",
  dragend = "dragend"
}

export class Map extends React.PureComponent<MapProps, State> {
  public state: State = {
    // 주의: 없애면 안 된다.
  };

  constructor(props: MapProps) {
    super(props);
    this.onComponentMount = this.onComponentMount.bind(this);
    this._onBoundChanged = this._onBoundChanged.bind(this);
    this._onCenterChanged = this._onCenterChanged.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onLoad = this._onLoad.bind(this);
    this._onZoomChanged = this._onZoomChanged.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
  }

  public componentDidUpdate(prevProps: Readonly<MapProps>) {
    const { options: prevOptions } = prevProps;
    const { options } = this.props;
    const { map } = this.state;
    if (map) {
      if (!prevOptions.center.equals(options.center)) {
        map.setCenter(options.center);
      }

      if (prevOptions.mapTypeId !== options.mapTypeId) {
        map.setMapTypeId(options.mapTypeId || kakao.maps.MapTypeId.SKYVIEW);
      }

      if (
        typeof this.props.maxLevel !== "undefined" &&
        prevProps.maxLevel !== this.props.maxLevel
      ) {
        map.setMaxLevel(this.props.maxLevel);
      }

      if (
        typeof this.props.minLevel !== "undefined" &&
        prevProps.minLevel !== this.props.minLevel
      ) {
        map.setMinLevel(this.props.minLevel);
      }

      if (
        typeof this.props.zoomable !== "undefined" &&
        prevProps.zoomable !== this.props.zoomable
      ) {
        map.setZoomable(this.props.zoomable);
      }

      if (
        typeof this.props.cursor !== "undefined" &&
        prevProps.cursor !== this.props.cursor
      ) {
        map.setCursor(this.props.cursor);
      }
    }
  }

  public componentWillUnmount() {
    const { map } = this.state;
    if (map) {
      kakao.maps.event.removeListener(
        map,
        MapEvent.bound_changed,
        this._onBoundChanged
      );
      kakao.maps.event.removeListener(
        map,
        MapEvent.center_changed,
        this._onCenterChanged
      );
      kakao.maps.event.removeListener(map, MapEvent.click, this._onClick);
      kakao.maps.event.removeListener(
        map,
        MapEvent.zoom_changed,
        this._onZoomChanged
      );
      kakao.maps.event.removeListener(map, MapEvent.dragend, this._onDragEnd);
    }
    delete this.state.map;
  }

  public render() {
    const { map } = this.state;
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      minLevel,
      maxLevel,
      options,
      zoomable,
      onBoundChanged,
      onCenterChanged,
      onClick,
      onLoad,
      onZoomChanged,
      onDragEnd,
      ...rest
    } = this.props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return (
      <div {...rest} ref={this.onComponentMount}>
        {map ? (
          <MapContext.Provider value={map}>
            {this.props.children}
          </MapContext.Provider>
        ) : null}
      </div>
    );
  }

  private onComponentMount(container: HTMLElement | null) {
    if (container && !this.state.map) {
      kakao.maps.load(() => {
        kakao.maps.disableHD();
        const map = new kakao.maps.Map(container, this.props.options);

        if (this.props.maxLevel) {
          map.setMaxLevel(this.props.maxLevel);
        }

        if (this.props.minLevel) {
          map.setMinLevel(this.props.minLevel);
        }

        if (typeof this.props.zoomable !== "undefined") {
          map.setZoomable(this.props.zoomable);
        }

        if (this.props.cursor) {
          map.setCursor(this.props.cursor);
        }

        kakao.maps.event.addListener(
          map,
          MapEvent.bound_changed,
          this._onBoundChanged
        );
        kakao.maps.event.addListener(
          map,
          MapEvent.center_changed,
          this._onCenterChanged
        );
        kakao.maps.event.addListener(map, MapEvent.click, this._onClick);
        kakao.maps.event.addListener(
          map,
          MapEvent.zoom_changed,
          this._onZoomChanged
        );
        kakao.maps.event.addListener(map, MapEvent.dragend, this._onDragEnd);

        this.setState({ map });

        // daum.map.Map 참조 외부로 전달
        this._onLoad(map);
      });
    }
  }

  private _onBoundChanged() {
    const { onBoundChanged } = this.props;
    const { map } = this.state;
    if (onBoundChanged && map) {
      onBoundChanged(map);
    }
  }

  private _onCenterChanged() {
    const { onCenterChanged } = this.props;
    const { map } = this.state;
    if (onCenterChanged && map) {
      onCenterChanged(map);
    }
  }

  private _onClick(e: kakao.maps.event.MouseEvent) {
    const { onClick } = this.props;
    const { map } = this.state;
    if (onClick && map) {
      onClick(e, map);
    }
  }

  private _onLoad(map: kakao.maps.Map) {
    const { onLoad } = this.props;
    if (onLoad) {
      onLoad(map);
    }
  }

  private _onZoomChanged() {
    const { onZoomChanged } = this.props;
    const { map } = this.state;
    if (onZoomChanged && map) {
      onZoomChanged(map);
    }
  }

  private _onDragEnd() {
    const { onDragEnd } = this.props;
    const { map } = this.state;
    if (onDragEnd && map) {
      onDragEnd(map);
    }
  }
}
