import './styles/style.scss';
import angular from './../public/libs/angularjs/angular';
import MainController from './Main.controller';

angular
    .module('UploadApp', [])
    .controller('MainController', MainController);