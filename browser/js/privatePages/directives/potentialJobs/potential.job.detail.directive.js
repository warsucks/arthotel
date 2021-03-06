app.directive('potentialJobDetail', (PostingFactory, $state) => {
  return {
    restrict: 'EA',
    scope: {
      posting: "=",
      artist: '=',
      type: '='
    },
    templateUrl: 'js/privatePages/directives/potentialJobs/potential.job.detail.html',
    link: (scope, element, attrs) => {
        var deleteRequest = (projectId, artistId) => {
          PostingFactory.rejectArtist(artistId, projectId)
            .then(() => {
              $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true }); 
            });
          };

        var deleteSaved = (projectId, artistId) => {
          PostingFactory.removeSaveArtist(artistId, projectId)
          .then(() => {
            $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true }); 
          });
        };

        scope.confirmDelete = (project, artistId, type) => {
          bootbox.confirm(`Are you sure you want to un${type} ${project.title}?`, function(result) {
              if (result) {
                if(type === 'request')
                  deleteRequest(project._id, artistId);
                else if(type === 'saved')
                  deleteSaved(project._id, artistId);
              }
            });
        };

        scope.request = () => {
          PostingFactory.requestPosting(scope.posting._id)
          .then((res) => {
            $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true }); 
          });
        };
    }


  };
});
