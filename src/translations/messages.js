import React from 'react';

const messages = {
    ADD: 'Add',
    X: 'x',
    FIRST: '1st',
    SECOND: '2nd',
    CLOSE: 'close',
    OPEN: 'open',
    ADD_A_RANDOM_COLOR: 'Add a random color',
    GRADIENT_TYPE: 'Gradient Type',
    LINEAR: 'linear',
    RADIAL: 'radial',
    CONIC: 'conic',
    DEGREES: 'degrees',
    ENDING_SHAPE: 'Ending Shape',
    CIRCLE: 'Circle',
    ELLIPSE: 'Ellipse',
    SIZE: 'Size',
    CLOSEST_SIDE: 'closest-side',
    FARTHEST_SIDE: 'farthest-side',
    CLOSEST_CORNER: 'closest-corner',
    FARTHEST_CORNER: 'farthest-corner',
    X_POSITION: 'x position %',
    Y_POSITION: 'y position %',
    COLOR: 'Color',
    TYPE_THE_COLOR: 'Type the Color',
    HEXADECIMAL_FORMAT_EXPLAINER: 'Hexadecimal format (ie, a "#", followed by exactly 6 characters. Those 6 characters must be either the digits 0 through 9, or one of the letters, a, b, c, d, e, or f',
    COLOR_PICKER: 'Color Picker',
    OPTIONAL_STOP_PERCENTS: 'Optional Stop Percents',
    DELETE_COLOR: 'Delete Color',
    FULLSCREEN: `Press 'Escape' to toggle full screen mode`
};

export default messages;

export const MessagesContext = React.createContext({});