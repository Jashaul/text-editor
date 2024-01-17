import { useState } from "react";
import Button from "./components/CustomButton";
import Editor from "./components/CustomEditor";
import { loadState, saveState } from "./utils/EditorUtils";

function App() {
    const [editorState, setEditorState] = useState(() => loadState(), );

    return (
        <div class="px-10 pb-10 h-screen min-h-80 max-h-screen bg-white flex flex-col">
            <div class="p-2 flex flex-row justify-between items-center">
                <div class="text-xl font-medium text-black">
                Demo editor by Jashaul
                </div>
                <Button onClickHandler={() => saveState(editorState.getCurrentContent())} />
            </div>
            <Editor editorState={editorState} setEditorState={setEditorState} />
        </div>
    );
};

export default App;
