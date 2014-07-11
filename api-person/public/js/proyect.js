
$(document).ready(function() {

	

	/*$('#btnAccept').click(function() {
              alert("Te amo Mariela <3")  
		});*/

});


$("#btnAddOrUp").click(function() {
       $("#personTable").after(
        '<div class="alert alert-success alert-dismissable">'+
            '<button type="button" class="close" ' + 
                    'data-dismiss="alert" aria-hidden="true">' + 
                '&times;' + 
            '</button>' + 
            'Usuario Guardado correctamente' + 
         '</div>');
 }); 



     var app = angular.module("myapp", ["firebase"]);


      function MyController($scope, $firebase,$http) {

        $scope.actualId="";
        
        function reload(){
          $http({method: 'GET', url: 'http://192.168.1.71:3000/people'}).
          success(function(data, status, headers, config) {
              $scope.people = data;
          }).
          error(function(data, status, headers, config) {
          
          });
        }
        reload();

        $scope.addPerson = function(e) {
             
           var data= {}; 
             data.name = $scope.name;
             data.lastName = $scope.lastName;
             data.lastName2 = $scope.lastName2;
                      
          if ($scope.actualId=="") {
            $http.post('http://192.168.1.71:3000/person', 
              data, {headers: [{ 'Content-Type': 'application/json'}]} ).success(function (data,status,headers,config){
                console.log('Entro a success');
                reload();

              });

              
          } else{
            $http.put('http://192.168.1.71:3000/person/'+$scope.actualId, 
              data, {headers: [{ 'Content-Type': 'application/json'}]} ).success(function (data,status,headers,config){
                reload();

              });


              $scope.actualId="";
          };
          $scope.name="";
          $scope.lastName="";
          $scope.lastName2="";

        }

        $scope.destroy = function(e,key) {
            
           reload(); 
          $http({method: 'DELETE', url: 'http://192.168.1.71:3000/person/'+key}).success(
            function(data, status, headers, config) {
              console.log('Entro a delete ');
              

            }).error(
            function(data, status, headers, config) {

            });

        }

        $scope.destroyAll = function(e) {
          
        }

        $scope.select = function(e,key) {

          $http({method: 'GET', url: 'http://192.168.1.71:3000/person/'+key}).
            success(function(data, status, headers, config) {
             
            $scope.actualId=key;  
            $scope.name=data.name;
            $scope.lastName=data.lastName;
            $scope.lastName2=data.lastName2;

          }).
          error(function(data, status, headers, config) {
          });

          
        }

      }








