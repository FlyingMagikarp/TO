import React, {useContext, useEffect, useState} from 'react';
import {FormControlLabel, Grid, TextField} from "@material-ui/core";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Alert, Button, Snackbar, Typography} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


type EditPlayerScreenProps = {
    mode: "add" | "edit",
}

/**
 * Edit player component
 * Displays player data and can be used to edit it.
 *
 * Can be used to create new players if mode 'add' is set.
 */
const EditPlayerScreen = observer(({mode}: EditPlayerScreenProps) => {
    const {playerStore} = useContext(StoreContext);

    /**
     * data states
     */
    const [tag, setTag] = useState("");
    const [guid, setGuid] = useState("");
    const [archived, setArchived] = useState(false);

    /**
     * display states
     */
    const [openSnack, setOpenSnack] = React.useState(false);

    /**
     * URL param
     */
    let {id} = useParams();

    /**
     * Loads player data
     */
    useEffect(() => {
        if (mode === "edit"){
            let playerId: string = id ? id : "";
            playerStore.getPlayerById(playerId).then(data => {
                setGuid(data.guid ? data.guid : "");
                setTag(data.tag ? data.tag : "");
                setArchived(data.archived ? data.archived : false);
            })
        }
    }, [playerStore, mode, id]);

    /**
     * Submit handler
     */
    const handleSubmit = () => {
        if (mode === "add"){
            playerStore.saveNewPlayer(tag);
            handleClickSnack();
        } else {
            playerStore.updatePlayer(guid, tag, archived);
            handleClickSnack();
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

    return (
        <>
            <Typography variant="h2" color="inherit" component="div">
                {mode === "add" ? "Add new " : "Edit "} Player
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

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{width: '100%'}}>
                    Player Saved!
                </Alert>
            </Snackbar>
        </>
    );
});

export default EditPlayerScreen;