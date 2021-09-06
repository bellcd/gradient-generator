import React from 'react';
import messages, { MessagesContext } from '../translations/messages';

export const AppTestContainer = props => {
    return (
        <MessagesContext.Provider value={messages}>
            {props.children}
        </MessagesContext.Provider>
    );
}