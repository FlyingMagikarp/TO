import React, {useContext, useEffect, useState} from 'react';
import {FormControl, FormControlLabel, Grid, Input, InputLabel, TextField, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useParams} from "react-router-dom";
import {Alert, Button, Snackbar, Typography} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Player from "../stores/models/player";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));

type EditPlayerScreenProps = {
    mode: "add" | "edit",
}

const EditPlayerScreen = observer(({mode}: EditPlayerScreenProps) => {
    const {masterDataStore, uiStore, playerStore} = useContext(StoreContext);
    const classes = useStyles();
    const isMobile = uiStore.isMediumScreenDown;

    //data states
    const [tag, setTag] = useState("");
    const [guid, setGuid] = useState("");
    const [archived, setArchived] = useState(false);

    const [openSnack, setOpenSnack] = React.useState(false);

    // only set in edit mode
    const [player, setPlayer] = useState(new Player());

    let {id} = useParams();

    useEffect(() => {
        if (mode === "edit"){
            let playerId: string = id ? id : "";
            playerStore.getPlayerById(playerId).then(data => {
                setPlayer(data);
                setGuid(data.guid ? data.guid : "");
                setTag(data.tag ? data.tag : "");
                setArchived(data.archived ? data.archived : false);
            })
        }
    }, [playerStore, mode, id]);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleSubmit = () => {
        if (mode === "add"){
            playerStore.saveNewPlayer(tag);
        } else {
            playerStore.updatePlayer(guid, tag, archived);
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
                    <Grid item>
                        <TextField id="playerTag" label="Player Tag" variant="outlined" value={tag}
                                   onChange={(event) => {setTag(event.target.value)}}/>
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
            </Grid>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{width: '100%'}}>
                    Player Saved!
                </Alert>
            </Snackbar>
        </>
    );
});

export default EditPlayerScreen;