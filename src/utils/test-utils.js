import React from 'react';
import messages, { MessagesContext } from '../translations/messages';

// TODO: add tests
export const AppTestContainer = props => {
    return (
        <MessagesContext.Provider value={messages}>
            {props.children}
        </MessagesContext.Provider>
    );
}