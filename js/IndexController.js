angular.module("app", [])
    .controller("IndexController", IndexController);

function IndexController(){
    let self = this;
    self.title = "ta tudo funcionando";
}