import { Box, Text } from 'ink';

import React from 'react';
import SelectInput from 'ink-select-input';

import fs from "node:fs"
import readline from 'node:readline';
import chalk from 'chalk';
import "dotenv/config";
import open from "open"




const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout

})

const items = [
	{
		label: 'github',
		value: 'github'
	},
	{
		label: 'youtube',
		value: 'youtube'
	},

	{
		label: 'Exit',
		value: 'exit'

	}
];


export default function Table({ name }) {


	const handleSelect = async item => {

		if (item.value === "github") {
			rl.question('Enter the github user name 🐱‍🚀:', async (userName) => {
				const api = `https://api.github.com/users/${userName}/repos`;

				const data = await fetch(api);
				const response = await data.json();
				// console.log(`${userName}'s image is : ${response[0].owner.avatar_url}`);
				const mostPopularRepo = response.reduce((acc, current) => {
					if (acc.stargazers_count > current.stargazers_count) {
						return acc;
					}
					else {
						return current;
					}
				})

				console.log(chalk.green(`${userName}'s most popular repo is : ${mostPopularRepo.name} with ${mostPopularRepo.stargazers_count} stars`));

				open(mostPopularRepo.html_url)
				rl.close();

				return;





			})

		}

		else if (item.value === "youtube") {
			rl.question("Enter the name of the vide you want to play💫:", async (videoName) => {
				const api = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${videoName}&key=${process.env.YOUTUBE_API_KEY}`;

				const data = await fetch(api);
				const response = await data.json();
				console.log(chalk.green(`The video link is : https://www.youtube.com/watch?v=${response.items[0].id.videoId}`));
				open(`https://www.youtube.com/watch?v=${response.items[0].id.videoId}`)
				rl.close();

				return


			})

		}

		else if (item.value === "exit") {
			process.exit(1);
		}

	}





	return (
		<Box borderStyle='single' padding={2} flexDirection='column'>
			<Text color="green"> Hello Tanvir Rifat</Text>
			<br />
			<Text>Choose an option:</Text>

			<SelectInput items={items} onSelect={handleSelect} />
		</Box>
	);
}
