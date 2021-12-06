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
    card: {
        height: '150px',
        width: '250px'
    }
}));

type DisplayCardProps = {
    name?: string,
    sport?: string,
    location?: string
}

const DisplayCard = observer(({ name, sport, location}: DisplayCardProps) => {
    const classes = useStyles();

    return(
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.cardTitle} gutterBottom fontWeight={600}>
                        {name}
                    </Typography>
                    <Typography>
                        {sport}
                    </Typography>
                    <Typography>
                        {location}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
});

export default DisplayCard;