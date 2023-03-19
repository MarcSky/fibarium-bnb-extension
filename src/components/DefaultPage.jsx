import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Box, Button, Container, Grid} from "@material-ui/core";
import {MyTextFieldSmall} from "../utils";
import {
    fetchPermList, fetchPermListSuccess, setAcceptSuccess,
    setLoginStatus,
    setPassword,
    setPerm, setWeb3Status
} from "../store/default_page/actions";
import {LockOpen} from "@material-ui/icons";
import {Permissions} from "./Permissions";
import {Information} from "./Information";
import {SuccessPage} from "./SuccessPage";


const styles = {
    root: {
        minWidth: 300,
        maxWidth: 300,
        minHeight: 460,
        maxHeight: 460,
        // backgroundColor: 'gray'
    },
    root_container: {
        marginLeft: 20,
        minHeight: 400,
    },
    root_container_login: {
        marginLeft: 10,
        minHeight: 400,
    },
    root_container_button: {
        marginLeft: 20,
    },
    root_container_buttons: {
        marginLeft: 5,
    },
    logo_img: {
        // marginTop: 0,
        marginLeft: 25,
        float: "left",
    },
    logo_text: {
        marginTop: 35,
        float: "left",
        fontSize: 34,
        fontFamily: "BlinkMacSystemFont",
        fontWeight: 1,
        color: "rgba(77,82,89,0.76)"
    },
    password_field: {
        margin: 10,
        paddingTop: 150,
    },

    page_header_text: {
        float: "left",
        margin: 20,
        marginLeft: 0,
        marginBottom: 30,
        fontSize: 18,
        color: "rgba(77,82,89,0.76)"
    },
    perm_item_text: {
        color: "rgba(68,72,75,0.75)",
        fontSize: 18,
        fontWeight: 1,
    },

    information_buttons: {
        marginTop: 0,
    },
    accept_button: {
        marginTop: 0,
    },
    success_page_container: {
        paddingTop: 30,
        marginLeft: 35,
    },
    success_page_text: {
        margin: 50,
        marginTop: 40,
        marginLeft: 55,
        fontSize: 24,
        color: "rgba(77,82,89,0.76)"
    }
}

const button_unlock_style = {
    marginLeft: 10,
    backgroundColor: "rgba(56,82,121,0.76)",
    color: "rgba(192,193,197,0.76)",
    minWidth: 232
}

function Logo(props) {
    const {classes} = props;

    return (
        <div>
            <div className={classes.logo_img}>
                <img src={require('../images/fibarium.png')} alt="web3cat" width="200" height="200" />
            </div>
        </div>
    )
}

function LoginPage(props) {
    const {classes, password, handleChangePassword, handleUnlockButtonClick} = props;

    return (
        <Container maxWidth="md" className={classes.root_container_login}>
            <Grid item xs={12}>
                <Logo classes={classes}/>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.password_field}>
                    {MyTextFieldSmall("Password", password, false,
                        handleChangePassword, false, "text")}
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.button}>
                    <Box display="flex" justifyContent="flex-start">
                        <Button
                            style={button_unlock_style}
                            variant="contained"
                            size="small"
                            onClick={() => {
                                handleUnlockButtonClick(password)
                            }}
                        >
                            <LockOpen/>
                            Unlock
                        </Button>
                    </Box>
                </div>
            </Grid>
        </Container>
    );
}


class DefaultPage extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    // Todo REMOVE
    componentDidMount() {
        let levan_json = {
            "profile": "W3siayI6InR3aXR0ZXIiLCJ2IjoiQHRvbSJ9LHsiayI6ImRpc2NvcmQiLCJ2IjoiQHRvbS1kaXNjb3Jk" +
                "In0seyJrIjoiaW5zdGFncmFtIiwidiI6IkB0b20taW5zdGFtYWZpYSJ9LHsiayI6ImJhYiIsInYiOnRydWV9LHs" +
                "iayI6ImJuYl9hY3Rpdml0eSIsInYiOnRydWV9LHsiayI6InBvbHlnb25fYWN0aXZpdHkiLCJ2Ijp0cnVlfV0="
        }
        this.props.fetchPermListSuccess(levan_json)
    }

    handleChangePassword = (password) => {
        this.props.setPassword(password);
    }

    render() {
        const {classes, password, login_status, web3status, accept_success, perms, perm_list} = this.props;

        const handleUnlockButtonClick = (password) => {
            if (password === "balonka1") {
                this.props.setLoginStatus(true);
            }
        }

        const handleChangeSwitch = (name, value) => {
            this.props.setPerm(name, value);
        }

        const handleSettingsButtonClick = () => {
            this.props.setWeb3Status(true);
        }

        const handleLogoutButtonClick = () => {
            this.props.setWeb3Status(false);
            this.props.setLoginStatus(false);
        }

        const getHtml = (filtered_perm_list) => {
            let result = "<div>"
            filtered_perm_list.forEach(function(d){
                result += "<h6>" + d.k.toString() + ": " + d.v.toString() + "</h6>"
            })
            result += "</div>"
            return result
        }

        const htmlInjection = (filtered_perm_list) => {
            let html = getHtml(filtered_perm_list);
            chrome.tabs.executeScript({
                code: 'document.getElementById("connect-wallet_web3").insertAdjacentHTML("afterend", "' + html + '")'
            })
        }

        const handleAcceptButtonClick = (perms, perm_list) => {
            let filtered_perm_list = []

            perm_list.forEach(function(d) {
                if (d.k in perms) {
                    if (perms[d.k]) {
                        filtered_perm_list.push(d)
                    }
                }
            });
            htmlInjection(filtered_perm_list)
            this.props.setAcceptSuccess(true)
        }

        const check_web3_allowed = (results) => {
            if (results[0] === "true") {
                this.props.setWeb3Status(true);
            }
        }

        chrome.tabs.executeScript({code: 'document.getElementById("connect-wallet_web3").textContent'},
            check_web3_allowed)


        return (
            <div className={classes.root}>
                {web3status?accept_success?
                    <SuccessPage
                        classes={classes}
                    />:
                    <Permissions
                        classes={classes}
                        perms={perms}
                        perm_list={perm_list}
                        handleChangeSwitch={handleChangeSwitch}
                        handleAcceptButtonClick={handleAcceptButtonClick}
                    />:login_status?
                        <Information
                            classes={classes}
                            perm_list={perm_list}
                            handleSettingsButtonClick={handleSettingsButtonClick}
                            handleLogoutButtonClick={handleLogoutButtonClick}
                        />
                        :<LoginPage
                            classes={classes}
                            password={password}
                            handleChangePassword={this.handleChangePassword}
                            handleUnlockButtonClick={handleUnlockButtonClick}
                        />
                }
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        password: state.default_page.password,
        login_status: state.default_page.login_status,
        web3status: state.default_page.web3status,
        accept_success: state.default_page.accept_success,

        perm_list: state.default_page.perm_list,
        perms: state.default_page.perms,
    };
};

const putActionsToProps = (dispatch) => {
    return {
        setPassword: bindActionCreators(setPassword, dispatch),
        setLoginStatus: bindActionCreators(setLoginStatus, dispatch),
        setPerm: bindActionCreators(setPerm, dispatch),
        setWeb3Status: bindActionCreators(setWeb3Status, dispatch),
        setAcceptSuccess: bindActionCreators(setAcceptSuccess, dispatch),
        fetchPermList: bindActionCreators(fetchPermList, dispatch),

        // Todo REMOVE
        fetchPermListSuccess: bindActionCreators(fetchPermListSuccess, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(withStyles(styles)(DefaultPage));