import * as React from "react";
import { MapContext } from "./Map";
export interface CircleProps {
    options: kakao.maps.CircleOptions;
}
export declare class Circle extends React.PureComponent<CircleProps> {
    static contextType: React.Context<kakao.maps.Map>;
    context: React.ContextType<typeof MapContext>;
    private readonly circle;
    constructor(props: CircleProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<CircleProps>): void;
    componentWillUnmount(): void;
    render(): null;
}
