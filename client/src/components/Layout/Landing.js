import React from "react";
import {Link} from 'react-router-dom'
const Landing = () => {
  return (
    
    <div>
         <div className="spacer">
                &nbsp;
            </div>
            <br/>
            <br/>
            <br/>
      <div>
          <Link to = '/register'>
          <button type="button" className="btn btn-primary px-4">Try Now</button>
          </Link>
      
</div>
    </div>
    
  );
};

export default Landing;
