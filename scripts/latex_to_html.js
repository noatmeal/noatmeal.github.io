const { execSync } = require('child_process');
const path = require('path');

function processLatexAndRunCommands(basePath) {
    try {
        // Resolve paths
        const fooPath = path.resolve(__dirname, '..'); // Assuming foo/scripts is your current directory
        const barPath = path.resolve(fooPath, basePath);
        const latexPath = path.join(barPath, 'latex');
        const mainHtmlPath = path.join(barPath, 'main.html');
        const indexHtmlPath = path.join(barPath, 'index.html');
        const bazScriptPath = path.join(fooPath, 'scripts', 'copy_content.js');

        // Run latexmlc command
        console.log(`Running latexmlc in ${latexPath}...`);
        execSync(`latexmlc --dest=../main.html main`, { cwd: latexPath, stdio: 'inherit' });

        // Change to foo directory
        console.log(`Changing to foo directory: ${fooPath}`);
        process.chdir(fooPath);

        // Run the two baz commands
        console.log(`Running baz commands...`);
        execSync(`node ${bazScriptPath} ${mainHtmlPath} ${indexHtmlPath} head`, { stdio: 'inherit' });
        execSync(`node ${bazScriptPath} ${mainHtmlPath} ${indexHtmlPath} body`, { stdio: 'inherit' });

        console.log('All commands executed successfully.');
    } catch (error) {
        console.error('Error occurred:', error.message);
        process.exit(1); // Exit with error code
    }
}

// Read the input path (can replace with a CLI argument parser like yargs for more flexibility)
const basePath = process.argv[2]; // Pass <bar> as the first argument
if (!basePath) {
    console.error('Usage: node script.js <bar>');
    process.exit(1);
}

processLatexAndRunCommands(basePath);
