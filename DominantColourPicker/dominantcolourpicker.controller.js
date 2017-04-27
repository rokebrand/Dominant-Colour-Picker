angular.module("umbraco")
    .controller("League.DominantColourPickerController",

	function ($scope, $filter, assetsService, editorState, contentEditingHelper, mediaResource, mediaHelper) {
		assetsService
			.load([
				"/App_Plugins/DominantColourPicker/assets/mustache.js",
				"/App_Plugins/DominantColourPicker/assets/color-thief.js",
				"/App_Plugins/DominantColourPicker/assets/dominantColourPicker.js"
			])
			.then(function () {

			});

		$scope.imagePath = "";
		$scope.media = null;
		$scope.showImage = false;
		$scope.imageAlias = $scope.model.config.imageAlias;

		var props = contentEditingHelper.getAllProps(editorState.current);
		var prop = _.findWhere(props, { alias: $scope.imageAlias }); 

		if (prop.value !== "") {
		    mediaResource.getById(prop.value)
                .then(function (media) {
                    $scope.media = media;
                    $scope.imagePath = mediaHelper.resolveFile(media, false);
		        });
			$scope.showImage = true;
		} else {
			$scope.imagePath = "";
			$scope.media = null;
			$scope.showImage = false;
		}

		$scope.$watch("model.value", function (newValue, oldValue) {
		    $scope.model.value = newValue;
		});

	});