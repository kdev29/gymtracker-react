import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const menuItems = [
  { label: 'Home', icon: HomeIcon, location: '/' },
  { label: 'New entry', icon: AddCircleOutlineIcon, location: '/addvisit/0/0' },
  { label: 'About', icon: InfoIcon, location: '/' },
];

const Layout = ({title, helperButton, children, ...props}) => {
    
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => { setIsOpen(true) }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Link style={{color: 'white', textDecoration: 'none'}} to={helperButton.location}>
            <helperButton.component style={{color: 'white', textDecoration: 'none'}}>

                {helperButton.label}
            </helperButton.component>
          </Link>
        </Toolbar>        
      </AppBar>
      <Drawer open={isOpen} onClose={() => { setIsOpen(false) }}>
          <List>
          {menuItems.map(m => (
            <Link style={{textDecoration: 'none', color: '#03033c'}} to={m.location}>
              <ListItem button>
                <ListItemIcon> <m.icon style={{ color: '#03033c'}} /></ListItemIcon>
                <ListItemText primary={m.label} />
              </ListItem>
            </Link>
          ))}
              
         
   
          </List>
      </Drawer>
      {
          children
      }
    </div>
  )
}

const withLayout = (Component, options) => {

  const { title, helperButton} = options;
  
  const layoutWrapper = (props) => {
    
        return (<>
        <Layout title={title} helperButton={helperButton}>         
        </Layout>
       <Component {...props} />
      </>)
      };

  return layoutWrapper;

}

export default withLayout;

