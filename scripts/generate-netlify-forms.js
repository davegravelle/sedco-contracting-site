import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Read contact.json
const contactData = JSON.parse(
  readFileSync(join(rootDir, 'src/data/contact.json'), 'utf-8')
);

// Function to generate HTML for a single input field
function generateFieldHTML(input) {
  const { type, name } = input;
  
  if (type === 'textarea') {
    return `  <textarea name="${name}"></textarea>`;
  } else if (type === 'select') {
    const options = input.options?.map(opt => 
      `    <option value="${opt.value}">${opt.label}</option>`
    ).join('\n') || '';
    return `  <select name="${name}">\n${options}\n  </select>`;
  } else {
    return `  <input type="${type}" name="${name}" />`;
  }
}

// Generate HTML for all forms
let html = `<!-- This file is auto-generated from contact.json -->
<!-- Do not edit manually - run 'npm run generate:netlify-forms' to regenerate -->
<!-- This file helps Netlify detect all form fields during build -->

`;

// Generate forms from contact.json
Object.entries(contactData).forEach(([formSlug, formData]) => {
  const formName = formSlug;
  const fields = formData.formInputs || [];
  
  html += `<!-- ${formData.title} Form -->\n`;
  html += `<form name="${formName}" netlify netlify-honeypot="bot-field" hidden>\n`;
  html += `  <input type="hidden" name="form-name" value="${formName}" />\n`;
  
  // Add all form fields
  fields.forEach(input => {
    html += generateFieldHTML(input) + '\n';
  });
  
  // Add bot-field for honeypot
  html += `  <input type="text" name="bot-field" />\n`;
  html += `</form>\n\n`;
});

// Add the contact form from ContactForm.astro (name: "contact")
html += `<!-- Contact Form -->\n`;
html += `<form name="contact" netlify netlify-honeypot="bot-field" hidden>\n`;
html += `  <input type="hidden" name="form-name" value="contact" />\n`;
html += `  <input type="text" name="name" />\n`;
html += `  <input type="email" name="email" />\n`;
html += `  <textarea name="message"></textarea>\n`;
html += `  <input type="text" name="bot-field" />\n`;
html += `</form>\n`;

// Write to public/netlify-forms.html
const outputPath = join(rootDir, 'public/netlify-forms.html');
writeFileSync(outputPath, html, 'utf-8');

console.log('✓ Generated public/netlify-forms.html');
console.log(`  - Generated ${Object.keys(contactData).length + 1} forms`);

