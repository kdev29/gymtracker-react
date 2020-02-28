import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

const VisitasListing = (props) => {

    const classes = useStyles();

    const handleVisitClick = () => {
        window.location = '/visitadetail';
    }

    return (
        <Container fixed>
            <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {
                    props.visits.map(v => (
                    <ListItem onClick={handleVisitClick} key={v.visitId} button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={v.activity} />
                    </ListItem>                                        
                      ))
                }
                  </List>        
            </div>
        </Container>
    );
}

export default VisitasListing;