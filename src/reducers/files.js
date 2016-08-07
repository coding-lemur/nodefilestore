import * as actionCreators from '../actions/action-creators';

export default function files(state = [], action) {
    switch (action.type) {
        case actionCreators.ADD_FILES:
            return state.concat(action.files);
        case actionCreators.DELETE_FILE:
            const indexToRemove = state.indexOf(action.file);
            return [
                ...state.slice(0, indexToRemove),
                ...state.slice(indexToRemove + 1)
            ];
        case actionCreators.CLEAR_FILES:
            return [];
        default:
            return state;
    }
}
