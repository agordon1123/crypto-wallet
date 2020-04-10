import React, { useState, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import HomeIcon from '@material-ui/icons/Home';

const Footer = () => {
    const [value, setValue] = useState(0);
    const history = useHistory();
    const location = useLocation();
    console.log(value)

    const handleNavigation = path => {
        switch(path) {
            case "/":
                return 0
            case "/transactions":
                return 1
            case "/mine":
                return 2
            default:
                return 4
        }
    }

    useEffect(() => {
        setValue(handleNavigation(location.pathname));
    }, [location.pathname])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction onClick={() => history.push('/')} label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction onClick={() => history.push('/transactions')} label="Transactions" icon={<ReceiptIcon />} />
            <BottomNavigationAction onClick={() => history.push('/mine')} label="Mine" icon={<LocationSearchingIcon />} />
        </BottomNavigation>
    );
};

export default Footer;