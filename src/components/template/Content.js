import React from 'react';

export default props => {

    return (
        <div className="content" >
            <div className="container-fluid">
                {props.children}
            </div>
        </div >

    )
}