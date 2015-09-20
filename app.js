
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
			'ui.bootstrap'
			])
//Defining controller
.controller('Ctrl',function($scope,$http){
	// Function to fetch the number of issues
	$scope.fetchData = function(){
		if(!$scope.inputUrl)
		{
			$scope.error="Please enter an URL "
		}
		else{
			var url=$scope.inputUrl.split('/');
			//check if url is correct format
			if(url[0]==='https:' && url[1]===''&& url[2]==='github.com'&& url[3] && url[4]){
				var today=new Date();
				var lastDay =new Date();
				lastDay.setDate(today.getDate() - 1);
		        var lastWeek=new Date();
		        lastWeek.setDate(today.getDate() - 7);
		        $scope.issuesBeforeLastWeek =0;
		        $scope.issuesLast24Hours =0;
		        $scope.issuesLastWeek =0;
		        //service call to get total number of issues 	
				$http.get('https://api.github.com/repos/'+url[3]+'/'+url[4])
					.success(function (data) {
				       	$scope.totalIssues=data.open_issues_count;
			           	var noOfPage = ($scope.totalIssues/100)+1;
			           	for (var i=1;i<=noOfPage;i++){
			           	// call to get the calculate issues per page and get total open issues
			           	$http.get('https://api.github.com/repos/'+url[3]+'/'+url[4]+'/issues?page='+i+'&per_page=100')
							.success(function (response) {
								for(var j=0;j<response.length;j++){
									var updateDate = new Date(response[j].updated_at);
									if(updateDate > lastDay)
										$scope.issuesLast24Hours= $scope.issuesLast24Hours+1;
									else if(updateDate > lastWeek && updateDate < lastDay)
										$scope.issuesLastWeek = $scope.issuesLastWeek +1; 
									else
										$scope.issuesBeforeLastWeek = $scope.issuesBeforeLastWeek +1;
								}
				            })
					        .error(function () {
					        	$scope.totalIssues=0;
					          	$scope.error="Error in retrieving data per page";
				            });	
			    	
			           	}
					})
		        	.error(function () {
		        		$scope.totalIssues=0;
		          	$scope.error="Error in retrieving data";
		            });	
		    }
		    else{
		    	$scope.totalIssues=0;
		    	$scope.error="Invalid url!! Please enter in format https://github.com/user/repository";
		    }
	    }
    };
});

