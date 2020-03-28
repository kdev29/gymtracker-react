import React from 'react';
import { Link } from 'react-router-dom';

const Layout = (props) => {
    debugger;
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      
      <span className="mdl-layout-title"><Link className="mdl-navigation__link" to={'/home'}>App</Link></span>
      
      <div className="mdl-layout-spacer"></div>
      
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        
        <Link className="mdl-navigation__link" to={'/home'}>Home</Link>

          
      </nav>
    </div>
  </header>
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Menu</span>
    <nav className="mdl-navigation">
       
    <Link className="mdl-navigation__link" to={'/home'}>Home</Link>
                 
    </nav>
  </div>
  <main className="mdl-layout__content">
    <div className="page-content">
      {props.children}
    </div>
  </main>
</div>
    );

}

export default Layout;