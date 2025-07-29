#!/usr/bin/env node



// This script initializes a new project based on a selected template from a local collection.
// version 2.0.0
/* 
// Import dependencies
const prompts = require("prompts");
const fs = require("fs-extra");

(async () => {

    // The response from all of the questions
    let response = {};

    // Get of the templates
    const templates = (await fs.readdir(`${process.mainModule.path}/templates_collection`))
        .map((template) => {
            // console.log(`Loading template: ${template}`);
            let info;
            try {
                info = require(`${process.mainModule.path}/templates_collection/${template}/template.json`);
            } catch (err) {
                // console.error(info);
                try {
                    info = require(`${process.mainModule.path}/templates_collection/${template}/package.json`);
                } catch (err) {
                    info = {};
                }
            }

            info.dir = `${process.mainModule.path}/templates_collection/${template}`;

            return info;
        });

    // All of the questions
    const questions = [{
        type: "text",
        name: "name",
        initial: "project",
        message: "project name ?",
        validate: (value) => {
            if (value.length < 1) {
                return "Project name must be at least one character long";
            }
            if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                return "Project name can only contain letters, numbers, underscores, and dashes";
            }
            return true;
        }

    }];

    // Ask which template to use if there's more than one
    if (templates.length > 1) {
        questions.push({
            type: "select",
            name: "template",
            message: "Pick a template",
            choices: templates.map((template) => ({
                title: template.name,
                description: template.description,
                value: template.dir
            })),
            initial: 0
        });
    }

    // On cancel
    const onCancel = prompt => {
        console.log("🚫 Never stop prompting!");
        process.exit(0);
    }

    // The response
    response = await prompts(questions, { onCancel });

    // if there's only one template then set the first template to be the template on response
    if (typeof response.template === "undefined") {
        response.template = templates[0].dir;
    }

    // Check if the project already exist
    if (await fs.exists(response.name)) {

        // Ask if we should override
        const overwrite = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'You already have a project with that name do you want to overwrite it?',
            initial: false
        });

        // Override the project if the user said yes
        if (overwrite.value === true) {

            // Remove old files
            await fs.remove(response.name);
            // Copy the template
            copyTemplate(response.name, response.template);

        }

    }
    else {
        copyTemplate(response.name, response.template);

    }

})();

// Copy the template
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
*/


// Import dependencies
import prompts from "prompts";
import fs from "fs-extra";
import degit from "degit";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {

    // The response from all of the questions
    let response = {};

    // Get of the templates
    // Read templates from JSON file
    const templates = await fs.readJson(`${__dirname}/link_folder/link.json`);


    const questions = [{
        type: "text",
        name: "name",
        initial: "project",
        message: "project name ?",
        validate: (value) => {
            if (value.length < 1) {
                return "Project name must be at least one character long";
            }
            if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                return "Project name can only contain letters, numbers, underscores, and dashes";
            }
            return true;
        }

    }];

    // Ask which template to use if there's more than one
    if (templates.length > 1) {
        questions.push({
            type: "select",
            name: "template",
            message: "Pick a template",
            choices: templates.map((template) => ({
                title: template.description,
                description: template.active,
                value: template.link
            })),
            initial: 0
        });
    }

    // On cancel
    const onCancel = prompt => {
        console.log("🚫 Cancelled the process");
        process.exit(0);
    }

    // The response
    response = await prompts(questions, { onCancel });

    // if there's only one template then set the first template to be the template on response
    if (typeof response.template === "undefined") {
        response.template = templates[0].dir;
    }

    // Check if the project already exist
    if (await fs.exists(response.name)) {

        // Ask if we should override
        const overwrite = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'You already have a project with that name do you want to overwrite it?',
            initial: false
        });

        // Override the project if the user said yes
        if (overwrite.value === true) {

            // Remove old files
            await fs.remove(response.name);
            Git_clone(response.name, response.template);

        }

    }
    else {
        Git_clone(response.name, response.template);

    }


    async function Git_clone(name, template) {

        degit(`${template}`, { force: true })
            .clone(name)
            .then(() => {
                console.log(`✅ Cloned into ${name}\n`);
                // Next update it will make to run automatically the following commands
                console.log(`⏭️  cd ${name}\n`);
                console.log(`⏭️  npm install\n`);
                console.log(`If you need help, open an issue on the GitHub repository.`);
                console.log(`Thank you for using our CLI!\n`);
                process.exit(0);
            })
            .catch((error) => {
                console.error(`🚫 Failed to clone: ${error.message}`);
                process.exit(0);
            });

    }

})();






