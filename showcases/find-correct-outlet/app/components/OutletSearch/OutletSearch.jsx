/** @format */

import React, {useState, useEffect} from 'react'
import Script from 'next/script'

import styles from './OutletSearch.styles'

import constants from '../../constants'
const {SERVER_URL, MAPS_SRC} = constants

function OutletSearch() {
	const [autocompleteInstance, setAutocompleteInstance] = useState(
		{}
	)
	const [hasValue, setHasValue] = useState(false)
	const [result, setResult] = useState({})

	function setupAutoComplete() {
		const center = {lat: 48.11, lng: 16.34}
		const defaultBounds = {
			north: center.lat + 0.1,
			south: center.lat - 0.1,
			east: center.lng + 0.1,
			west: center.lng - 0.1,
		}
		const input = document.getElementById('user-input')
		const options = {
			bounds: defaultBounds,
			componentRestrictions: {country: 'at'},
			fields: ['geometry', 'name'],
			strictBounds: false,
			types: ['address'],
		}
		const autocomplete = new google.maps.places.Autocomplete(
			input,
			options
		)
		autocomplete.addListener('place_changed', () => {
			setHasValue(true)
			setResult({})
		})
		setAutocompleteInstance(autocomplete)
	}
	function handleClick() {
		const value = autocompleteInstance.getPlace()

		if (!value.geometry || !value.geometry.location) return

		const {lat, lng} = value.geometry.location
		fetch(`${SERVER_URL}/outlet?lat=${lat()}&lng=${lng()}`)
			.then((res) => res.json())
			.then((data) => {
				setResult(data)
			})
			.catch(() => {
				setResult({
					errors: true,
					userMessage: 'We Could Not Fetch Results',
				})
			})
	}

	useEffect(() => {
		const {input, outlet, midpoint, success} = result
		if (!success) return

		const map = new google.maps.Map(
			document.getElementById('map'),
			{
				zoom: 14.5,
				center: midpoint,
			}
		)

		const inputLabel = 'Your Address'
		new google.maps.Marker({
			position: input,
			map,
			label: inputLabel,
			title: inputLabel,
		})

		const outletLabel = 'Outlet: ' + outlet.name
		new google.maps.Marker({
			position: outlet,
			map,
			title: outletLabel,
			label: outletLabel,
		})
	}, [result])

	function renderSearchInput() {
		return (
			<div>
				<input
					id="user-input"
					type="text"
					placeholder="Enter Location"
					style={styles.inputBox}
				/>
				<input
					value={hasValue ? 'Search' : 'Enter Address to Search'}
					type="button"
					onClick={handleClick}
					disabled={!hasValue}
					style={styles.inputButton}
				/>
			</div>
		)
	}

	function renderResult() {
		if (result.errors && result.userMessage)
			return (
				<div style={styles.resultText}>
					<p>{result.userMessage}</p>
				</div>
			)

		if (!result.success) return

		return (
			<div style={styles.resultText}>
				<p>
					The order will be routed to <b>{result.outlet.name}</b>
					<br />
					Polygon Name: <b>{result.polygonName}</b>
				</p>
			</div>
		)
	}

	function renderMapDiv() {
		if (!result.success || result.errors) return
		return <div id="map" style={styles.mapDiv}></div>
	}

	return (
		<>
			{renderSearchInput()}
			{renderResult()}
			{renderMapDiv()}
			<Script src={MAPS_SRC} onLoad={setupAutoComplete} />
		</>
	)
}

export default OutletSearch
