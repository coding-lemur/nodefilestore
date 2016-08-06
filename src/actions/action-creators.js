export const ADD_FILES = 'ADD_FILES';
export const UPLOAD_FILES = 'UPLOAD_FILES';
export const CLEAR_FILES = 'CLEAR_FILES';
export const DELETE_FILE = 'DELETE_FILE';

export function addFiles(files) {
    return {
        type: ADD_FILES,
        files: files
    };
}

export function uploadFiles() {
    return {
        type: UPLOAD_FILES
    };
}

export function clearFiles() {
    return {
        type: CLEAR_FILES
    };
}

export function deleteFile(file) {
    return {
        type: DELETE_FILE,
        file: file
    };
}
