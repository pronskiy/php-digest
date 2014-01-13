// main.js
var app = angular.module('myApp', ['ngGrid']);
app.controller('DigestCtrl', function($scope, Digest) {

  $scope.myData = [{name: "Moroni", age: 50},
    {name: "Tiancum", age: 43},
    {name: "Jacob", age: 27},
    {name: "Nephi", age: 29},
    {name: "Enos", age: 34}];

  $scope.links = Digest.links;
  $scope.gridOptions = {
    plugins: [new ngGridFlexibleHeightPlugin()],
    data: 'links'
  };
  Digest.getLinks();

  $scope.$watch(function() { return Digest.links; }, function(links) {
      $scope.links = links;
    }
  );
});

app.service('Digest', function($http) {
  var Digest = this;
  var thisIsPrivate = "Private";
  Digest.links = [];
  this.getLinks = function() {
    return $http.get('links.json').success(function(data, status, headers, config) {
      Digest.links = data;
      console.log(Digest.links);
    });
  };
});