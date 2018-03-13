/* global angular */
/* global Materialize */
/* global $ */
/* global Promise */
/* global google */
app.controller('PlacesController', PlacesController);

function PlacesController() {
	var vm = this;
	vm.map = new google.maps.Map(document.getElementById('map'));
	vm.service = new google.maps.places.PlacesService(vm.map);
	vm.placeList = [];

	vm.getPlaces = getPlaces;
	function getPlaces(options) {
		console.log(options);
		if (options.placeSearch && options.radius) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					var request;
					if (options.orderBy) {
						request = {
							location: { lat: position.coords.latitude, lng: position.coords.longitude },
							type: [options.placeSearch],
							keyword: options.placeName,
							openNow: options.isOpen,
							rankBy: google.maps.places.RankBy.DISTANCE
						};
					} else {
						request = {
							location: { lat: position.coords.latitude, lng: position.coords.longitude },
							radius: options.radius,
							keyword: options.placeName,
							openNow: options.isOpen,
							type: [options.placeSearch]
						};
					}

					vm.service.nearbySearch(request, processResults);

					function processResults(results, status, pagination) {
						if (status !== google.maps.places.PlacesServiceStatus.OK) {
							return;
						} else {
							vm.getDetails(results, options.isPhoto);
						}
					}
				});
			} else {
				Materialize.toast('Sem sua localização não conseguiremos fazer buscas ao seu redor', 3000, 'rounded red darken-4');
			}
		} else if (options.placeSearch) {
			Materialize.toast('Selecione o raio de busca', 3000, 'rounded amber darken-2');
		} else {
			Materialize.toast('Selecione uma categoria', 3000, 'rounded amber darken-2');
		}
	}

	vm.open = open;
	function open(open, key) {
		$('.collapsible').collapsible(open, key);
	}

	vm.getDetails = getDetails;
	function getDetails(places, isPhoto) {
		if (places.length == 0) {
			Materialize.toast('Sua busca não trouxe nenhum resultado', 3000, 'rounded light-blue darken-1');
		}
		angular.forEach(places, function (place, key) {
			vm.service.getDetails({ placeId: place.place_id },(place, status) => {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					vm.popList(place, isPhoto);
					$('.collapsible').collapsible();
				}
			});
		});
		console.log(vm.placeList);
	}

	vm.popList = popList;
	function popList(placeDetails, isPhoto) {
		if (isPhoto) {
			if (placeDetails.photos) {
				vm.placeList.push(placeDetails);
			}
		} else {
			vm.placeList.push(placeDetails);
		}
	}
}