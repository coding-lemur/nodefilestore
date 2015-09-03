import FileViewModel from './viewmodels/Main.controller';

export default class MainController {
    constructor() {
        this.files = [new FileViewModel(), new FileViewModel(), new FileViewModel()];
    }

    addFile() {
        alert('add me!');
    }
}