import React from "react";
import {Box, Button, Container, Grid, Typography} from "@material-ui/core";
import {getKey, getPermName} from "../utils";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


function PermItem(props) {
    return (
        <Grid item xs={12}>
            <Grid container spacing={1}>
                <Grid item xs={2} style={{color: "#10bb40"}}>
                    <FiberManualRecordIcon/>
                </Grid>
                <Grid item xs={10} className={props.classes.perm_item_text}>
                    <div>{getPermName(props.k)}</div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export function Information (props) {
    const { classes, perm_list, handleSettingsButtonClick, handleLogoutButtonClick } = props;

    return (
        <div>
            <Container maxWidth="md" className={classes.root_container}>
                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.page_header_text}>
                        Information
                    </Typography>
                </Grid>
                <Grid container spacing={1}>
                    {perm_list.map(function(d){
                        return (
                            <PermItem classes={classes} k={d.k} v={d.v} key={getKey()}/>
                        )
                    })}
                </Grid>
            </Container>
            <Container maxWidth="md" className={classes.root_container_buttons}>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.information_buttons}>
                        <div className={classes.button}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    size="large"
                                    variant="outlined"
                                    onClick={() => {handleSettingsButtonClick()}}>
                                    Settings
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.information_buttons}>
                        <div className={classes.button}>
                            <Box display="flex" justifyContent="flex-start">
                                <Button
                                    size="large"
                                    variant="outlined"
                                    onClick={() => {handleLogoutButtonClick()}}>
                                    Logout
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
