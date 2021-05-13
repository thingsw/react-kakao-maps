import * as React from "react";
import { MapContext } from "./Map";
export interface PolylineProps {
    options: kakao.maps.PolylineOptions;
    onClick?(e: kakao.maps.event.MouseEvent): void;
    onMouseOver?(e: kakao.maps.event.MouseEvent): void;
    onMouseOut?(e: kakao.maps.event.MouseEvent): void;
}
export declare class Polyline extends React.PureComponent<PolylineProps> {
    static contextType: React.Context<kakao.maps.Map>;
    context: React.ContextType<typeof MapContext>;
    private readonly polyline;
    constructor(props: PolylineProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<PolylineProps>): void;
    componentWillUnmount(): void;
    render(): null;
    private _onClick;
    private _onMouseOut;
    private _onMouseOver;
}
