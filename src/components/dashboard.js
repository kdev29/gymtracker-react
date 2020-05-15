import React from 'react';
import { useEffect } from 'react';
import Counter from './counter';
import * as visitActions from '../redux/actions/visitsActions';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import TableFolderListing from './VisitasListing';


const MainDashboard = ({history, ...props}) => {

  
    //use effect hook
    useEffect(() => {
                    
        if(props.visits.length === 0) {

          props.actions.loadVisits();
        }
  
    })
    
    

    return (
        <React.Fragment>            
 
            <Counter visits={props.visits}></Counter>
            
            <TableFolderListing visits={props.visits}></TableFolderListing>
          
        </React.Fragment>
        
    );
}

//state gets injected by redux
const mapStateToProps = (state) => {
  return {
      visits: state.visits
  }
}

//dispatch gets injected by redux
const mapDispatchToProps = (dispatch) => {
  return {
    //dispatch is what notifies redux about an action
    actions: {
        loadVisits: bindActionCreators(visitActions.loadVisits, dispatch)       
    }        
}
}

//connect the component to redux store and export it
export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);
