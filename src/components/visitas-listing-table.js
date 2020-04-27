import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
  } from "react-router-dom";

const useStyles = makeStyles({
    table: {
      minWidth: 650      
    },
  });

  /*Main functional component*/
const TableListing = (props) => {
    const classes = useStyles();
    const visits = props.visits;
    const [redirect, setRedirect] = useState({ isRedirect: false, location: ""});

    /*inner functions*/


    const handleRedirect = (e, data) => {
      setRedirect({isRedirect: true, location: '/visitadetail/' + data});
    }

    if(redirect.isRedirect) {
      
      return (<Redirect to={redirect.location} />)
    }
    

    /*end inner functions*/

    return (
      <div style={{maxWidth: '80%', margin: '0 auto'}}>
        <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Visit ID</TableCell>
                    <TableCell align="right">Activity</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Is checked out?</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {visits.map(v => (
                    
                    <TableRow key={v.visitId} onClick={(e) => handleRedirect(e, v.visitId) } >
                      <TableCell component="th" scope="row">
                        <Link to={"/addvisit?visitid=" + v.visitId + "&fecha=" + v.date}>{v.visitId}</Link>
                          
                      
                      </TableCell>
                      <TableCell align="right">{v.activity}</TableCell>
                      <TableCell align="right">{v.date}</TableCell>
                      <TableCell align="right">{v.time}</TableCell>
                      <TableCell align="right">{v.isCheckedOut}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

                  {
                    visits.length == 0 && (<LinearProgress />)
                  }

        
      </div>
  );
}

export default TableListing;