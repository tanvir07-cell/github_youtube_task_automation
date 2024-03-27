import React from 'react';
import { Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import Table from './Table.js';

export default function App() {
	return (
		<>
			<Gradient name="fruit">
				<BigText text="MADE BY TANVIR RIFAT🐱‍🚀☢" align='center' font='chrome' />

			</Gradient>
			<Table />
		</>

	);
}
