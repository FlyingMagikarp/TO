import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../../index";
import {useParams} from "react-router-dom";
import Tournament from "../stores/models/tournament";
import {Card, CardContent, Typography} from "@material-ui/core";
import {Alert, Grid, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Game from "../stores/models/game";
import {IPlayerRankingTournament, } from "../../common/apiTypings";

/**
 * Round robin component
 * Displays a round robin tournament. All games are displayed and can be tracked/edited here.
 * The ranking is also displayed here.
 */
const RoundRobinScreen = observer(() => {
    const {tournamentStore} = useContext(StoreContext);

    /**
     * data states
     */
    const [tournament, setTournament] = useState(new Tournament());
    const [games, setGames] = useState<Game[]>([]);
    const [playerRanking, setPlayerRanking] = useState<IPlayerRankingTournament[]>([]);

    /**
     * display states
     */
    const [openSnack, setOpenSnack] = React.useState(false);

    /**
     * URL param
     */
    let {id} = useParams();

    /**
     * Loads tournament and game data
     */
    useEffect(() => {
        if (id && id !== "") {
            tournamentStore.getTournamentById(+id).then((data) => {
                setTournament(data);
            });

            tournamentStore.getRoundRobinGames(id ? +id : 0).then(data => {
                setGames(data);
            });

            tournamentStore.getRoundRobinPlayerRanking(id ? +id : 0).then(data => {
                setPlayerRanking(data);
            });
        }
    }, [tournamentStore, id]);

    /**
     * Selected data state change handlers
     */
    const handleScoreChange = (event,i,playerNr) => {
        let values = [...games];
        if(playerNr==='p1'){
            values[i].p1Score = event.target.value
        } else if (playerNr==='p2'){
            values[i].p2Score = event.target.value
        }
        setGames(values);
    };

    /**
     * Takes a player guid and returns the corresponding player object
     * @param guid
     */
    const getPlayerTagById = (guid:string|undefined) => {
        if(tournament.players){
            let playerFound =  tournament.players.find(obj => {
                return obj.guid === guid;
            });
            return playerFound ? playerFound.tag : ""
        }
    };

    /**
     * Display state change handlers
     */
    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    /**
     * Submit handler
     */
    const handleSubmit = () => {
        tournamentStore.saveRoundRobinScore(games).then(() => handleClickSnack());
    };

    return (
        <>
            <Grid container direction={"row"}>
                <Grid item>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <Typography variant="h3" color="inherit" component="div">
                                {tournament.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant={"contained"} onClick={handleSubmit}>Save</Button>
                        </Grid>
                        <Grid item>
                            <Grid container direction={'column'} spacing={2}>
                            {games.map((g,i) => {
                                return (
                                    <Grid item key={i}>
                                        <div key={i}>
                                            <Typography>Game: {g.gameIdInTournament}</Typography>
                                            <p></p>
                                            <TextField  label={getPlayerTagById(g.p1Id)} value={g.p1Score}
                                                        InputLabelProps={{ shrink: true, }} onChange={(event) => handleScoreChange(event, i, 'p1')}/>
                                            <p></p>
                                            <TextField  label={getPlayerTagById(g.p2Id)} value={g.p2Score}
                                                        InputLabelProps={{ shrink: true, }} onChange={(event) => handleScoreChange(event, i, 'p2')}/>
                                        </div>
                                    </Grid>
                                )
                            })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction={'column'}>
                        <Grid item>
                            <Typography variant="h3" color="inherit" component="div">
                                Ranking
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction={'column'} spacing={2}>
                            {playerRanking.map((pr, i) => {
                                return (
                                    <Grid item key={i}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h5" color="inherit" component="div">
                                                    {pr.player.tag}
                                                </Typography>
                                                <Typography variant="h6" color="inherit" component="div">
                                                    Rank {+i+1}
                                                </Typography>
                                                <Typography variant="h6" color="inherit" component="div">
                                                    Score: {pr.score}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                            </Grid>
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
    )
});

export default RoundRobinScreen;