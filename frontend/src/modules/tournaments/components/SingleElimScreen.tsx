import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {StoreContext} from "../../../index";


const RoundRobinScreen = observer(() => {
    const {tournamentStore, playerStore} = useContext(StoreContext);



    return (
        <>

        </>
    )
});

export default RoundRobinScreen;