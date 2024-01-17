import React from 'react';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { resetBlockType, createEmptyBlock } from '../utils/EditorUtils';
import { HEADER_TEXT_TYPE, BOLD_TEXT_TYPE, RED_TEXT_TYPE, UNDER_LINE_TEXT_TYPE } from '../configs/constants';

function CustomEditor({ editorState, setEditorState }) {

    const customBlockStyleFn = (block) => {
        switch (block.getType()) {
            case HEADER_TEXT_TYPE:
                return 'block text-2xl font-bold';
            case BOLD_TEXT_TYPE:
                return 'block font-bold';
            case RED_TEXT_TYPE:
                return 'block text-red-500';
            case UNDER_LINE_TEXT_TYPE:
                return 'block underline';
            default:
                return 'block';
        };
    };

    const getBlock = (currentEditorState = editorState) => {
        const selection = currentEditorState.getSelection();
        return currentEditorState.getCurrentContent().getBlockForKey(selection.getStartKey());
    };

    const customHandleBeforeInput = (chars, curEditorState) => {
        if(chars === ' ') {
            const currentBlock = getBlock(curEditorState);
            const blockType = currentBlock.getType();
            const blockLength = currentBlock.getLength();
            if (blockLength === 3 && currentBlock.getText() === '***') {
                setEditorState(resetBlockType(curEditorState, blockType !== UNDER_LINE_TEXT_TYPE && UNDER_LINE_TEXT_TYPE));
            } else if (blockLength === 2 && currentBlock.getText() === '**') {
                setEditorState(resetBlockType(curEditorState, blockType !== RED_TEXT_TYPE && RED_TEXT_TYPE));
            } else if (blockLength === 1 && currentBlock.getText() === '#') {
                setEditorState(resetBlockType(curEditorState, blockType !== HEADER_TEXT_TYPE && HEADER_TEXT_TYPE));
            } else if (blockLength === 1 && currentBlock.getText() === '*') {
                setEditorState(resetBlockType(curEditorState, blockType !== BOLD_TEXT_TYPE && BOLD_TEXT_TYPE));
            } else {
                return false;
            };
            return true;
        };
        return false;
    };

    const customHandleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command); 
        if (newState) {
            setEditorState(newState);
            return true;
        };
        return false;
    };

    const customHandleReturn = (command, curEditorState) => {
        setEditorState(createEmptyBlock(curEditorState));
        return 'handled';
    };

    return (
        <div class="p-2 h-full overflow-auto border border-blue-400 shadow-lg scroll-auto">
            <Editor 
                editorState={editorState} 
                onChange={setEditorState}
                blockStyleFn={customBlockStyleFn}
                handleReturn={customHandleReturn}
                handleBeforeInput={customHandleBeforeInput}
                handleKeyCommand={customHandleKeyCommand} />
        </div>
    );
};

export default CustomEditor;