import './styles/style.scss';

import angular from './../public/libs/angularjs/angular';
import MainController from './Main.controller';
import FilePickerDirective from './FilePicker/FilePicker.directive';

angular
    .module('UploadApp', [])
    .controller('MainController', MainController)
    .directive('filePicker', FilePickerDirective);