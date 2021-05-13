import * as React from "react";
import { MapContext } from "./Map";
export class Marker extends React.PureComponent {
    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
        this._onMouseOver = this._onMouseOver.bind(this);
        this.marker = new kakao.maps.Marker(this.props.options);
    }
    componentDidMount() {
        const { markerClusterer } = this.props;
        if (markerClusterer) {
            markerClusterer.addMarker(this.marker);
        }
        else {
            const map = this.context;
            this.marker.setMap(map);
        }
        kakao.maps.event.addListener(this.marker, MarkerEvent.click, this._onClick);
        kakao.maps.event.addListener(this.marker, MarkerEvent.mouseover, this._onMouseOver);
        kakao.maps.event.addListener(this.marker, MarkerEvent.mouseout, this._onMouseOut);
    }
    componentDidUpdate(prevProps) {
        const { options } = this.props;
        const prevOptions = prevProps.options;
        if (prevOptions !== options) {
            if (typeof options.altitude !== "undefined" &&
                prevOptions.altitude !== options.altitude) {
                this.marker.setAltitude(options.altitude);
            }
            if (typeof options.clickable !== "undefined" &&
                prevOptions.clickable !== options.clickable) {
                this.marker.setClickable(options.clickable);
            }
            if (typeof options.draggable !== "undefined" &&
                prevOptions.draggable !== options.draggable) {
                this.marker.setDraggable(options.draggable);
            }
            if (typeof options.image !== "undefined" &&
                prevOptions.image !== options.image) {
                this.marker.setImage(options.image);
            }
            if (typeof options.map !== "undefined" &&
                prevOptions.map !== options.map) {
                this.marker.setMap(options.map);
            }
            if (typeof options.opacity !== "undefined" &&
                prevOptions.opacity !== options.opacity) {
                this.marker.setOpacity(options.opacity);
            }
            if (prevOptions.position !== options.position) {
                this.marker.setPosition(options.position);
            }
            if (typeof options.range !== "undefined" &&
                prevOptions.range !== options.range) {
                this.marker.setRange(options.range);
            }
            if (typeof options.title !== "undefined" &&
                prevOptions.title !== options.title) {
                this.marker.setTitle(options.title);
            }
            if (typeof options.zIndex !== "undefined" &&
                prevOptions.zIndex !== options.zIndex) {
                this.marker.setZIndex(options.zIndex);
            }
        }
    }
    componentWillUnmount() {
        const { markerClusterer } = this.props;
        if (markerClusterer) {
            markerClusterer.removeMarker(this.marker);
        }
        kakao.maps.event.removeListener(this.marker, MarkerEvent.click, this._onClick);
        kakao.maps.event.removeListener(this.marker, MarkerEvent.mouseover, this._onMouseOver);
        kakao.maps.event.removeListener(this.marker, MarkerEvent.mouseout, this._onMouseOut);
        this.marker.setMap(null);
    }
    render() {
        return null;
    }
    _onClick() {
        const { onClick } = this.props;
        if (onClick) {
            onClick();
        }
    }
    _onMouseOut() {
        const { onMouseOut } = this.props;
        if (onMouseOut) {
            onMouseOut();
        }
    }
    _onMouseOver() {
        const { onMouseOver } = this.props;
        if (onMouseOver) {
            onMouseOver();
        }
    }
}
Marker.contextType = MapContext;
var MarkerEvent;
(function (MarkerEvent) {
    MarkerEvent["click"] = "click";
    MarkerEvent["mouseover"] = "mouseover";
    MarkerEvent["mouseout"] = "mouseout";
})(MarkerEvent || (MarkerEvent = {}));
