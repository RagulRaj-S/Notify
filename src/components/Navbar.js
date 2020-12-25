import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'

class Navbar extends React.Component {
    render(){
        return (
            <div>
                   <nav>
                    <div class="nav-wrapper">
                    <span className="brand-logo center">Notify</span>
                    </div>
                </nav>
            </div>
        );
    }
  }

export default Navbar;
