app.directive('artistActiveJob', function ($state, PostingFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/activeJobs/artist.active.job.html',
        link: function(scope){
          // elem.on('click', function(){
          //   $state.go('detailedPosting', {postingId: scope.job._id});
          // });

          scope.artistCompleted = function(){

            PostingFactory.changePostingStatus(scope.job._id, "pendingApproval")
            .then(function(posting)
            {
              $state.go('privatePage.artistTab', {reload:true});
            });
          }
        }
    };
});
