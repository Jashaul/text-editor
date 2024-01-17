import { EditorState, genKey, convertToRaw, convertFromRaw } from "draft-js";
import { EDITOR_STORE } from "../configs/constants";

/*
Changes the block type of the current block.
*/
export const resetBlockType = (editorState, newType = 'unstyled') => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);
    let newText = '';
    const text = block.getText();
    if (block.getLength() >= 2) {
        newText = text.substr(text.length);
    }
    const newBlock = block.merge({
        text: newText,
        type: newType,
    });
    const newContentState = contentState.merge({
      blockMap: blockMap.set(key, newBlock),
      selectionAfter: selectionState.merge({
        anchorOffset: 0,
        focusOffset: 0,
      }),
    });
    return EditorState.push(editorState, newContentState, 'change-block-type');
};

/*
Add new line, and changes the block type to plain text.
*/
export const createEmptyBlock = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);
    const newkey = genKey();
    const newBlock = block.merge({
        key: newkey,
        type: "unstyled",
        text: ""
    });
    const newContentState = contentState.merge({
        blockMap: blockMap.set(newkey, newBlock),
        selectionAfter: selectionState.merge({
            anchorKey: newkey,
            anchorOffset: 0,
            focusKey: newkey,
            focusOffset: 0,
            isBackward: false,
        }),
    });
    return EditorState.push( editorState, newContentState, "split-block");
};

/*
Stores the Editor state to localStorage.
*/
export const saveState = (data) => {
    try {
        const rawData = convertToRaw(data);
        localStorage.setItem(EDITOR_STORE, JSON.stringify(rawData));
        // TODO: add toast
        alert("Saved");
    } catch (error) {
        console.error(error);
        alert("Failed to save");
    };
};

/*
Fetches the Editor state from localStorage.
*/
export const loadState = () => {
    try {
        const data = localStorage.getItem(EDITOR_STORE);
        if (data) {
            return EditorState.createWithContent(convertFromRaw(JSON.parse(data)));
        } else {
            return EditorState.createEmpty();
        }
    } catch (error) {
        console.log("Failed to load state", error);
    };
};