import { makeStyles, Grid, Card, CardContent, Typography, CardActions, Button, CardHeader, Divider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    rootHighlight: {
        maxWidth: 275,
        borderColor: '#9896FF',
        borderWidth: "2px"
    },
    root: {
        maxWidth: 275,
    },
    divider: {
        margin: `3px 0`
    },
    cardActions: {
        display: "flex",
        justifyContent: "center"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
        padding: 10,
    },
    price: {
        fontSize: 24,
        textAlign: "center"
    },
});

interface InsuranceOptionCardProps {
    recommended?: boolean;
    id:string;
    title: string;
    price: string;
    description: string;
    onClick: (policyId: string) => void;
}

const InsuranceOptionCard: React.FunctionComponent<InsuranceOptionCardProps> 
= ({ recommended = false,  title, price, description, onClick, id}) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid item>
                <Card className={recommended ? classes.rootHighlight : classes.root} variant="outlined">
                    <Typography align="center" className={classes.title}>{title}</Typography>
                    <Divider className={classes.divider} light />
                    <CardContent>
                        <Typography align="center" variant="h3" component="h2" gutterBottom={true}>
                            <Typography variant="h4" component="span" color={recommended ? "primary" : "textPrimary"}> {price} </Typography>
                            <Typography component="span"> par mois</Typography>
                        </Typography>
                        <Typography component="p" align="center">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button color="primary" variant={recommended ? "contained" : "outlined"} size="medium" onClick={() => onClick(id)}>Select Plan</Button>
                    </CardActions>
                </Card>
            </Grid>
        </React.Fragment>
    )
}


export default InsuranceOptionCard;