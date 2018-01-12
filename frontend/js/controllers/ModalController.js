foundtruck.controller('ModalController',['$scope', 'TrucksService', function($scope, TrucksService) {
	/* Subtitle
	'Roxo - Sua Localização',
	'Preto - Comida Chinesa',
	'Azul - Comida Regional',
	'Verde - Comida Vegana',
	'Azul Claro - Massas',
	'Vermelho - Cachorro Quente'
	*/
	$scope.subtitleList = [
		{
			color: '#f58634',
			description: 'Sua Localização'
		},
		{
			color: '#373435',
			description: 'Comida Oriental'
		},
		{
			color: '#3e4095',
			description: 'Comida Regional'
		},
		{
			color: '#ed3192',
			description: 'Doces'
		},
		{
			color: '#ffd26f',
			description: 'Massas Geral'
		},
		{
			color: '#ed3237',
			description: 'Cachorro Quente'
		},
		{
			color: '#8d3031',
			description: 'Espetos e Churrasco'
		},
		{
			color: '#fff212',
			description: 'Pizza'
		}
	];

	$scope.loadTruckData = function() {
		$scope.selectedTruck = TrucksService.selectedTruck;
	};
}]);