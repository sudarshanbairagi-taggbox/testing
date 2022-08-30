import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getWallID, CURRENT_URL } from './utils'
import WidgetApp from './widgetApp';
const RenderAPP = (props) => {
    return <WidgetApp wallID={getWallID()} />
}
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wall_id: getWallID()
        }
    }
    render() {
        const { wall_id } = this.state;
        const customUrl = `/testing/${wall_id}`
        return CURRENT_URL && CURRENT_URL.includes("?") ? <WidgetApp wallID={wall_id} /> :
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route path="/:wall_id" element={<RenderAPP />} />
                </Routes>
            </BrowserRouter>

        //return <WidgetApp wallID={wall_id} />
    }
}

export default Main;