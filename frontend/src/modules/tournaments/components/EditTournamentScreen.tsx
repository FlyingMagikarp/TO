import React, {useContext, useEffect, useState} from 'react';
import {FormControlLabel, Grid, InputLabel, TextField} from "@material-ui/core";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import {Link, useParams} from "react-router-dom";
import {Alert, Button, Checkbox, FormGroup, MenuItem, Paper, Select, Snackbar, Typography} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tournament from "../stores/models/tournament";
import Constants from "../../../util/Constants";
import league from "../../leagues/stores/models/league";
import {IPlayerSelected} from "../../common/apiTypings";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

export const useStyles = makeStyles(() => createStyles({
    navItemLink: {
        color: 'white',
        textDecoration: 'none',
    }
}));


type EditTournamentScreenProps = {
    mode: "add" | "edit",
}

const EditTournamentScreen = observer(({mode}: EditTournamentScreenProps) => {
    const {tournamentStore, leagueStore, playerStore} = useContext(StoreContext);
    const classes = useStyles();

    //data states
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [starttime, setStarttime] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [format, setFormat] = useState("");
    const [leagueId, setLeagueId] = useState(0);
    const [archived, setArchived] = useState(false);
    const [leagues, setLeagues] = useState([] as league[]);
    const [playersWithSelected, setPlayersWithSelected] = useState<IPlayerSelected[]>([]);

    const [openSnack, setOpenSnack] = React.useState(false);

    // only set in edit mode
    const [tournament, setTournament] = useState(new Tournament());

    let {id} = useParams();

    useEffect(() => {
        leagueStore.getAllLeagues().then(data => {setLeagues(data)});
        playerStore.getAllPlayers().then(data => {if(mode==="add"){setPlayersWithSelected(data)}});
        if (mode === "edit") {
            let tournamentId: number = id ? +id : 0;
            tournamentStore.getTournamentById(tournamentId).then(data => {
                setTournament(data);
                setName(data.name ? data.name : "");
                setLocation(data.location ? data.location : "");
                setStarttime(data.starttime ? data.starttime : "");
                setFormat(data.format ? data.format : "");
                setLeagueId(data.leagueId ? data.leagueId : 0);
                setArchived(data.archived ? data.archived : false);
                setSelectedDate(data.date ? new Date(data.date) : new Date());

                // set selected flag on players that are in the tournament
                if(data.players) {
                    for (let p of data.players) {
                        let index = playerStore.playersWithSelected.findIndex(pws => pws.player.guid === p.guid);
                        playerStore.playersWithSelected[index].selected = true;
                    }
                    setPlayersWithSelected(playerStore.playersWithSelected)
                }
            });
        }
    }, [tournamentStore, mode, id, leagueStore, playerStore]);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleDateChange = (event) => {
        setSelectedDate(new Date(Date.parse(event.target.value)));
    };

    const handleSubmit = () => {
        let playerIds = [""];

        for(let p of playersWithSelected){
            if(p.selected && p.player.guid){ playerIds.push(p.player.guid)}
        }

        if (mode === "add") {
            tournamentStore.saveNewTournament(name, location, starttime, playerIds, leagueId, archived, format, selectedDate);
            handleClickSnack();
        } else {
            tournamentStore.updateTournament(name, location, starttime, playerIds, leagueId, archived, selectedDate, tournament.tournamentId);
            handleClickSnack();
        }
    };

    const handlePlayersChange = (event) => {
        let tmpArray = [...playersWithSelected];
        let index = tmpArray.findIndex(p => p.player.guid === event.target.value);
        tmpArray[index].selected = !tmpArray[index].selected;

        setPlayersWithSelected(tmpArray);
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
                            <TextField id="tournamentName" label="Tournament Name" variant="outlined" value={name} disabled={tournament.finished}
                                       onChange={(event) => {
                                           setName(event.target.value)
                                       }}/>
                        </Grid>

                        <Grid item>
                            <TextField id="tournamentLocation" label="Location" variant="outlined" value={location} disabled={tournament.finished}
                                       onChange={(event) => {
                                           setLocation(event.target.value)
                                       }}/>
                        </Grid>

                        <Grid item>
                            <TextField id="tournamentStarttime" label="Start time" variant="outlined" value={starttime} disabled={tournament.finished}
                                       onChange={(event) => {
                                           setStarttime(event.target.value)
                                       }}/>
                        </Grid>

                        <Grid item>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={date => handleDateChange(date)}
                                disabled={tournament.finished}
                            />
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
                                disabled={mode === "edit"}
                            >
                                {Constants.C_TOURNAMENT_FORMATS.map((f, i) => {
                                    return (
                                        <MenuItem value={f} key={i}>{f}</MenuItem>
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
                                            setArchived(event.target.value === "true")
                                        }}>
                                <FormControlLabel value={false} control={<Radio/>} label="False" checked={!archived} disabled={tournament.finished}/>
                                <FormControlLabel value={true} control={<Radio/>} label="True" checked={archived} disabled={tournament.finished}/>
                            </RadioGroup>
                        </Grid>
                        }
                        <Grid item>
                            <Grid container spacing={2}>
                            <Grid item>
                                <Button variant={"contained"} onClick={handleSubmit}>Save</Button>
                            </Grid>
                            <Grid item>
                                <Link to={"/tournament/roundRobin/"+id} className={classes.navItemLink}>
                                    <Button variant={"contained"}>View Tree</Button>
                                </Link>
                            </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                            <InputLabel id="leagueLabel">League</InputLabel>
                            <RadioGroup aria-label="League" name="leagueRadioGroup"
                                        onChange={(event) => {
                                            setLeagueId(parseInt(event.target.value))
                                        }}>
                                {leagues.map((league, i) => {
                                    return (
                                        <FormControlLabel value={league.league_id ?? 0} control={<Radio/>} label={league.name} checked={leagueId === league.league_id} disabled={tournament.finished} key={i}/>
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
                                { playersWithSelected.map((player, i) => {
                                    return (
                                        <FormControlLabel value={player.player.guid ?? ""} control={<Checkbox checked={player.selected}/>}
                                                          label={player.player.tag} onChange={handlePlayersChange} disabled={tournament.finished} key={i}/>
                                    )
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