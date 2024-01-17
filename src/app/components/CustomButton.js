function CustomButton({ onClickHandler }) {
    return (
        <button onClick={onClickHandler} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Save
        </button>
    );
};

export default CustomButton;