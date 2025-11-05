// Script to rebuild articles-data.json from existing HTML files
// Use this if your articles index gets overwritten

const fs = require('fs-extra');
const path = require('path');

const articlesFolder = './articles';
const articlesDataFile = './articles-data.json';

async function extractMetaFromHTML(htmlContent) {
  // Extract title from meta tag
  const titleMatch = htmlContent.match(/<title>(.*?)\s*\|\s*Lexa AI<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
  
  // Extract meta description
  const descMatch = htmlContent.match(/<meta name="description" content="(.*?)"/);
  const description = descMatch ? descMatch[1] : '';
  
  // Extract keywords
  const keywordsMatch = htmlContent.match(/<meta name="keywords" content="(.*?)"/);
  const keywords = keywordsMatch ? keywordsMatch[1] : '';
  
  // Try to extract target keyword from content or use title
  const targetKeyword = title.toLowerCase()
    .replace(/\s*-\s*.*$/, '') // Remove " - something" from title
    .replace(/\s*\|\s*.*$/, ''); // Remove " | something" from title
  
  return {
    title,
    description,
    keywords,
    targetKeyword
  };
}

async function rebuildArticlesIndex() {
  console.log('\n🔧 Rebuilding articles index from HTML files...\n');
  
  // Get all HTML files from articles folder
  const files = await fs.readdir(articlesFolder);
  const htmlFiles = files.filter(f => f.endsWith('.html'));
  
  console.log(`📄 Found ${htmlFiles.length} HTML files\n`);
  
  const articles = [];
  
  for (const fileName of htmlFiles) {
    const slug = fileName.replace('.html', '');
    const filePath = path.join(articlesFolder, fileName);
    
    try {
      const htmlContent = await fs.readFile(filePath, 'utf-8');
      const meta = await extractMetaFromHTML(htmlContent);
      
      articles.push({
        title: meta.title,
        slug: slug,
        description: meta.description,
        keywords: meta.keywords,
        targetKeyword: meta.targetKeyword
      });
      
      console.log(`✓ ${slug}`);
      console.log(`  Title: ${meta.title}`);
      
    } catch (error) {
      console.error(`✗ Error reading ${fileName}:`, error.message);
    }
  }
  
  // Save to articles-data.json
  await fs.writeJson(articlesDataFile, articles, { spaces: 2 });
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Rebuilt articles index!`);
  console.log(`📊 Total articles: ${articles.length}`);
  console.log(`💾 Saved to: ${articlesDataFile}`);
  console.log('='.repeat(60) + '\n');
}

rebuildArticlesIndex().catch(error => {
  console.error('❌ Error rebuilding index:', error);
  process.exit(1);
});

