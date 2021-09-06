import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import messages, { MessagesContext } from '../translations/messages';
import { AppTestContainer } from './test-utils';
const { ADD } = messages;

describe('test-utils', () => {
    describe('<AppTestContainer />', () => {
        it('provides a Context with the messages values', () => {
            render(
                <AppTestContainer>
                    {React.createElement(
                        () => {
                            const { ADD } = useContext(MessagesContext);
                            return ADD;
                        }
                    )}
                </AppTestContainer>
            );
            expect(screen.getByText(ADD)).toBeInTheDocument();
        });
    });
});