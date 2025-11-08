<div align="center">
<pre>
  _   _           _          _____                      _____       _ _           _____ _      _____      _  ___ _   
 | \ | |         | |        |  __ \                    |_   _|     (_) |         / ____| |    |_   _|    | |/ (_) |  
 |  \| | _____  _| |_ ______| |__) |___ _ __   ___ ______| |  _ __  _| |_ ______| |    | |      | |______| ' / _| |_ 
 | . ` |/ _ \ \/ / __|______|  _  // _ \ '_ \ / _ \______| | | '_ \| | __|______| |    | |      | |______|  < | | __|
 | |\  |  __/>  <| |_       | | \ \  __/ |_) | (_) |    _| |_| | | | | |_       | |____| |____ _| |_     | . \| | |_ 
 |_| \_|\___/_/\_\\__|      |_|  \_\___| .__/ \___/    |_____|_| |_|_|\__|       \_____|______|_____|    |_|\_\_|\__|
                                       | |                                                                           
                                       |_|                                                                           
</pre>
</div>
<p align="center">
	<em><code>❯ Create a CLI toolkit that quickly scaffolds standardized Next.js repositories</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/HimanthaThathsara/Next-Repo-Init-CLI-Kit?style=default&logo=opensourceinitiative&logoColor=white&color=ffffff" alt="license">
	<img src="https://img.shields.io/github/last-commit/HimanthaThathsara/Next-Repo-Init-CLI-Kit?style=default&logo=git&logoColor=white&color=ffffff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/HimanthaThathsara/Next-Repo-Init-CLI-Kit?style=default&color=ffffff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/HimanthaThathsara/Next-Repo-Init-CLI-Kit?style=default&color=ffffff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)

---

##  Overview

<code>Interactive or flag-driven CLI to Generates a new Next.js app with chosen options (app router vs pages, TypeScript setup).
& developer tooling (ESLint, Prettier, Husky/Git hooks, commitlint, lint-staged).
Creates initial README, .env.example, and helpful scripts in package.json.
Optionally scaffolds common integrations: Tailwind, Prisma/Supabase, NextAuth, state libs (Redux/ Zustand), Storybook, i18n.
</code>

---

##  Features

<code>
- Interactive or flag-driven scaffolding
- TypeScript-first templates with strict tsconfig presets
- App Router vs Pages Router options
- Styling choices: Tailwind CSS, CSS Modules, or UI libraries
- State management examples (Context, Zustand, Redux Toolkit)
- Database adapter starters (Prisma / Supabase / MongoDB)
- Auth starter (NextAuth)
- Testing setup: Jest + React Testing Library, Playwright for E2E
- ESLint, Prettier, Husky, lint-staged, commitlint
- GitHub Actions CI templates (lint/test/build)
- Dockerfile and docker-compose templates (optional)
- README, .env.example, LICENSE and contributing templates
</code>

---



##  Project Structure

```sh
└── Next-Repo-Init-CLI-Kit/
    ├── index.js
    ├── link_folder
    │   └── link.json
    ├── package-lock.json
    ├── package.json
    └── templates_collection

```
---

##  Getting Started

###  Installation

<code>Install Next-Repo-Init-CLI-Kit using one of the following methods:</code>

**Build from source:**

1. Clone the Next-Repo-Init-CLI-Kit repository:
```sh
❯ git clone https://github.com/HimanthaThathsara/Next-Repo-Init-CLI-Kit
```

**Execute from Npm:**

2. Install using NPM :
```sh
❯ npx i next-repo-init
```

---
##  Project Roadmap

- [X] **`Task 1`**: <strike>TypeScript strict config + helpful tsconfig references</strike>
- [ ] **`Task 2`**: Interactive CLI prompts + non-interactive flags <code>next-init --name my-app --ts --tailwind --prisma</code>
- [ ] **`Task 3`**: Husky + commitlint + conventional commits starter
- [ ] **`Task 4`**: Third-party plugins add features
- [ ] **`Task 5`**: Preset choices for App Router vs Pages Router
- [ ] **`Task 6`**: Edge functions/middleware and routing examples for edge runtime
- [ ] **`Task 7`**: Automatic dependency updates + security scans integration - Dependabot config + template for GitHub secret scanning


---

##  Contributing

- **💬 [Join the Discussions](https://github.com/HimanthaThathsara/Next-Repo-Init-CLI-Kit/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/HimanthaThathsara/Next-Repo-Init-CLI-Kit/issues)**: Submit bugs found or log feature requests for the `Next-Repo-Init-CLI-Kit` project.
- **💡 [Submit Pull Requests](https://github.com/HimanthaThathsara/Next-Repo-Init-CLI-Kit/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
---
##  Contributing Guidelines

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/HimanthaThathsara/Next-Repo-Init-CLI-Kit
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/HimanthaThathsara/Next-Repo-Init-CLI-Kit/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=HimanthaThathsara/Next-Repo-Init-CLI-Kit">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.


