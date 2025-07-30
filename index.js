import { setTimeout } from 'node:timers/promises';
import * as p from '@clack/prompts';
import color from 'picocolors';
import { stream, log } from '@clack/prompts';
import fs from "fs-extra";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pkg from 'check-internet-connected';
import { setTimeout as sleep } from 'node:timers/promises';
import degit from 'degit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
	timeout: 5000, //timeout connecting to each server, each try
	retries: 5,//number of retries to do before failing
	domain: 'https://github.com/',//the domain to check DNS record of
}


function onCancel() {
	p.cancel('Operation cancelled.');
	process.exit(0);
}

async function main() {
	console.clear();

	let isConnected = false;
	try {
		isConnected = await pkg(config);
	}
	catch (error) {
		console.error('Error checking internet connection:', error);
	}

	// pkg(config)
	// 	.then((result) => {
	// 		console.log(result);//successfully connected to a server
	// 	})
	// 	.catch((ex) => {
	// 		console.log(ex); // cannot connect to a server or error occurred.
	// 	});


	// if (!isConnected) {
	// 	p.outro(color.red('No internet connection detected. Please check your connection and try again.'));
	// 	return;
	// }

	let templates;
	if (!isConnected) {
		templates = (await fs.readdir(`${__dirname}/templates_collection`)).map((template) => {
			// console.log(`Loading template: ${template}`);

			let info;

			try {
				info = JSON.parse(fs.readFileSync(`${__dirname}/templates_collection/${template}/template.json`,));
				// console.log(`try`);
			}
			catch (err) {
				// console.error(info);
				try {
					info = JSON.parse(fs.readFileSync(`${__dirname}/templates_collection/${template}/package.json`));
					// console.log(`catch try`);
				} catch (err) {
					info = {};
					// console.log(`catch catch`);
				}
			}

			info.dir = `${__dirname}/templates_collection/${template}`;

			return info;
		});
	}

	const templateslink = await fs.readJson(`${__dirname}/link_folder/link.json`);

	await setTimeout(1000);

	// console.log(templateslink);

	p.intro(`${color.bgCyan(color.white(' NextJS Template '))}`);

	// templates.forEach((template) => {
	// 	console.log(template.name);
	// });



	const changeset = await p.group(
		{
			ProjectName: () =>
				p.text({
					message: 'What is Project Name ?',
					placeholder: 'Project',
					validate(value) {
						if (value.length === 0) return `Value is required!`;
						if (!/^[a-zA-Z0-9-_]+$/.test(value)) return `Value can only contain letters, numbers, dashes, and underscores!`;
					}
				}),

			packages: () =>
				p.select({
					message: 'Which packages would you like to include?',
					options: !isConnected ? templates.map((template) => ({
						value: template.dir,
						label: template.name,
					}))
						:
						templateslink.map((template) => ({
							value: template.link,
							label: template.name + ` ${template.active}`,
						})),
				}),

			info: () =>
				stream.info((function* () { yield 'Info!'; })()),
		},
		{
			onCancel,
		}
	);

	const packages_location = changeset.packages;
	const ProjectName = changeset.ProjectName;

	// const spin = p.spinner();
	// spin.start(`Installing ${ProjectName}...`);
	// // Check if the project already exist
	// if (await fs.exists(ProjectName)) {

	// 	// Ask if we should override
	// 	const overwrite = await p.confirm({
	// 		message: 'You already have a project with that name do you want to overwrite it?',
	// 	});

	// 	// Override the project if the user said yes
	// 	if (overwrite === true) {

	// 		// Remove old files
	// 		await fs.remove(ProjectName);
	// 		// Copy the template
	// 		if (!isConnected) {
	// 			await copyTemplate(ProjectName, packages_location);
	// 		}
	// 		else {
	// 			await Git_clone(ProjectName, packages_location);
	// 		}
	// 	}

	// }
	// else {
	// 	if (!isConnected) {
	// 		await copyTemplate(ProjectName, packages_location);
	// 	}
	// 	else {
	// 		await Git_clone(ProjectName, packages_location);
	// 	}
	// }

	// async function copyTemplate(name, template) {

	// 	// Copy all of the files except the template.json file
	// 	await fs.copy(template, name, {
	// 		filter: (src, dest) => {
	// 			if (src.includes("template.json"))
	// 				return false;
	// 			return true;
	// 		}
	// 	});

	// }

	// async function Git_clone(ProjectName, packages_location) {

	// 	degit(`${packages_location}`, { force: true })
	// 		.clone(ProjectName)
	// 		.then(() => {
	// 			p.log.success(`Installing ${ProjectName} Successfully!`);
	// 			p.log.info(`Run ${color.cyan('npm install')} to install dependencies`);
	// 		})
	// 		.catch((error) => {
	// 			p.log.error(`Installing ${ProjectName} failed !`);
	// 			onCancel();
	// 		});

	// }
	// spin.stop(`Installing ${ProjectName}...`);




	await p.tasks([
		{
			title: 'Installing via npm',
			task: async () => {
				// console.log(packages_location);

				await sleep(3000);

				// Check if the project already exist
				if (await fs.exists(ProjectName)) {

					// Ask if we should override
					const overwrite = await p.confirm({
						message: 'You already have a project with that name do you want to overwrite it?',
					});

					// Override the project if the user said yes
					if (overwrite === true) {

						// Remove old files
						await fs.remove(ProjectName);
						// Copy the template
						if (!isConnected) {
							await copyTemplate(ProjectName, packages_location);
						}
						else {
							await Git_clone(ProjectName, packages_location);
						}
					}

				}
				else {
					if (!isConnected) {
						await copyTemplate(ProjectName, packages_location);
					}
					else {
						await Git_clone(ProjectName, packages_location);
					}
				}
			},
		},
	]);

	async function copyTemplate(name, template) {

		// Copy all of the files except the template.json file
		await fs.copy(template, name, {
			filter: (src, dest) => {
				if (src.includes("template.json"))
					return false;
				return true;
			}
		});
	}

	async function Git_clone(ProjectName, packages_location) {

		degit(`${packages_location}`, { force: true })
			.clone(ProjectName)
			.then(() => {
				p.log.success(`Installing ${ProjectName} Successfully!`);
				p.log.info(`Run ${color.cyan('npm install')} to install dependencies`);
				p.outro(`Changeset added! ${color.underline(color.cyan('.changeset/orange-crabs-sing.md'))}`);
			})
			.catch((error) => {
				p.log.error(`Installing ${ProjectName} failed !`);
				onCancel();
			});
	}

	//The isCancel function is a guard that detects when a user cancels a question with CTRL + C. 
	if (p.isCancel(changeset)) {
		return onCancel();
	}

	// "outro" functions will print a message to end a prompt session.

}

main().catch(console.error);