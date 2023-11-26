var app = angular.module('notepadapp', []);
app.controller('notepadctrl', function ($scope) {
    $scope.text = "";
    $scope.save = function () {
        //A blob object is simply a group of bytes that holds the data stored in a file.
        $scope.blob = new Blob([$scope.text], { type: 'text/plain' });
        $scope.link = document.createElement('a'); //this will create a anchor element in document
        //which will be used as a link to trigger download
        $scope.link.download = 'notepad.txt'; //name of the file which will be downloaded
        $scope.link.href = window.URL.createObjectURL($scope.blob);
        $scope.link.click();//initiate downloading with the link
        //after you download then textarea will be clear
        $scope.text = "";
    };
    $scope.clear = function () {
        $scope.text = "";
    };
    $scope.openfile = function (event) {
        $scope.input = event.target;
        $scope.reader = new FileReader();
        $scope.reader.onload = function () {
            $scope.mytext = $scope.reader.result;
            $scope.$apply(function () {
                $scope.text = $scope.mytext;
            });
        };
        $scope.reader.readAsText($scope.input.files[0]);
    };

});