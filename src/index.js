import React from 'react';
import {STORY_RENDERED} from '@storybook/core-events';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/styles/hljs';
import { PARAM_KEY } from './panel';

class CompSource extends React.Component {
    state = { code: '', ext: '' };

    componentDidMount() {
        const { api } = this.props;
        api.on(STORY_RENDERED, this.onStoryChange);
    }

    componentWillUnmount() {
        const { api } = this.props;
        api.off(STORY_RENDERED, this.onStoryChange);
    }

    onStoryChange = id => {
        const { api } = this.props;
        const params = api.getParameters(id, PARAM_KEY);
        if (params && !params.disable && params.publicPath) {
            const value = params.publicPath;
            const vueTemplate = localStorage.getItem(`vue_template:${value}`);
            const baseBuffer = new Buffer(vueTemplate || '', 'base64');
            const fileData = baseBuffer.toString();
            let parsedData = {};
            try{
                parsedData = JSON.parse(fileData);
            }catch (e) {
                    console.log('Error : ', e);
            }
            this.setState({ code: parsedData.source, ext: parsedData.ext });
        } else {
            this.setState({ code: undefined });
        }
    };

    render() {
        const { code = '', ext = '' } = this.state;
        const { active } = this.props;
        return active ? (
            code ? <SyntaxHighlighter
                showLineNumbers={true}
                language={ext}
                style={dracula}>
                {code}
            </SyntaxHighlighter> : 'No source found.'
        ) : null;
    }
}

export { CompSource };