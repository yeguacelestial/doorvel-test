"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = () => {
    return (
        <AppBar position="static" sx={{ width: "100%", backgroundColor: "#FF6600" }}>
            <Toolbar>
                {/* Logo */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Doorvel
                </Typography>

                {/* Home Button */}
                <Button color="inherit">Home</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;