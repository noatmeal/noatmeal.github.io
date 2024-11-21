const fs = require('fs');
const path = require('path');

// Get file paths and tag from command-line arguments
const [mainFile, indexFile, tag] = process.argv.slice(2);

if (!mainFile || !indexFile || !tag) {
    console.error('Usage: node updateTag.js <mainFile> <indexFile> <tag>');
    process.exit(1);
}

try {
    // Read the content of the main file
    const mainContent = fs.readFileSync(mainFile, 'utf-8');

    // Create a regex to extract the specified tag content
    const tagRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
    const tagMatch = mainContent.match(tagRegex);
    if (!tagMatch) {
        throw new Error(`No <${tag}> tag found in the main file.`);
    }
    const tagContent = tagMatch[1].trim(); // Content inside the specified tag

    // Prepare the generated content to insert into the index file
    const generatedContent = `
<!-- start of generated ${tag} -->
${tagContent}
<!-- end of generated ${tag} -->
`;

    // Read the existing content of the index file
    let indexContent = fs.existsSync(indexFile) ? fs.readFileSync(indexFile, 'utf-8') : '';

    // Check if the generated section for the tag already exists
    const generatedTagRegex = new RegExp(
        `<!-- start of generated ${tag} -->[\\s\\S]*?<!-- end of generated ${tag} -->`,
        'i'
    );

    if (indexContent.match(generatedTagRegex)) {
        // Replace the old generated content with the new one
        indexContent = indexContent.replace(generatedTagRegex, generatedContent);
    } else {
        // If the comments don't exist, insert the generated content inside the specified tag
        const insertRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
        indexContent = indexContent.replace(
            insertRegex,
            `<${tag}>$1\n${generatedContent}\n</${tag}>`
        );
    }

    // Write the updated content back to the index file
    fs.writeFileSync(indexFile, indexContent, 'utf-8');
    console.log(`Content for <${tag}> updated successfully in the index file.`);
} catch (error) {
    console.error('Error:', error.message);
}
