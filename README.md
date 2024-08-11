# Chorus Interview

## About this Interview

Welcome to Chorus Engineering's Interview project!

We're looking for engineers who are experienced, passionate, and obsessed with strong systems and high productivity.

In order to facilitate this, we are providing an interview project that mirrors the technical stack that used
here at Chorus.

**You, the interviewee, have the power to decide if this is the technology that you want to work on!**

The goal of this interview is to identify strengths through a take home project, followed by
a 1 hour pairing session that will extend your work by creating features together.

## Tech Stack

- React UI
- Emotion CSS
- Typescript
- Node/NestJS Backend
- NX Monorepo
- Github Actions CI
- PostgreSQL Database
- Docker / Docker Desktop

## Prerequisites

Package Manager: pnpm 8.15.8
Node: 20.14.0 (LTS)

## Instructions

### Install Preqresuites
1. [Install pnpm](https://pnpm.io/installation)
2. [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)


### Getting and Running the Repository
Please fork the repository.

3. Run `pnpm install`
4. Run `pm2 start`

> Note: The API and React server will automatically watch for changes.

You can manage start/stop using `pm2`.

Use `pm2 stop all` to stop the servers.

Use `pm2 delete all` to delete the entry from the pm2 process list.

## Prompt

Lets make a Pokémon Team builder!

We want to create a way to select 6 Pokémon to be on our team.

The UI should allow the user to:

1. View a list of the first 150 Pokémon
2. Select from the list of Pokémon
3. Submit the Pokémon that we have selected to the backend.

**It does not have to be a beautiful UX experience. We're aiming for functional.**

### Completion Criteria

Database Requirements

- There should be a Profile table
- There should be a Pokémon table
- There should be a relationship between Pokémon and Profiles.

UI Requirements

- Show a list of the first 150 Pokémon
- Show selectable Profiles
- Select a profile, and choose up to 6 Pokémon.

API Requirements

- Return pokemon
- Create Profiles
- Handle receiving Pokémon related to Profiles

### Troubleshooting

> I can't execute pm2!

pm2 is part of the devDependencies, so when you install the dependencies, you should be able to
execute the binary from node_modules.

Either use `pnpm pm2` or add `node_modules/.bin` to your `PATH`.

> The requirements are confusing. I'm stuck.

Contact the hiring manager, and inform them of the situation. Be specific and clear about your concerns or issues.

