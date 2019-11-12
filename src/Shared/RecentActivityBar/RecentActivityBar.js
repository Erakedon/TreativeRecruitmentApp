import React from 'react';
import Activities from '../../Models/Activities';

const RecentActivityBar = props => {
    let activitiesToRender = [];

    props.activities.forEach((activity,i) => {
        activitiesToRender.push(
            <div className={"activity " + activity.type} key={activity.key}>
                {Activities[activity.type].icon}
                <div className="info">{Activities[activity.type].info}</div>
            </div>
        );
    });

    return ( 
        <div className="RecentActivityBar">
            {activitiesToRender}
        </div>
        );
}

 
export default RecentActivityBar;