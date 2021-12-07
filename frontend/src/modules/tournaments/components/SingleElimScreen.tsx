import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../../index";
import Tournament from "../stores/models/tournament";
import Game from "../stores/models/game";
import {IPlayerRankingTournament} from "../../common/apiTypings";
import {useParams} from "react-router-dom";
import {Alert, Divider, Grid, Snackbar, TextField} from "@mui/material";
import {Card, CardContent, Typography} from "@material-ui/core";
import Button from "@mui/material/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

export const useStyles = makeStyles(() => createStyles({
    separator: {
        marginTop: '10px',
    }
}));

/**
 * Single elimination component
 * Displays a single elimination tournament. All games are displayed and can be tracked/edited here.
 * The ranking is also displayed here.
 */
const SingleElimScreen = observer(() => {
    const {tournamentStore} = useContext(StoreContext);
    const classes = useStyles();

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

            tournamentStore.getSingleEliminationGames(id ? +id : 0).then(data => {
                setGames(data);
            });

            tournamentStore.getSingleElimPlayerRanking(id ? +id : 0).then(data => {
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
     * 'TBD' players are placeholders
     * @param guid
     */
    const getPlayerTagById = (guid:string|undefined) => {
        if (guid==='TBD'){return 'TBD'}
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
        tournamentStore.saveSingleEliminationScore(games).then(() => handleClickSnack());
    };

    /**
     * Calculates after which game the round ends so a separator can be rendered
     */
    const calcSeparators = () => {
      let gamesTotal = games.length+1;
      let separators = [] as number[];

      let tmpNr = 0;
      let i = gamesTotal;
      while (i>2){
          i = i/2;
          tmpNr+=i;
          separators.push(tmpNr);
      }

      return separators;
    };

    /**
     * Takes a number and checks if it is in the separator array
     * @param nr
     */
    const isNumberSeparator = (nr:number) => {
        return calcSeparators().find(n => n===nr);
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
                                <Grid item>
                                    <Typography>Top {games.length+1 }</Typography>
                                </Grid>
                                {games.map((g,i) => {
                                    return (
                                        <Grid item key={i}>
                                            <div key={i}>
                                                <TextField  label={getPlayerTagById(g.p1Id)} value={g.p1Score}
                                                            InputLabelProps={{ shrink: true, }} onChange={(event) => handleScoreChange(event, i, 'p1')}/>
                                                <p></p>
                                                <TextField  label={getPlayerTagById(g.p2Id)} value={g.p2Score}
                                                            InputLabelProps={{ shrink: true, }} onChange={(event) => handleScoreChange(event, i, 'p2')}/>
                                            </div>
                                            {isNumberSeparator(i+1) &&
                                            <div className={classes.separator}>
                                                <Divider variant={'middle'} />
                                                <Typography>{g.gameIdInTournament && g.gameIdInTournament/2 > 2 ? 'Top '+g.gameIdInTournament/2 : 'Final'}</Typography>
                                            </div>}
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

export default SingleElimScreen;