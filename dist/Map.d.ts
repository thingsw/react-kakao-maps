import * as React from "react";
export declare const MapContext: React.Context<kakao.maps.Map>;
export interface MapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onLoad" | "onClick" | "onDragEnd"> {
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
export declare class Map extends React.PureComponent<MapProps, State> {
    state: State;
    constructor(props: MapProps);
    componentDidUpdate(prevProps: Readonly<MapProps>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private onComponentMount;
    private _onBoundChanged;
    private _onCenterChanged;
    private _onClick;
    private _onLoad;
    private _onZoomChanged;
    private _onDragEnd;
}
export {};
