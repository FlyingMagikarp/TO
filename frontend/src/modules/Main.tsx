import React from 'react';
import {observer} from "mobx-react-lite";
import Header from "./common/components/header/Header";

/**
 * Main component, default render of the app
 */
const Main = observer(() => {
    return (
        <div>
            <Header/>
        </div>
        )
});


export default Main;



