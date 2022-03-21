import { JsiiProjectOptions, JsiiProject, SampleFile } from 'projen';

/**
 * Configurable knobs for Awesome Lists
 */
export interface AwesomeListProjectOptions extends JsiiProjectOptions {

  /**
   * What e-mail address to list for the Code of Conduct Point of Contact
   *
   * @default - `project.authorAddress`
   */
  readonly contactEmail?: string;
}

/**
 * Awesome List project
 *
 * @pjid awesome-list
 */
export class AwesomeList extends JsiiProject {
  constructor(options: AwesomeListProjectOptions) {
    super({
      ...options,
      readme: {
        filename: 'readme.md',
        contents: readmeContents(),
      },
      defaultReleaseBranch: 'main',
      releaseBranches: ['main'],
      gitpod: true,
      releaseToNpm: false,
    });

    new SampleFile(this, 'code-of-conduct.md', {
      contents: this.codeOfConduct().replace('CONTACTEMAIL', options.contactEmail ?? 'noreply@example.com'),
    });

    new SampleFile(this, 'contributing.md', {
      contents: this.contributing(),
    });

    this._awesomeLint();

    this.gitpod?.addCustomTask({
      name: 'Setup',
      command: 'npx projen Setup',
    });
  }

  private _awesomeLint() {
    this.addDevDeps('awesome-lint');

    const awesomeLintTask = this.addTask('awesome-lint');
    awesomeLintTask.exec('npx awesome-lint');

    this.buildTask.reset(awesomeLintTask.toShellCommand());
  }

  private codeOfConduct(): string {
    const contents = `# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

## Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at CONTACTEMAIL. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
    `;

    return contents;
  }

  private contributing(): string {
    const contents = `# Contribution Guidelines

Please note that this project is released with a
[Contributor Code of Conduct](code-of-conduct.md). By participating in this
project you agree to abide by its terms.

## Adding an awesome list

Please ensure your pull request adheres to the [list guidelines](pull_request_template.md).

## Updating your PR

A lot of times, making a PR adhere to the standards above can be difficult.
If the maintainers notice anything that we'd like changed, we'll ask you to
edit your PR before we merge it. There's no need to open a new PR, just edit
the existing one. If you're not sure how to do that,
[here is a guide](https://github.com/RichardLitt/knowledge/blob/master/github/amending-a-commit-guide.md)
on the different ways you can update your PR so that we can merge it.
    `;

    return contents;
  }
}

function readmeContents(): string {
  const contents = `# Awesome Projen [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

  > Curated list of awesome [PROJECT](REPOSITORY) SHORTDESC.

  LONGDESC

  ## Contents

  ## Contributing

  Contributions welcome! Read the [contribution guidelines](contributing.md) first.`;

  return contents;
}
