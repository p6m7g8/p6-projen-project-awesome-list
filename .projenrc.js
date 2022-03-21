const { JsiiProject } = require('projen');

const project = new JsiiProject({
  name: 'p6-projen-project-awesome-list',
  authorAddress: 'pgollucci@p6m7g8.com',
  authorName: 'Philip M. Gollucci',
  repository: 'https://github.com/p6m7g8/p6-projen-project-awesome-list.git',
  description: 'Projen External Project for awesome-lists',
  keywords: [
    'awesome lists',
    'projen',
  ],

  defaultReleaseBranch: 'main',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',

  docgen: true,
  gitpod: true,

  bundledDeps: [
    'fs-extra',
  ],
  devDeps: [
    '@types/fs-extra@^8',
  ],
  deps: [
    'fs-extra',
    'projen@^0',
  ],
  peerDeps: [
    'projen@^0',
  ],

  python: {
    distName: 'p6-projen-project-awesome-list',
    module: 'p6_projen_project_awesome_list',
  },
});

project.gitignore.exclude('.node-version');

project.github.mergify.addRule({
  name: 'Label core contributions',
  actions: {
    label: {
      add: ['contribution/core'],
    },
  },
  conditions: [
    'author~=^(pgollucci)$',
    'label!=contribution/core',
  ],
});

project.github.mergify.addRule({
  name: 'Label auto-merge for core',
  actions: {
    label: {
      add: ['auto-merge'],
    },
  },
  conditions: [
    'label=contribution/core',
    'label!=auto-merge',
  ],
});

project.github.mergify.addRule({
  name: 'Label auto-merge snyk-bot',
  actions: {
    merge: {
      method: 'squash',
      commit_message: 'title+body',
      strict: 'smart',
      strict_method: 'merge',
    },
  },
  conditions: [
    'author=snyk-bot',
    'status-success=build',
  ],
});

project.gitpod.addTasks({
  name: 'Setup',
  init: 'yarn install',
  command: 'npx projen build',
});

project.synth();
