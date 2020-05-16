import React from 'react';
import PageTitleBar from '../../PageTitleBar';

const IBTrap = ({ ReturnToSelection }) => (
    <div className="h-100 w-100 d-flex flex-column">
        <PageTitleBar BackFunc={ReturnToSelection} title="Trap" subtitle="" />
        <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">

        </div>
    </div>
);

export default IBTrap;