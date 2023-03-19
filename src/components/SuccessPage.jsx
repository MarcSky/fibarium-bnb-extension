import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";

export function SuccessPage(props) {
    const { classes } = props;

    return (
            <Container maxWidth="md" className={classes.success_page_container}>
                <Grid item xs={12}>
                    <img src={require('../images/success-35.png')} alt="success" width="200" height="200"/>
                    <Typography variant="h4" className={classes.success_page_text}>
                        Success
                    </Typography>
                </Grid>
            </Container>
        );
}
