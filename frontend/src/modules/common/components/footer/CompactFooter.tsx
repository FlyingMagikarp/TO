import React, {useContext} from 'react';
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";




export const useStyles = makeStyles((theme: Theme) => createStyles({
    footerContainer: {
        color: 'white',
        borderTop: '1px solid white',
        marginTop: '50px',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '10px'
    },
}));

const CompactFooter = observer(() => {
    const {uiStore} = useContext(StoreContext);
    const classes = useStyles();

    return (
        <>
        <div className={classes.footerContainer}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
            </Grid>
        </div>
        </>
);
});

export default CompactFooter;




