import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import PageTitleBar from '../../PageTitleBar';
import * as Consts from '../../../../../Consts';

import Template_SetupStatement from './template_SetupStatement';

const IBBlankSetup = ({ ReturnToSelection, user_Chat_Active, LaunchChatEvent }) => {

    const [statementCount, SetStatementCount] = useState(1);

    // TODO: Allow user to select however many statements they wish? Maybe to max of 3 or 5? Maybe as many as they want, they're funeral if it's too many,
    // Otherwise we could be blocking a really fun idea someone might have by doing many of them.

    // TODO: Allow for the receiver to select from pre-conveived options? Or must type in their own answer.... maybe each statement, sender can decide?

    var elem_Form = React.createRef();

    const OnAdd = (event) => {
        event.preventDefault();

        SetStatementCount(statementCount + 1);
    };

    const OnSend = (event) => {
        event.preventDefault();

        // TODO: Validate inputs? LOW PRIORITY
        LaunchChatEvent({ 
            type: Consts.msgTypes.CE_BLANK,
            data: {

            }              
        }, false);

        setTimeout(() => {
            LaunchChatEvent({ 
                type: Consts.msgTypes.CE_BLANK,
                data: {

                }             
            }, true);
        }, Consts.CE_MSG_DELAY);
    };

    var html_setupStatements = [];
    for(let i = 0; i < statementCount; i++) {
        html_setupStatements.push(<Template_SetupStatement />);
    }

    return (
        <div className="h-100 w-100 d-flex flex-column">
            <PageTitleBar BackFunc={ReturnToSelection} title="Blanks" subtitle={user_Chat_Active ? "" : " [user offline]"} />
            <div className="bg-secondary p-2 flex-grow-1 position-relative" role="group">
                <fieldset disabled={!user_Chat_Active}>
                    <form ref={form => elem_Form = form} className="maxW1000 m-0Auto reimplementScroll">
                        <label className="text-light small">Select a number of statements, and a portion of each to be presented as "______" to the recipient, who will fill in their own blanks before seeing yours.</label>
                        <label className="text-light small">Any statement setups without at least some text before or after the "shown-as-blank" text will be ignored.</label>
                        <label className="text-light small">e.g. "Show me your _________, and I'm all yours!" (blank: collection of human thumbs)</label>
                        
                        <ul className="list-group d-flex flex-column mt-2">
                            { 
                                html_setupStatements.map((statement, i) => 
                                    <li className="list-group-item flex-grow-1 maxW1000 m-0 mt-2 p-2 innerScrollItem" key={i}>
                                        {statement}
                                    </li>
                                )
                            }
                        </ul>

                        <div>
                            <button type="button" className="btn bgLightBlue text-white m-0Auto mt-2" onClick={OnAdd}>
                                <i className="fas fa-plus-circle fa-2x"></i>
                            </button>
                        </div>
                        <button type="button" className="btn bgLightBlue text-white m-0Auto mt-2 innerScrollItem" onClick={OnSend}>Send</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default IBBlankSetup;