import {TextField} from "@material-ui/core";

export function getKey() {
    return Math.random() * Math.random()
}


export function getPermName(key) {
    switch (key.toLowerCase()) {
        case "wallet":
            return "Wallet number";
        case "bab":
            return "Binance Account Bound";
        case "twitter":
            return "Twitter";
        case "discord":
            return "Discord";
        case "instagram":
            return "Instagram";
        case "bnb_activity":
            return "BNB Chain Activity";
        case "polygon_activity":
            return "Polygon Activity";
        default:
            return "Unknown";
    }
}


export function getPermShortName(key) {
    switch (key.toLowerCase()) {
        case "wallet":
            return "Wallet";
        case "bab":
            return "BAB";
        case "twitter":
            return "Twitter";
        case "discord":
            return "Discord";
        case "instagram":
            return "Instagram";
        case "bnb_activity":
            return "BNB Chain";
        case "polygon_activity":
            return "Polygon";
        default:
            return "Unknown";
    }
}

export function MyTextFieldSmall(my_label, my_value, is_disabled, handle_fnc, is_error, my_type) {
    if (is_error) {
        return <TextField
            error
            label={my_label}
            type={my_type}
            // placeholder={label}
            variant="outlined"
            value={my_value}
            disabled={is_disabled}
            size="small"
            onChange={(e) => handle_fnc(e.target.value)}
        />
    }
    else {
        return <TextField
            label={my_label}
            // placeholder={label}
            type={my_type}
            variant="outlined"
            value={my_value}
            disabled={is_disabled}
            size="small"
            onChange={(e) => handle_fnc(e.target.value)}
        />
    }
}