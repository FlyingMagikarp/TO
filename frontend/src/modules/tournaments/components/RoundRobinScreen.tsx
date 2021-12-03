import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../../index";
import {useParams} from "react-router-dom";
import Tournament from "../stores/models/tournament";
import {Card, CardContent, Theme, Typography} from "@material-ui/core";
import {Accordion, AccordionDetails, AccordionSummary, Alert, Grid, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Game from "../stores/models/game";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IPlayerRankingTournament, IRoundRobinRound} from "../../common/apiTypings";
import game from "../stores/models/game";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";


const RoundRobinScreen = observer(() => {
    const {tournamentStore, playerStore} = useContext(StoreContext);

    const [tournament, setTournament] = useState(new Tournament());
    const [games, setGames] = useState<Game[]>([]);
    const [playerRanking, setPlayerRanking] = useState<IPlayerRankingTournament[]>([]);
    const [started, setStarted] = useState(false);
    const [rounds, setRounds] = useState<number[]>([]);
    const [gamesPerRound, setGamesPerRound] = useState(0);
    const [openSnack, setOpenSnack] = React.useState(false);

    let {id} = useParams();

    useEffect(() => {
        if (id && id !== "") {
            tournamentStore.getTournamentById(+id).then((data) => {
                setTournament(data);
                let rounds = data.players ? data.players.length-1 : 0;
                let tmp:any = [];
                for (let i=0;i<rounds;i++){
                    tmp.push([i])
                }
                setRounds(tmp);
            });

            tournamentStore.getRoundRobinGames(id ? +id : 0).then(data => {
                let gamesPerRound = data.length / rounds.length;
                setGamesPerRound(gamesPerRound);
                setGames(data);

            });

            tournamentStore.getRoundRobinPlayerRanking(id ? +id : 0).then(data => {
                setPlayerRanking(data);
            });
        }
    }, [tournamentStore, id]);

    const handleScoreChange = (event,i,playerNr) => {
        let values = [...games];
        if(playerNr==='p1'){
            values[i].p1Score = event.target.value
        } else if (playerNr==='p2'){
            values[i].p2Score = event.target.value
        }
        setGames(values);
    };

    const getPlayerTagById = (guid:string|undefined) => {
        if(tournament.players){
            let playerFound =  tournament.players.find(obj => {
                return obj.guid === guid;
            });
            return playerFound ? playerFound.tag : ""
        }
    };

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleSubmit = () => {
        tournamentStore.saveRoundRobinScore(games);
        handleClickSnack();
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
                                    <>
                                        <Grid item>
                                        <div key={i}>
                                            <Typography>Game: {g.gameIdInTournament}</Typography>
                                            <TextField  label={getPlayerTagById(g.p1Id)} value={g.p1Score}
                                                        InputLabelProps={{ shrink: true, }} onChange={(event) => handleScoreChange(event, i, 'p1')}/>
                                            <TextField  label={getPlayerTagById(g.p2Id)} value={g.p2Score}
                                                        InputLabelProps={{ shrink: true, }} onChange={(event) => handleScoreChange(event, i, 'p2')}/>
                                        </div>
                                        </Grid>
                                    </>
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
                <Alert onClose={handleCloseSnack} severity="success" sx={{width: '100%'}}>
                    Tournament Saved!
                </Alert>
            </Snackbar>
        </>
    )
});

export default RoundRobinScreen;