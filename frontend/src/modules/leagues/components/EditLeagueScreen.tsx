import React, {useContext, useEffect, useState} from 'react';
import {FormControlLabel, Grid, TextField} from "@material-ui/core";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Alert, Button, Snackbar, Typography} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import League from "../stores/models/league";


type EditLeagueScreenProps = {
    mode: "add" | "edit",
}


const EditLeagueScreen = observer(({mode}:EditLeagueScreenProps) => {
    const {leagueStore} = useContext(StoreContext);

    // data states
    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [location, setLocation] = useState("");
    const [archived, setArchived] = useState(false);

    const [openSnack, setOpenSnack] = React.useState(false);

    // only used in edit mode
    const [league, setLeague] = useState(new League());

    let { id } = useParams();

    useEffect(() => {
        if (mode === "edit"){
            let league_id :number = id ? +id : 0;
            leagueStore.getLeagueById(league_id).then(data => {
                setLeague(data);
                setName(data.name ? data.name : "");
                setSport(data.sport ? data.sport : "");
                setLocation(data.location ? data.location : "");
                setArchived(data.archived ? data.archived : false);
            })
        }
    }, [leagueStore, mode, id]);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleSubmit = () => {
        if (mode === "add") {
            leagueStore.saveNewLeague(name, sport, location);
        } else {
            leagueStore.updateLeague(name, sport, location, archived, league.league_id);
            handleClickSnack();
        }
    };

    return (
        <>

            <Typography variant="h2" color="inherit" component="div">
                {mode === "add" ? "Add new " : "Edit "} League
            </Typography>
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <TextField id="leagueName" label="League Name" variant="outlined" value={name}
                               onChange={(event) => {setName(event.target.value)}}/>
                </Grid>

                <Grid item>
                    <TextField id="leagueSport" label="Sport" variant="outlined" value={sport}
                               onChange={(event) => {setSport(event.target.value)}}/>
                </Grid>

                <Grid item>
                    <TextField id="leagueLocation" label="Location / Region" variant="outlined" value={location}
                               onChange={(event) => {setLocation(event.target.value)}}/>
                </Grid>

                {mode === "edit" &&
                    <Grid item>
                        <Typography variant="h6" color="inherit" component="div">
                            Archived
                        </Typography>
                        <RadioGroup aria-label="Archived?" defaultValue={archived} value={archived} name="archivedRadioGroup"
                                    onChange={(event) => {setArchived(event.target.value == "true")}}>
                            <FormControlLabel value={false} control={<Radio />} label="False" />
                            <FormControlLabel value={true} control={<Radio />} label="True" />
                        </RadioGroup>
                    </Grid>
                }
                <div>
                    <Button variant={"contained"} onClick={handleSubmit}>Save</Button>
                </div>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    League Saved!
                </Alert>
            </Snackbar>
        </>
    );
});

export default EditLeagueScreen;




