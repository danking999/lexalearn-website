// Automated Article Generation System
// This script reads Word documents, extracts content using AI, and generates SEO-optimized HTML pages

const fs = require('fs-extra');
const path = require('path');
const mammoth = require('mammoth');
const slugify = require('slugify');
const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configuration
const CONFIG = {
  wordDocsFolder: './word-documents',      // Folder where you put Word docs
  articlesFolder: './articles',            // Output folder for generated HTML
  articlesDataFile: './articles-data.json', // Index of all articles
  appStoreUrl: process.env.APP_STORE_URL || 'https://apps.apple.com/us/app/lexa-ai-learn-languages/id6754065379',
  siteUrl: process.env.SITE_URL || 'https://lexalearn.app',
  aiModel: 'gpt-4o-mini' // Fast and cheap model for processing
  // NOTE: Each Word doc can contain MULTIPLE articles (e.g., 20 articles for 20 different keywords)
  // The AI will automatically detect and split them into separate pages
};

// Create necessary folders
async function setupFolders() {
  await fs.ensureDir(CONFIG.wordDocsFolder);
  await fs.ensureDir(CONFIG.articlesFolder);
  console.log('✓ Folders ready');
}

// Extract text content from Word document
async function extractWordContent(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Use AI to split Word doc into multiple articles and extract data for each
async function splitIntoMultipleArticles(rawText, fileName) {
  console.log(`  → Analyzing document to detect multiple articles...`);
  
  // First, try to split by the "lexa article #" delimiter
  const articleSections = rawText.split(/lexa article \d+/i);
  const hasDelimiters = articleSections.length > 2; // More than 2 means we found delimiters
  
  if (hasDelimiters) {
    console.log(`  ✓ Found ${articleSections.length - 1} articles using "lexa article #" delimiter`);
    
    // Manual split when delimiters are found - more reliable than AI for large docs
    const articles = [];
    
    for (let i = 1; i < articleSections.length; i++) { // Skip first section (before first delimiter)
      const content = articleSections[i].trim();
      if (!content) continue; // Skip empty sections
      
      // Extract title from first line or first 100 chars
      const lines = content.split('\n').filter(l => l.trim());
      const title = lines[0] || `Article ${i}`;
      
      // Use title or first heading as target keyword
      const targetKeyword = title
        .replace(/^#+\s*/, '') // Remove markdown headers
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .toLowerCase()
        .trim()
        .substring(0, 60); // Max 60 chars
      
      articles.push({
        targetKeyword: targetKeyword || `article-${i}`,
        title: title,
        content: content
      });
      
      console.log(`  ✓ Split article ${i}: "${targetKeyword}"`);
    }
    
    console.log(`  ✓ Successfully split into ${articles.length} articles manually`);
    return articles;
  }
  
  // If no delimiters, use AI to detect articles (for unstructured documents)
  console.log(`  → No delimiters found, using AI to detect articles...`);
  
  const prompt = `You are an SEO expert. The following text contains MULTIPLE separate articles, each targeting a different search term/keyword phrase.

DOCUMENT CONTENT:
${rawText.substring(0, 15000)} // Limit to prevent token overflow

YOUR TASK:
1. Identify and separate all individual articles in this document
2. Each article should target a specific search term or keyword phrase
3. For EACH article, extract:
   - The target search term/keyword phrase (the main topic/keyword the article targets)
   - Article title (create a compelling title if not clearly stated)
   - Article content (everything that belongs to that article)

RESPOND IN THIS EXACT JSON FORMAT (valid JSON only, no markdown):
{
  "articles": [
    {
      "targetKeyword": "best language learning app",
      "title": "Article title here",
      "content": "Full article text content here..."
    }
  ]
}

IMPORTANT:
- Return ALL articles found in the document
- Each article should be complete with all its content
- Preserve the original content structure`;

  try {
    const completion = await openai.chat.completions.create({
      model: CONFIG.aiModel,
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Always respond with valid JSON only, no markdown formatting. Escape all quotes properly in JSON strings."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 12000 // Increased for multiple articles
    });

    let responseText = completion.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Try to fix common JSON issues before parsing
    responseText = responseText.replace(/\n/g, '\\n'); // Escape newlines
    
    const splitData = JSON.parse(responseText);
    
    if (!splitData.articles || !Array.isArray(splitData.articles) || splitData.articles.length === 0) {
      throw new Error('No articles detected in response');
    }
    
    console.log(`  ✓ Detected ${splitData.articles.length} articles in document`);
    return splitData.articles;
    
  } catch (error) {
    console.error('  ✗ AI article splitting failed:', error.message);
    console.error('  → Falling back to single article mode');
    // Fallback: treat entire document as one article
    return [{
      targetKeyword: fileName.replace('.docx', ''),
      title: fileName.replace('.docx', ''),
      content: rawText
    }];
  }
}

// Use AI to process individual article and extract SEO data + HTML content
async function processArticleWithAI(articleContent, targetKeyword, fileName) {
  console.log(`    → Processing article for: "${targetKeyword}"`);
  
  const prompt = `You are an SEO expert and web developer. Convert the following article into a well-structured HTML article for a language learning app website called "Lexa AI".

TARGET SEARCH TERM: ${targetKeyword}

ARTICLE CONTENT:
${articleContent}

YOUR TASK:
1. Create SEO-optimized content targeting the keyword: "${targetKeyword}"
   - A compelling SEO title (50-60 characters) - must include the target keyword naturally
   - A URL-friendly slug (lowercase, hyphens) - based on the target keyword
   - A meta description (150-160 characters) - must include the target keyword
   - 5-8 relevant keywords (must include the target keyword)
   
2. Convert the content to clean, semantic HTML with:
   - Proper heading hierarchy (H1 for title with target keyword, H2 for main sections, H3 for subsections)
   - Well-formatted paragraphs
   - Bullet/numbered lists where appropriate
   - Bold/emphasis where it improves readability
   - Add 1-2 CTAs (call-to-action) encouraging users to try Lexa AI
   - Ensure target keyword appears naturally throughout (but don't over-optimize)
   
3. Make the content SEO-friendly:
   - Use target keyword naturally in H1, first paragraph, and throughout content
   - Add internal linking opportunities (mention "language learning", "AI tutor", etc.)
   - Include relevant examples
   
4. Add a CTA section near the middle and end using this HTML:
   <div class="article-cta">
     <a class="cta-button" href="${CONFIG.appStoreUrl}" target="_blank" rel="noopener noreferrer">Try Lexa AI - Start Learning Today</a>
   </div>

RESPOND IN THIS EXACT JSON FORMAT (valid JSON only, no markdown):
{
  "title": "SEO-optimized title with target keyword",
  "slug": "url-friendly-slug",
  "metaDescription": "Compelling 150-160 char description with target keyword",
  "keywords": "keyword1, keyword2, keyword3, keyword4, keyword5",
  "targetKeyword": "${targetKeyword}",
  "htmlContent": "<h1>Title</h1><p>Content...</p>..."
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: CONFIG.aiModel,
      messages: [
        {
          role: "system",
          content: "You are an SEO expert and web developer. Always respond with valid JSON only, no markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 6000
    });

    let responseText = completion.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    const articleData = JSON.parse(responseText);
    
    // Validate the response has required fields
    if (!articleData.title || !articleData.slug || !articleData.htmlContent) {
      throw new Error('AI response missing required fields');
    }
    
    return articleData;
  } catch (error) {
    console.error('    ✗ AI processing failed:', error.message);
    
    // Fallback: create basic structure from raw text
    return createFallbackArticle(articleContent, targetKeyword);
  }
}

// Fallback function if AI fails - creates basic article structure
function createFallbackArticle(rawText, targetKeywordOrFileName) {
  const lines = rawText.split('\n').filter(line => line.trim());
  const title = lines[0] || targetKeywordOrFileName;
  const slug = slugify(title, { lower: true, strict: true });
  
  // Convert paragraphs to HTML
  const htmlContent = lines.map((line, index) => {
    if (index === 0) return `<h1>${line}</h1>`;
    if (line.length < 100 && line.endsWith(':')) return `<h2>${line}</h2>`;
    return `<p>${line}</p>`;
  }).join('\n');
  
  return {
    title,
    slug,
    metaDescription: rawText.substring(0, 160),
    keywords: 'language learning, AI tutor, learn languages',
    targetKeyword: targetKeywordOrFileName,
    htmlContent: htmlContent + `\n<div class="article-cta">
      <a class="cta-button" href="${CONFIG.appStoreUrl}" target="_blank" rel="noopener noreferrer">Try Lexa AI</a>
    </div>`
  };
}

// Generate complete HTML page from article data
function generateHTMLPage(articleData) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${articleData.title} | Lexa AI</title>
    <meta name="description" content="${articleData.metaDescription}">
    <meta name="keywords" content="${articleData.keywords}">
    
    <!-- Open Graph tags for social sharing -->
    <meta property="og:title" content="${articleData.title}">
    <meta property="og:description" content="${articleData.metaDescription}">
    <meta property="og:url" content="${CONFIG.siteUrl}/articles/${articleData.slug}.html">
    <meta property="og:type" content="article">
    
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${articleData.title}">
    <meta name="twitter:description" content="${articleData.metaDescription}">
    
    <!-- Canonical URL for SEO -->
    <link rel="canonical" href="${CONFIG.siteUrl}/articles/${articleData.slug}.html">
    
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../article-styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <img src="../images/20251013_1530_Matte Black Icon_remix_01k7e7js4hepdsmwsm9g90b7r5 (1) copy-min.png" alt="LexaLearn Logo" class="navbar-icon">
                <h2><a href="../index.html" style="color: inherit; text-decoration: none;">Lexa AI</a></h2>
            </div>
            <div class="nav-links">
                <a href="../index.html#features">Features</a>
                <a href="../articles.html">Articles</a>
                <a href="../terms.html">Terms</a>
                <a href="../privacy.html">Privacy</a>
            </div>
        </div>
    </nav>

    <!-- Article Content -->
    <article class="article-container">
        <div class="article-content">
            ${articleData.htmlContent}
        </div>
        
        <!-- Related Articles / Internal Linking -->
        <aside class="article-sidebar">
            <h3>More Articles</h3>
            <ul class="related-articles">
                <li><a href="../articles.html">View All Articles</a></li>
                <li><a href="../index.html">Back to Home</a></li>
            </ul>
        </aside>
    </article>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Lexa AI</h3>
                    <p>AI-powered language learning through natural conversations.</p>
                </div>
                <div class="footer-section">
                    <h4>Product</h4>
                    <ul>
                        <li><a href="../index.html#features">Features</a></li>
                        <li><a href="../articles.html">Articles</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="../terms.html">Terms of Service</a></li>
                        <li><a href="../privacy.html">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="mailto:hello@lexalearn.app">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Lexa AI. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Mobile Download Banner (sticky on mobile) -->
    <div class="mobile-download-banner" id="mobileBanner">
        <button class="close-banner" onclick="closeBanner()" aria-label="Close banner">×</button>
        <div class="banner-content">
            <div class="banner-text">
                <h4>Start Learning Today</h4>
                <p>Download Lexa AI and practice speaking!</p>
            </div>
            <div class="banner-button">
                <a class="cta-button" href="${CONFIG.appStoreUrl}" target="_blank" rel="noopener noreferrer">Download</a>
            </div>
        </div>
    </div>

    <script>
        // Mobile banner close functionality
        function closeBanner() {
            const banner = document.getElementById('mobileBanner');
            if (banner) {
                banner.style.display = 'none';
                // Remember user closed banner (optional - persists for 24 hours)
                localStorage.setItem('bannerClosed', Date.now());
            }
        }

        // Check if user previously closed banner
        window.addEventListener('DOMContentLoaded', function() {
            const bannerClosed = localStorage.getItem('bannerClosed');
            if (bannerClosed) {
                const timeSinceClosed = Date.now() - parseInt(bannerClosed);
                // Show banner again after 24 hours
                if (timeSinceClosed < 24 * 60 * 60 * 1000) {
                    const banner = document.getElementById('mobileBanner');
                    if (banner) banner.style.display = 'none';
                }
            }
        });
    </script>
</body>
</html>`;
}

// Process a single Word document (may contain multiple articles)
async function processWordDocument(filePath, fileName) {
  console.log(`\n📄 Processing: ${fileName}`);
  
  try {
    // Step 1: Extract raw text from Word doc
    console.log('  → Extracting text from Word document...');
    const rawText = await extractWordContent(filePath);
    
    if (!rawText || rawText.trim().length < 100) {
      console.log('  ✗ Document is empty or too short, skipping');
      return [];
    }
    
    // Step 2: Split document into multiple articles using AI
    const articles = await splitIntoMultipleArticles(rawText, fileName);
    
    // Step 3: Process each article individually
    const generatedArticles = [];
    
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`\n  📝 Article ${i + 1}/${articles.length}: "${article.targetKeyword}"`);
      
      try {
        // Process this article with AI to get SEO-optimized content
        const articleData = await processArticleWithAI(
          article.content,
          article.targetKeyword,
          fileName
        );
        
        // Generate HTML page for this article
        const html = generateHTMLPage(articleData);
        
        // Save HTML file with unique slug
        const outputPath = path.join(CONFIG.articlesFolder, `${articleData.slug}.html`);
        await fs.writeFile(outputPath, html);
        
        console.log(`    ✓ Generated: ${articleData.slug}.html`);
        console.log(`    ✓ Title: ${articleData.title}`);
        
        // Collect metadata for articles index
        generatedArticles.push({
          title: articleData.title,
          slug: articleData.slug,
          description: articleData.metaDescription,
          keywords: articleData.keywords,
          targetKeyword: articleData.targetKeyword
        });
        
        // Small delay between articles to avoid rate limits
        if (i < articles.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`    ✗ Error processing article "${article.targetKeyword}":`, error.message);
      }
    }
    
    return generatedArticles;
    
  } catch (error) {
    console.error(`  ✗ Error processing ${fileName}:`, error.message);
    return [];
  }
}

