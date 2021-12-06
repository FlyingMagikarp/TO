import React from 'react';
import {CardContent, Theme, Card} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    cardTitle: {
        fontSize: 14,
        color: 'black'
    },
    cardPos: {
        marginBottom: 12,
    },
    card: {
        height: '150px',
        width: '250px'
    }
}));

type AddDataCardProps = {
    component: string
}

const AddDataCard = observer(({ component}: AddDataCardProps) => {
    const classes = useStyles();

    return(
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom fontWeight={600}>
                        {`Add ${component}`}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
});

export default AddDataCard;