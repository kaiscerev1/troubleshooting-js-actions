const core = require('@actions/core');

// Define inputs using core.getInput function
const nameInput = core.getInput('name', { required: true });
const secretPhoneInput = core.getInput('phone', { required: true });
const inputCountry = core.getInput('country', { required: true });

// Check if Debug mode is enabled
if (core.isDebug()) {
    core.info('Debug mode is enabled');
    core.debug('Debugging information:');
}

// Prepare the greeting message
const greeting = `Hello ${nameInput}, your phone number is ${secretPhoneInput} and you are from ${inputCountry}.`;

// Log the message
core.info(`Information message: ${greeting}`);
core.notice(`Notice message: ${greeting}`);
core.warning(`Warning message: ${greeting}`);
core.error(`Error message: ${greeting}`);

core.info("====================================================");

// Set the output named `customized-output`
core.setOutput('customized-greeting', greeting);

// Simulate a error scenario
if (secretPhoneInput.length !== 10) {
    core.error(`Error: Phone number must be 10 digits long. - ${secretPhoneInput}`);
} else {
    // Export a variable to the environment
    switch (inputCountry) { 
        case 'Spain':
            core.exportVariable('JS_ACTION_PHONE', secretPhoneInput);
            break;
        case 'Usa':
            core.exportVariable('JS_ACTION_PHONE', secretPhoneInput);
            break;
        default:
            core.exportVariable('JS_ACTION_PHONE', secretPhoneInput);
    }
}

// Register a secret using the setSecret function
core.info(`Registering secret: ${secretPhoneInput}`);
core.setSecret(secretPhoneInput);
core.info(`Masked Received Phone Number: ${secretPhoneInput}`);

core.summary
    .addHeading('Summary of the Action', 2)
    .addCodeBlock(greeting, 'javascript')
    .addTable([
        [{data: 'Name', header: true}, {data: 'Phone', header: true}, {data: 'Country', header: true}],
        [nameInput, secretPhoneInput, inputCountry]
    ])
    .addQuote('Phone number is masked using core.setSecret method')
    .addLink('GitHub Actions Documentation', 'https://docs.github.com/en/actions')
    .write()