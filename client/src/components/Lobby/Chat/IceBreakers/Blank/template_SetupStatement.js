import React from 'react';

const Template_SetupStatement = () => (
    <div className="form-group m-0">
        <div><input type="text" className="form-control statementPreBlank" placeholder="Pre-blank text"></input></div>
        <div><input type="text" className="form-control statementAsBlank" placeholder="Shown-as-blank text"></input></div>
        <div><input type="text" className="form-control statementPostBlank" placeholder="Post-blank text"></input></div>
    </div>
);

export default Template_SetupStatement;