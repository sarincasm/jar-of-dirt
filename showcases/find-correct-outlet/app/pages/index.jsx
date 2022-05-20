/** @format */
import React from 'react'
import Head from 'next/head'

import OutletSearch from '../components/OutletSearch'

function HomePage() {
	return (
		<>
			<Head>
				<style>{`
				body {
					margin: 0 auto;
          padding: 5px;
				}
				`}</style>
				<title>Find Delivery Outlet</title>
			</Head>
			<OutletSearch />
		</>
	)
}

export default HomePage
