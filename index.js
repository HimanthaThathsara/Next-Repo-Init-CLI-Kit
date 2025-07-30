import degit from 'degit';
import fs from "fs-extra";
import color from 'picocolors';
import { dirname } from 'path';
import * as p from '@clack/prompts';
import { fileURLToPath } from 'url';
import pkg from 'check-internet-connected';
import { stream, log } from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://www.npmjs.com/package/check-internet-connected
const config = {
	timeout: 5000,
	retries: 5,
	domain: 'https://github.com/',
}

// Function to handle cancellation
function onCancel() {
	p.cancel('Operation cancelled.');
	process.exit(0);
}

async function main() {
	// clear the console
	console.clear();

	// Check internet connection
	let isConnected = false;
	try {
		isConnected = await pkg(config);
	}
	catch (error) {
		isConnected = false;
		// p.log.error(`Checking internet connection !`);
	}

	// // Check internet connection debug
	// pkg(config)
	// 	.then((result) => {
	// 		console.log(result);
	// 	})
	// 	.catch((ex) => {
	// 		console.log(ex); 
	// 	});


	// if (!isConnected) {
	// 	p.outro(color.red('No internet connection detected. Please check your connection and try again.'));
	// 	return;
	// }



	let templates;

	// Assign the file path
	if (!isConnected) {
		templates = (await fs.readdir(`${__dirname}/templates_collection`)).map((template) => {

			let info;
			try {
				info = JSON.parse(fs.readFileSync(`${__dirname}/templates_collection/${template}/template.json`,));
			}
			catch (err) {
				try {
					info = JSON.parse(fs.readFileSync(`${__dirname}/templates_collection/${template}/package.json`));
				} catch (err) {
					info = {};
				}
			}

			info.dir = `${__dirname}/templates_collection/${template}`;
			return info;
		});
	}

	// Assign the file json data
	const templateslink = await fs.readJson(`${__dirname}/link_folder/link.json`);

	// start label
	p.intro(`${color.bgCyan(color.white(' NextJS Template '))}`);


	const changeset = await p.group(
		{
			// get the project name
			ProjectName: () =>
				p.text({
					message: 'What is Project Name ?',
					placeholder: 'Project',
					validate(value) {
						if (value.length === 0) return `Value is required!`;
						if (!/^[a-zA-Z0-9-_]+$/.test(value)) return `Value can only contain letters, numbers, dashes, and underscores!`;
					}
				}),

			// get the package link or dir
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
		},

		{
			onCancel,
		}
	);

	// Assign the "changeset.packages" and "changeset.projectName" 
	const packages_location = changeset.packages;
	const ProjectName = changeset.ProjectName;


	await p.tasks([
		{
			title: 'Installing via npm',
			task: async () => {
				await sleep(3000);

				// Check if the project already exist
				if (await fs.exists(ProjectName)) {

					const overwrite = await p.confirm({
						message: 'You already have a project with that name do you want to overwrite it?',

					});

					if (overwrite === true) {

						// Remove old files
						await fs.remove(ProjectName);
						if (!isConnected) {
							await copyTemplate(ProjectName, packages_location);
						}
						else {
							await Git_clone(ProjectName, packages_location);
						}
					}
					else {
						onCancel()
					}

				}

				// Other wise it move on
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
		p.log.success(`Installing ${ProjectName} Successfully!`);
		p.log.info(`Run ${color.cyan('npm install')} to install dependencies`);
		p.outro(`Changeset added! ${color.underline(color.cyan('.changeset/orange-crabs-sing.md'))}`);
	}

	async function Git_clone(ProjectName, packages_location) {
		// Download the project form github
		degit(`${packages_location}`, { force: true })
			.clone(ProjectName)
			.then(() => {
				p.log.success(`Installing ${ProjectName} Successfully!`);
				p.log.info(`Run ${color.cyan('npm install')} to install dependencies`);
				p.outro(`Changeset added! ${color.underline(color.cyan('.changeset/orange-crabs-sing.md'))}`);
			})
			.catch(() => {
				p.log.error(`Installing ${ProjectName} failed !`);
				onCancel();
			});
	}

	//The isCancel function is a guard that detects when a user cancels a question with CTRL + C. 
	if (p.isCancel(changeset)) {
		return onCancel();
	}
}

main().catch(console.error);