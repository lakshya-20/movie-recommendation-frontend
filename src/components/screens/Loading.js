import React from 'react';

export const Loading=()=>{
    return(
        <div className="col-12 text-danger">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw "></span>
            <p className="text-dark">Loading...</p>
        </div>
    )
}