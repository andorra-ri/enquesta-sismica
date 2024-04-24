<script>
	import { onMount, onDestroy } from 'svelte';

	export let initialZoom = 11;
	export let initialLng = 1.43;
	export let initialLat = 42.51;
	export let autoPosition = true;
	export let onChange;

	let mapElement;
	let map;
	let marker;

	onMount(async () => {
		const leaflet = await import('leaflet');
		const icon = leaflet.icon({
			iconUrl: 'images/marker.png',
			shadowUrl: 'images/marker-shadow.png',

			iconSize: [30, 38],
			shadowSize: [50, 64],
			iconAnchor: [19, 38],
			shadowAnchor: [16, 62],
			popupAnchor: [-3, -76]
		});

		onChange([initialLng, initialLat]);
		map = leaflet.map(mapElement).setView([initialLat, initialLng], initialZoom);
		marker = leaflet
			.marker([initialLat, initialLng], {
				title: 'Mou-me!',
				alt: 'Mou-me!',
				draggable: true,
				icon: icon
			})
			.addTo(map);

		const onDragEnd = () => {
			const coord = marker.getLatLng();

			marker.bindPopup(
				'Localització assignada a: ' + coord.lat.toFixed(3) + ', ' + coord.lng.toFixed(3) + '.'
			);
			onChange([coord.lng, coord.lat]);
		};
		marker.on('dragend', onDragEnd);
		leaflet
			.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			})
			.addTo(map);
		map
			.locate({ watch: false })
			.on('locationfound', function (e) {
				if (!autoPosition) {
					marker.setLatLng([e.latitude, e.longitude]);
					map.setView([e.latitude, e.longitude], initialZoom + 4);
					onChange([e.longitude, e.latitude]);
				}
			})
			.on('locationerror', function (e) {
				marker.setLatLng([initialLat, initialLng]);
				map.setView([initialLat, initialLng], initialZoom);
			});
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<main>
	<div bind:this={mapElement} />
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
	main div {
		min-height: 400px;
		z-index: 1;
	}
</style>