// Process all Word documents in batches
async function processAllDocuments() {
  console.log('\n🚀 Starting automated article generation...\n');
  
  // Get all .docx files from word-documents folder
  const files = await fs.readdir(CONFIG.wordDocsFolder);
  const wordFiles = files.filter(f => f.endsWith('.docx') && !f.startsWith('~')); // Exclude temp files
  
  if (wordFiles.length === 0) {
    console.log('❌ No Word documents found in', CONFIG.wordDocsFolder);
    console.log('   Please add .docx files to that folder and try again.');
    return;
  }
  
  console.log(`📚 Found ${wordFiles.length} Word documents to process\n`);
  
  const allArticles = [];
  let successCount = 0;
  let failCount = 0;
  
  // Process documents sequentially (each doc may contain multiple articles)
  for (let i = 0; i < wordFiles.length; i++) {
    const fileName = wordFiles[i];
    console.log(`\n--- Processing document ${i + 1} of ${wordFiles.length} ---`);
    
    const filePath = path.join(CONFIG.wordDocsFolder, fileName);
    const generatedArticles = await processWordDocument(filePath, fileName);
    
    // generatedArticles is an array of articles from this document
    if (generatedArticles && generatedArticles.length > 0) {
      allArticles.push(...generatedArticles); // Spread array to add all articles
      successCount += generatedArticles.length;
      console.log(`\n  ✅ Successfully generated ${generatedArticles.length} articles from ${fileName}`);
    } else {
      failCount++;
      console.log(`\n  ❌ Failed to generate articles from ${fileName}`);
    }
    
    // Delay between documents to respect rate limits
    if (i < wordFiles.length - 1) {
      console.log('\n⏳ Waiting 3 seconds before next document...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Merge with existing articles data (don't overwrite!)
  let existingArticles = [];
  try {
    if (await fs.pathExists(CONFIG.articlesDataFile)) {
      existingArticles = await fs.readJson(CONFIG.articlesDataFile);
    }
  } catch (error) {
    console.log('⚠️  Could not read existing articles data, creating new file');
  }
  
  // Merge new articles with existing ones (avoid duplicates by slug)
  const existingSlugs = new Set(existingArticles.map(a => a.slug));
  const newArticles = allArticles.filter(a => !existingSlugs.has(a.slug));
  const mergedArticles = [...existingArticles, ...newArticles];
  
  // Save merged articles index data
  await fs.writeJson(CONFIG.articlesDataFile, mergedArticles, { spaces: 2 });
  
  console.log(`\n📊 Articles index: ${existingArticles.length} existing + ${newArticles.length} new = ${mergedArticles.length} total`);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ GENERATION COMPLETE!');
  console.log('='.repeat(60));
  console.log(`✓ Successfully generated: ${successCount} articles`);
  if (failCount > 0) {
    console.log(`✗ Failed: ${failCount} documents`);
  }
  console.log(`📊 Articles index saved to: ${CONFIG.articlesDataFile}`);
  console.log(`📁 HTML files saved to: ${CONFIG.articlesFolder}/`);
  console.log('\n🚀 Next steps:');
  console.log('   1. Review the generated articles in the /articles folder');
  console.log('   2. Make any manual edits if needed');
  console.log('   3. Deploy: git add . && git commit -m "Add articles" && git push');
  console.log('\n');
}

// Main execution
async function main() {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('\n❌ ERROR: OPENAI_API_KEY not found in .env file');
      console.log('\n📝 Setup instructions:');
      console.log('   1. Copy .env.example to .env');
      console.log('   2. Get your API key from https://platform.openai.com/api-keys');
      console.log('   3. Add it to .env: OPENAI_API_KEY=sk-...');
      console.log('   4. Run this script again\n');
      process.exit(1);
    }
    
    // Setup folders
    await setupFolders();
    
    // Process all documents
    await processAllDocuments();
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

