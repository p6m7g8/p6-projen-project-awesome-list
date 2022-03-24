import { JsiiProject } from "projen/lib/cdk";

const project = new JsiiProject({
  name: "p6-projen-project-awesome-list",
  author: "Philip M. Gollucci",
  authorAddress: "pgollucci@p6m7g8.com",
  repositoryUrl: "https://github.com/p6m7g8/p6-projen-project-awesome-list.git",
  description: "Projen External Project for awesome-lists",
  stability: "experimental",
  keywords: ["awesome lists", "projen", "list", "awesome", "constructs"],

  defaultReleaseBranch: "main",
  projenrcTs: true,
  gitpod: true,
  devContainer: true,
  codeCov: true,
  prettier: true,
  releaseFailureIssue: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["p6m7g8-automation"],
  },

  bundledDeps: ["fs-extra"],
  devDeps: ["@types/fs-extra@^8", "projen@^0.53.9"],
  deps: ["fs-extra", "projen@^0.53.9"],
  peerDeps: ["projen@^0.53.9"],

  publishToPypi: {
    distName: "p6-projen-project-awesome-list",
    module: "p6_projen_project_awesome_list",
  },

  publishToMaven: {
    javaPackage: "com.github.p6m7g8.P6ProjectProjenAwesomeList",
    mavenGroupId: "com.github.p6m7g8",
    mavenArtifactId: "p6-projen-project-awesome-list",
  },

  // publishToNuget: {
  //   dotNetNamespace: "P6m7g8.P6AwesomeList",
  //   packageId: "P6m7g8.P6AwesomeList",
  // },

  publishToGo: {
    moduleName: "github.com/p6m7g8/p6-projen-project-awesome-list", // why doesn't this default to repositoryUrl?
  },
});

project.synth();
