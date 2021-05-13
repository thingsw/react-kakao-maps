import * as React from "react";
import { MapContext } from "./Map";
export interface PolygonProps {
    options: kakao.maps.PolygonOptions;
}
export declare class Polygon extends React.PureComponent<PolygonProps> {
    static contextType: React.Context<kakao.maps.Map>;
    context: React.ContextType<typeof MapContext>;
    private readonly polygon;
    constructor(props: PolygonProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<PolygonProps>): void;
    componentWillUnmount(): void;
    render(): null;
}
