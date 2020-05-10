function getProjectUrl(github_username, project_title) {
    const desired_title = project_title.toLowerCase().split(" ").join("-");
    return `https://github.com/${github_username}/${desired_title}`;
}

function getLicenseBadge(license, github_username, project_title) {
    
   if (license !== "None") {
      return `[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](${getProjectUrl(github_username, project_title)})`
    }

    return ''
}

function getLicenseSection(license) {

    if (license !== "None") {
        return (
        `## License

            This project is licensed under the ${license} license.`
        )
    }
    return ''
}

function generateMarkdown(data) {

   console.log(data);


    return `
# ${data.project_title}
${getLicenseBadge(data.project_license, data.github_username, data.project_title)}

## Description

${data.project_description}

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

\`\`\`
${data.installation}
\`\`\`

## Usage

${data.usage}

${getLicenseSection(data.project_license)}

## Contributing

${data.contributing}

## Tests

To run tests, run the following command:

\`\`\`
${data.tests}
\`\`\`

## Questions

<img src="${data.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />

If you have any questions about the repo, open an issue or contact [${data.github}](${data.url}) directly at ${data.email}.

`;
}

module.exports.generateMarkdown = generateMarkdown;
