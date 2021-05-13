import * as React from "react";
import { MapContext } from "./Map";
export declare const MarkerClustererContext: React.Context<kakao.maps.MarkerClusterer>;
export interface MarkerClustererProps {
    options: kakao.maps.MarkerClustererOptions;
}
export declare class MarkerClusterer extends React.PureComponent<MarkerClustererProps> {
    static contextType: React.Context<kakao.maps.Map>;
    context: React.ContextType<typeof MapContext>;
    private readonly markerClusterer;
    constructor(props: MarkerClustererProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
