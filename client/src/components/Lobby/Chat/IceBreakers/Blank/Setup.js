import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import PageTitleBar from '../../PageTitleBar';
import * as Consts from '../../../../../Consts';

import Template_SetupStatement from './template_SetupStatement';

const IBBlankSetup = ({ ReturnToSelection, user_Chat_Active, LaunchChatEvent }) => {

    const [statementCount, SetStatementCount] = useState(1);

    var elem_Form = React.createRef();
    var elem_RevealAllCheckbox = React.createRef();

    const OnAdd = (event) => {
        event.preventDefault();

        SetStatementCount(statementCount + 1);
    };

    const OnSend = (event) => {
        event.preventDefault();

        var statements = [];
        const lis = elem_Form.getElementsByClassName("statementLI");

        for(let i = 0; i < lis.length; i++) {
            const elemPreBlank = lis[i].getElementsByClassName("statementPreBlank")[0];
            const elemAsBlank = lis[i].getElementsByClassName("statementAsBlank")[0];
            const elemPostBlank = lis[i].getElementsByClassName("statementPostBlank")[0];

            // The field to be blank must contain something, as well as at least one of the fields that come before or after.
            if(elemAsBlank.value !== "" && (elemPreBlank.value !== "" || elemPostBlank.value !== "")) {
                statements.push({
                    preBlank: elemPreBlank.value,
                    asBlank: elemAsBlank.value,
                    blankGuess: "", // This will become populated by the recipient, one-by-one.
                    guessMatch: false,
                    postBlank: elemPostBlank.value
                });
            }
        }

        const revealAllAtOnce = elem_RevealAllCheckbox.checked;

        LaunchChatEvent({ 
            type: Consts.msgTypes.CE_BLANK,
            data: { 
                step: Consts.blankSteps.INIT
            }              
        }, false);

        setTimeout(() => {
            LaunchChatEvent({ 
                type: Consts.msgTypes.CE_BLANK,
                data: { 
                    step: Consts.blankSteps.INIT,
                    statements,
                    revealAllAtOnce
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
                                    <li className="list-group-item flex-grow-1 maxW1000 m-0 mt-2 p-2 innerScrollItem statementLI" key={i}>
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
                        <div className="form-check mt-3">
                            <input type="checkbox" ref={checkbox => elem_RevealAllCheckbox = checkbox} className="form-check-input" id="RevealAllAtOnceCheck"/>
                            <label className="form-check-label text-light" htmlFor="RevealAllAtOnceCheck">Reveal all statements at once</label>
                        </div>
                        <button type="button" className="btn bgLightBlue text-white m-0Auto mt-2 innerScrollItem" onClick={OnSend}>Send</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default IBBlankSetup;