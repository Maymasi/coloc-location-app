import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { User, BellDot, Logs} from 'lucide-react';
import '../../assets/styles/TopNav.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopNav({handleLogsClick}) {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [userAnchorEl, setUserAnchorEl] = React.useState(null);
    const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);

    const userMenuOpen = Boolean(userAnchorEl);
    const notifMenuOpen = Boolean(notifAnchorEl);

    const handleUserMenuClick = (event) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleNotifMenuClick = (event) => {
        setNotifAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserAnchorEl(null);
    };

    const handleNotifMenuClose = () => {
        setNotifAnchorEl(null);
    };
    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                justifyContent: 'space-between',
                zIndex: 1201,
                backgroundColor: "white",
                height: '80px',
                boxShadow: 'none',
                borderBottom: '1px solid hsl(0, 0%, 92%)',
                width: '100%',
                padding: '0 1rem',
                margin: '0 auto',
                alignItems: 'center',
                display:'flex',
                flexDirection:'row'
            }}
        >
           {/* Menu hamburger - seulement visible sur écrans < 1280px */}
           <Logs 
                className='menuBarUser'
                onClick={handleLogsClick}
                style={{
                    color:'black',
                    display: window.innerWidth >= 1280 ? 'none' : 'block'
                }}
            />
            
            <Toolbar style={{ gap: '1rem', height:'100%', marginLeft: 'auto' }}>
                <React.Fragment>
                    {/* Notification Icon - toujours visible */}
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <BellDot
                            size={24}
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={handleNotifMenuClick}
                            aria-controls={notifMenuOpen ? 'notif-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={notifMenuOpen ? 'true' : undefined}
                            className='user-icon'
                        />
                    </Box>

                    {/* User Icon - toujours visible */}
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <User
                            size={24}
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={handleUserMenuClick}
                            aria-controls={userMenuOpen ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={userMenuOpen ? 'true' : undefined}
                            className='user-icon'
                        />
                    </Box>

                    {/* User Menu */}
                    <Menu
                        style={{ borderRadius: '12px' }}
                        anchorEl={userAnchorEl}
                        id="account-menu"
                        open={userMenuOpen}
                        onClose={handleUserMenuClose}
                        onClick={handleUserMenuClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    borderRadius: '12px',
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleUserMenuClose}>
                            <Avatar /> Mon Compte
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleUserMenuClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Profil
                        </MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Paramètres
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Déconnexion
                        </MenuItem>
                    </Menu>

                    {/* Notification Menu */}
                    <Menu
                        sx={{ borderRadius: '12px' }}
                        anchorEl={notifAnchorEl}
                        id="notif-menu"
                        open={notifMenuOpen}
                        onClose={handleNotifMenuClose}
                        onClick={handleNotifMenuClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    borderRadius: '12px',
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleNotifMenuClose}>
                            Notifications
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleNotifMenuClose}>
                            Nouveau message
                        </MenuItem>
                        <MenuItem onClick={handleNotifMenuClose}>
                            Demande de colocation
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            </Toolbar>
        </AppBar>
    );
}