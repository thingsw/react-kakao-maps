import * as React from "react";

import { MapContext } from "./Map";

export interface MarkerProps {
  markerClusterer?: kakao.maps.MarkerClusterer;
  options: kakao.maps.MarkerOptions;
  onClick?(): void;
  onMouseOver?(): void;
  onMouseOut?(): void;
}

export class Marker extends React.PureComponent<MarkerProps> {
  public static contextType = MapContext;
  public context!: React.ContextType<typeof MapContext>;

  public readonly marker: kakao.maps.Marker;

  constructor(props: MarkerProps) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this.marker = new kakao.maps.Marker(this.props.options);
  }

  public componentDidMount() {
    const { markerClusterer } = this.props;

    if (markerClusterer) {
      markerClusterer.addMarker(this.marker);
    } else {
      const map = this.context;
      this.marker.setMap(map);
    }

    kakao.maps.event.addListener(this.marker, MarkerEvent.click, this._onClick);
    kakao.maps.event.addListener(
      this.marker,
      MarkerEvent.mouseover,
      this._onMouseOver
    );
    kakao.maps.event.addListener(
      this.marker,
      MarkerEvent.mouseout,
      this._onMouseOut
    );
  }

  public componentDidUpdate(prevProps: Readonly<MarkerProps>) {
    const { options } = this.props;
    const prevOptions = prevProps.options;

    if (prevOptions !== options) {
      if (
        typeof options.altitude !== "undefined" &&
        prevOptions.altitude !== options.altitude
      ) {
        this.marker.setAltitude(options.altitude);
      }
      if (
        typeof options.clickable !== "undefined" &&
        prevOptions.clickable !== options.clickable
      ) {
        this.marker.setClickable(options.clickable);
      }
      if (
        typeof options.draggable !== "undefined" &&
        prevOptions.draggable !== options.draggable
      ) {
        this.marker.setDraggable(options.draggable);
      }
      if (
        typeof options.image !== "undefined" &&
        prevOptions.image !== options.image
      ) {
        this.marker.setImage(options.image);
      }
      if (
        typeof options.map !== "undefined" &&
        prevOptions.map !== options.map
      ) {
        this.marker.setMap(options.map);
      }
      if (
        typeof options.opacity !== "undefined" &&
        prevOptions.opacity !== options.opacity
      ) {
        this.marker.setOpacity(options.opacity);
      }
      if (prevOptions.position !== options.position) {
        this.marker.setPosition(options.position);
      }
      if (
        typeof options.range !== "undefined" &&
        prevOptions.range !== options.range
      ) {
        this.marker.setRange(options.range);
      }
      if (
        typeof options.title !== "undefined" &&
        prevOptions.title !== options.title
      ) {
        this.marker.setTitle(options.title);
      }
      if (
        typeof options.zIndex !== "undefined" &&
        prevOptions.zIndex !== options.zIndex
      ) {
        this.marker.setZIndex(options.zIndex);
      }
    }
  }

  public componentWillUnmount() {
    const { markerClusterer } = this.props;
    if (markerClusterer) {
      markerClusterer.removeMarker(this.marker);
    }

    kakao.maps.event.removeListener(
      this.marker,
      MarkerEvent.click,
      this._onClick
    );
    kakao.maps.event.removeListener(
      this.marker,
      MarkerEvent.mouseover,
      this._onMouseOver
    );
    kakao.maps.event.removeListener(
      this.marker,
      MarkerEvent.mouseout,
      this._onMouseOut
    );
    this.marker.setMap(null);
  }

  public render() {
    return null;
  }

  private _onClick() {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  private _onMouseOut() {
    const { onMouseOut } = this.props;
    if (onMouseOut) {
      onMouseOut();
    }
  }

  private _onMouseOver() {
    const { onMouseOver } = this.props;
    if (onMouseOver) {
      onMouseOver();
    }
  }
}

enum MarkerEvent {
  click = "click",
  mouseover = "mouseover",
  mouseout = "mouseout"
}
