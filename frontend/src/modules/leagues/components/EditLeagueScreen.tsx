import React, {useContext, useState} from 'react';
import {FormControlLabel, Grid, TextField, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import League from "../stores/models/league";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));

type EditLeagueScreenProps = {
    mode: "add" | "edit",
}


const EditLeagueScreen = observer(({mode}:EditLeagueScreenProps) => {
    const {masterDataStore, uiStore, leagueStore} = useContext(StoreContext);
    const classes = useStyles();
    const isMobile = uiStore.isMediumScreenDown;

    // data states
    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [location, setLocation] = useState("");

    // only used in edit mode
    const [league, setLeague] = useState(new League());

    if (mode === "edit"){
        let { id } = useParams();
        let league_id :number = id ? +id : 0;
        leagueStore.getLeagueById(league_id).then(data => {
            setLeague(data);
            setName(league.name ? league.name : "");
            setSport(league.sport ? league.sport : "");
            setLocation(league.location ? league.location : "");
            debugger;
        })
    }

    const handleSubmit = () => {
        leagueStore.saveNewLeague(name, sport, location);
    };

    return (
        <>

            <Typography variant="h2" color="inherit" component="div">
                {mode === "add" ? "Add new " : "Edit "} League
            </Typography>
            <div>
                <Grid container spacing={2}>
                </Grid>
                <div>
                    <TextField id="leagueName" label="League Name" variant="outlined" value={name}
                               onChange={(event) => {setName(event.target.value)}}/>
                </div>

                <div>
                    <TextField id="leagueSport" label="Sport" variant="outlined" value={sport}
                               onChange={(event) => {setSport(event.target.value)}}/>
                </div>

                <div>
                    <TextField id="leagueLocation" label="Location / Region" variant="outlined" value={location}
                               onChange={(event) => {setLocation(event.target.value)}}/>
                </div>

                {mode === "edit" &&
                    <div>
                        <Typography variant="h6" color="inherit" component="div">
                            Archived
                        </Typography>
                        <RadioGroup aria-label="Archived?" defaultValue="arFalse" name="archivedRadioGroup">
                            <FormControlLabel value="arFalse" control={<Radio />} label="False" />
                            <FormControlLabel value="arTrue" control={<Radio />} label="True" />
                        </RadioGroup>
                    </div>
                }
                <div>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </>
    );
});

export default EditLeagueScreen;




