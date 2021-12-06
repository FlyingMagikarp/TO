import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, FormControlLabel, Grid, TextField} from "@material-ui/core";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Alert, Button, Snackbar, Typography} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import League from "../stores/models/league";
import {IPlayerRankingTournament} from "../../common/apiTypings";


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
    const [ranking, setRanking] = useState("");
    const [playerRanking, setPlayerRanking] = useState<IPlayerRankingTournament[]>([]);
    const [rankingFromDate, setRankingFromDate] = useState(new Date());
    const [rankingToDate, setRankingToDate] = useState(new Date());

    const [openSnack, setOpenSnack] = React.useState(false);
    const [rankingLoading, setRankingLoading] = React.useState(false);

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
            });
            let tmp = rankingFromDate;
            tmp.setFullYear(tmp.getFullYear()-1);
            setRankingFromDate(tmp);
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
            handleClickSnack();
        } else {
            leagueStore.updateLeague(name, sport, location, archived, league.league_id);
            handleClickSnack();
        }
    };

    const handleFromDateChange = (event) => {
        setRankingFromDate(new Date(Date.parse(event.target.value)));
    };

    const handleToDateChange = (event) => {
        setRankingToDate(new Date(Date.parse(event.target.value)));
    };

    const handleLoadRanking = () => {
        setRankingLoading(true);
        leagueStore.getLeagueRanking(id?+id:0, rankingFromDate, rankingToDate).then(data => {
            setPlayerRanking(data);
            setRankingLoading(false);
        });
    };

    return (
        <>

            <Typography variant="h2" color="inherit" component="div">
                {mode === "add" ? "Add new " : "Edit "} League
            </Typography>
            <Grid container spacing={4}>
                <Grid item>
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
                                            onChange={(event) => {setArchived(event.target.value === "true")}}>
                                    <FormControlLabel value={false} control={<Radio />} label="False" />
                                    <FormControlLabel value={true} control={<Radio />} label="True" />

                                </RadioGroup>
                            </Grid>
                        }
                        <div>
                            <Button variant={"contained"} onClick={handleSubmit}>Save</Button>
                        </div>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction={'column'} spacing={1}>
                        <Grid item>
                            <Grid container direction={"row"} spacing={1}>
                                <Grid item>
                                    <TextField
                                        id="date"
                                        label="Date From"
                                        type="date"
                                        defaultValue={rankingFromDate.toISOString().split('T')[0]}
                                        value={rankingFromDate.toISOString().split('T')[0]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={date => handleFromDateChange(date)}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="date"
                                        label="Date To"
                                        type="date"
                                        defaultValue={rankingToDate.toISOString().split('T')[0]}
                                        value={rankingToDate.toISOString().split('T')[0]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={date => handleToDateChange(date)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant={"contained"} onClick={handleLoadRanking}>Load Ranking</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction={"column"} spacing={2}>
                            {rankingLoading &&
                                <CircularProgress />
                            }
                            {!rankingLoading && playerRanking.map((pr, i) => {
                                return (
                                    <>
                                        <Grid item>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h5" color="inherit" component="div">
                                                        Rank {+i+1}
                                                    </Typography>
                                                    <Typography variant="h6" color="inherit" component="div">
                                                        {pr.player.tag}
                                                    </Typography>
                                                    <Typography variant="h6" color="inherit" component="div">
                                                        Points: {pr.score}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <Typography variant="h6" color="inherit" component="div">

                                            </Typography>
                                        </Grid>
                                    </>
                                )
                            })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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




