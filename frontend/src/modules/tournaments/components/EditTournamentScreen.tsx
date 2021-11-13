import React, {useContext, useEffect, useState} from 'react';
import {FormControlLabel, Grid, InputLabel, TextField} from "@material-ui/core";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Alert, Button, Checkbox, FormGroup, MenuItem, Paper, Select, Snackbar, Typography} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tournament from "../stores/models/tournament";
import Constants from "../../../util/Constants";
import league from "../../leagues/stores/models/league";
import player from "../../player/stores/models/player";


type EditTournamentScreenProps = {
    mode: "add" | "edit",
}

const EditTournamentScreen = observer(({mode}: EditTournamentScreenProps) => {
    const {tournamentStore, leagueStore, playerStore} = useContext(StoreContext);

    //data states
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date());
    const [starttime, setStarttime] = useState("");
    const [format, setFormat] = useState("");
    const [players, setPlayers] = useState([""]);
    const [leagueId, setLeagueId] = useState(0);
    const [archived, setArchived] = useState(false);
    const [leagues, setLeagues] = useState([] as league[]);
    const [allPlayers, setAllPlayers] = useState([] as player[]);

    const [openSnack, setOpenSnack] = React.useState(false);

    // only set in edit mode
    const [tournament, setTournament] = useState(new Tournament());

    let {id} = useParams();

    useEffect(() => {
        leagueStore.getAllLeagues().then(data => {setLeagues(data)});
        playerStore.getAllPlayers().then(data => {setAllPlayers(data)});
        if (mode === "edit") {
            let tournamentId: number = id ? +id : 0;
            tournamentStore.getTournamentById(tournamentId).then(data => {
                setTournament(data);
                setName(data.name ? data.name : "");
                setLocation(data.location ? data.location : "");
                setDate(data.date ? data.date : new Date());
                setStarttime(data.starttime ? data.starttime : "");
                setFormat(data.format ? data.format : "");
                setPlayers(data.players ? data.players : [""]);
                setLeagueId(data.leagueId ? data.leagueId : 0);
                setArchived(data.archived ? data.archived : false);
            })
        }
    }, [tournamentStore, mode, id]);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleSubmit = () => {
        if (mode === "add") {
            tournamentStore.saveNewTournament(name, location, date, starttime, players, leagueId, archived);
        } else {
            tournamentStore.updateTournament(name, location, date, starttime, players, leagueId, archived, tournament.tournamentId);
            handleClickSnack();
        }
    };

    return (
        <>
            <Typography variant="h2" color="inherit" component="div">
                {mode === "add" ? "Add new " : "Edit "} Tournament
            </Typography>
            <Grid container direction={"row"} spacing={1}>
                <Grid item>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <TextField id="tournamentName" label="Tournament Name" variant="outlined" value={name}
                                       onChange={(event) => {
                                           setName(event.target.value)
                                       }}/>
                        </Grid>

                        <Grid item>
                            <TextField id="tournamentLocation" label="Location" variant="outlined" value={location}
                                       onChange={(event) => {
                                           setLocation(event.target.value)
                                       }}/>
                        </Grid>

                        <Grid item>
                            <TextField id="tournamentDate" label="Date" variant="outlined" value={date}
                                       onChange={(event) => {
                                           setDate(new Date())
                                       }}/>
                        </Grid>

                        <Grid item>
                            <TextField id="tournamentStarttime" label="Start time" variant="outlined" value={starttime}
                                       onChange={(event) => {
                                           setStarttime(event.target.value)
                                       }}/>
                        </Grid>

                        <Grid item>
                            <InputLabel id="formatLabel">Format</InputLabel>
                            <Select
                                labelId="tournamentFormatLabel"
                                id="formatSelect"
                                value={format}
                                label="Format"
                                onChange={(event) => {
                                    setFormat(event.target.value)
                                }}
                            >
                                {Constants.C_TOURNAMENT_FORMATS.map((f) => {
                                    return (
                                        <MenuItem value={f}>{f}</MenuItem>
                                    );
                                })}
                            </Select>
                        </Grid>

                        {mode === "edit" &&
                        <Grid item>
                            <Typography variant="h6" color="inherit" component="div">
                                Archived
                            </Typography>
                            <RadioGroup aria-label="Archived?" defaultValue={archived} value={archived} name="archivedRadioGroup"
                                        onChange={(event) => {
                                            setArchived(event.target.value == "true")
                                        }}>
                                <FormControlLabel value={false} control={<Radio/>} label="False"/>
                                <FormControlLabel value={true} control={<Radio/>} label="True"/>
                            </RadioGroup>
                        </Grid>
                        }
                        <div>
                            <Button variant={"contained"} onClick={handleSubmit}>Save</Button>
                        </div>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                            <InputLabel id="leagueLabel">League</InputLabel>
                            <RadioGroup aria-label="League" defaultValue={archived} name="leagueRadioGroup"
                                        onChange={(event) => {
                                            setLeagueId(parseInt(event.target.value))
                                        }}>
                                {leagues.map((league) => {
                                    return (
                                        <FormControlLabel value={league.league_id ?? 0} control={<Radio/>} label={league.name}/>
                                    );
                                })}
                            </RadioGroup>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <Paper style={{maxHeight: 200, overflow: 'auto', minWidth: 200}}>
                            <InputLabel id="playersLabel">Players</InputLabel>
                            <FormGroup>
                                {allPlayers.map((player) => {
                                    if (players.find(p => p === player.guid)) {
                                        return (
                                            <FormControlLabel value={player.guid ?? ""} control={<Checkbox checked/>}
                                                              label={player.tag}/>
                                        )
                                    } else {
                                        return (
                                            <FormControlLabel value={player.guid ?? ""} control={<Checkbox/>}
                                                              label={player.tag}/>
                                        )
                                    }
                                })}
                            </FormGroup>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{width: '100%'}}>
                    Tournament Saved!
                </Alert>
            </Snackbar>
        </>
    );
});

export default EditTournamentScreen;