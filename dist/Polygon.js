import * as React from "react";
import { MapContext } from "./Map";
export class Polygon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.polygon = new kakao.maps.Polygon(this.props.options);
    }
    componentDidMount() {
        const map = this.context;
        this.polygon.setMap(map);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.options !== this.props.options) {
            this.polygon.setOptions(this.props.options);
        }
    }
    componentWillUnmount() {
        this.polygon.setMap(null);
    }
    render() {
        return null;
    }
}
Polygon.contextType = MapContext;
