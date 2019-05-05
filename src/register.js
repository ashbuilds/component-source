// register.js
import React from 'react';
import addons, { types } from '@storybook/addons';

import { CompSource } from "./index";
import {ADDON_ID, PANEL_ID} from './panel';

addons.register(ADDON_ID, api => {
    const render = ({ active }) => {
        return <CompSource api={api} active={active} />
    };
    const title = 'Source';
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title,
        render,
    });
});