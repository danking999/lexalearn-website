# Automated Article Generation System

This system automatically processes Word documents and generates SEO-optimized HTML pages using AI. Perfect for handling thousands of articles efficiently.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup API Key
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your OpenAI API key
# Get it from: https://platform.openai.com/api-keys
```

Your `.env` file should look like:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
APP_STORE_URL=https://apps.apple.com/us/app/lexa-ai-learn-languages/id6754065379
SITE_URL=https://lexalearn.app
```

### 3. Add Your Word Documents
```bash
# Place all your .docx files in the word-documents folder
# Example:
word-documents/
  ├── best-language-learning-app.docx
  ├── how-to-learn-spanish.docx
  ├── ai-language-tutor-benefits.docx
  └── ... (add all your Word docs here)
```

### 4. Run the Generator
```bash
npm run generate
```

### 5. Deploy
```bash
git add .
git commit -m "Add AI-generated articles"
git push
```

## 📋 How It Works

### The Automation Process:

1. **Extract Content**: Reads all `.docx` files from `word-documents/` folder
2. **AI Processing**: Uses OpenAI GPT-4o-mini to:
   - Analyze the article content
   - Generate SEO title (50-60 chars)
   - Create URL-friendly slug
   - Write meta description (150-160 chars)
   - Extract/suggest keywords
   - Convert to clean, semantic HTML
   - Add proper heading structure
   - Insert call-to-action buttons
3. **Generate Pages**: Creates individual HTML files with full page structure
4. **Create Index**: Generates `articles-data.json` for the articles listing page
5. **SEO Optimization**: Each page includes:
   - Meta tags for Google
   - Open Graph tags for social media
   - Twitter Card tags
   - Canonical URLs
   - Structured headings
   - Internal linking

### Features:

✅ **Fully Automated** - Just drop Word docs in folder and run  
✅ **AI-Powered** - Smart content analysis and HTML generation  
✅ **SEO-Optimized** - Proper meta tags, descriptions, keywords  
✅ **Batch Processing** - Handles thousands of articles efficiently  
✅ **Rate Limit Safe** - Processes in batches to avoid API limits  
✅ **Error Handling** - Fallback system if AI fails  
✅ **Cost Efficient** - Uses GPT-4o-mini (~$0.01 per article)  

## 💰 Cost Estimation

Using OpenAI GPT-4o-mini:
- **Input**: ~$0.15 per 1M tokens
- **Output**: ~$0.60 per 1M tokens
- **Average per article**: ~$0.01 - $0.02
- **1000 articles**: ~$10 - $20

Using GPT-4o (more accurate):
- **Average per article**: ~$0.05 - $0.10
- **1000 articles**: ~$50 - $100

## 📁 Folder Structure

```
lexalearn-website/
├── word-documents/          # ← Put your Word docs here
│   ├── article1.docx
│   ├── article2.docx
│   └── ...
├── articles/                # ← Generated HTML pages appear here
│   ├── article-slug-1.html
│   ├── article-slug-2.html
│   └── ...
├── articles-data.json       # ← Index of all articles (auto-generated)
├── auto-generate-articles.js # ← Main automation script
├── article-styles.css       # ← Article page styling
├── articles.html            # ← Articles listing page
├── .env                     # ← Your API keys (do not commit!)
└── .env.example             # ← Example env file
```

## 🎯 Word Document Format

Your Word documents can be in any format. The AI will automatically:
- Detect the article structure
- Create appropriate headings
- Format paragraphs
- Convert lists
- Add CTAs

**Best practices for Word docs:**
- Use clear headings for sections
- Write in paragraphs
- Include bullet points or numbered lists where appropriate
- Keep content focused on the target keyword/topic
- Minimum 300 words recommended

**Example Word doc structure:**
```
Best Language Learning App 2025

Introduction paragraph about language learning...

Why Speaking Practice Matters
Paragraph about speaking practice...

Top Features to Look For
• Feature 1
• Feature 2
• Feature 3

How AI Changes Language Learning
Paragraph about AI tutoring...

Conclusion paragraph...
```

## ⚙️ Configuration Options

Edit `auto-generate-articles.js` to customize:

```javascript
const CONFIG = {
  wordDocsFolder: './word-documents',     // Input folder
  articlesFolder: './articles',           // Output folder
  aiModel: 'gpt-4o-mini',                // AI model to use
  batchSize: 5                           // Articles per batch
};
```

### AI Models:
- `gpt-4o-mini` - Fast, cheap, good quality (recommended)
- `gpt-4o` - Highest quality, more expensive
- `gpt-3.5-turbo` - Cheapest, lower quality

## 🔧 Troubleshooting

### "No API key found"
→ Make sure `.env` file exists with your OpenAI API key

### "No Word documents found"
→ Make sure `.docx` files are in the `word-documents/` folder

### "AI processing failed"
→ The script will use a fallback method to create basic HTML
→ You can manually edit the generated file

### "Rate limit exceeded"
→ Reduce `batchSize` in config to process fewer articles at once
→ The script already includes delays between batches

### Articles look wrong
→ Check the generated HTML in `/articles` folder
→ You can manually edit any file
→ Adjust the AI prompt in `auto-generate-articles.js` if needed

## 🎨 Customization

### Change CTA Text
Edit the AI prompt in `auto-generate-articles.js`:
```javascript
// Find this line and change the CTA text:
<a class="cta-button" href="${CONFIG.appStoreUrl}">Your Custom CTA Text</a>
```

### Change Article Styling
Edit `article-styles.css` to customize colors, fonts, spacing, etc.

### Change AI Instructions
Edit the `prompt` variable in `processArticleWithAI()` function to adjust how AI processes articles.

## 📊 Output Files

Each article generates:
1. **HTML file** in `/articles/` folder
2. **Entry in articles-data.json** with metadata
3. **Console output** showing title, slug, status

## 🚀 Advanced Usage

### Process Specific Files
```javascript
// Edit auto-generate-articles.js to filter files:
const wordFiles = files.filter(f => 
  f.endsWith('.docx') && 
  f.includes('spanish') // Only process Spanish-related articles
);
```

### Use Different AI Provider
The script can be adapted to use Claude, Gemini, or other AI APIs. Just modify the `processArticleWithAI()` function.

### Add Custom Fields
Edit the AI prompt to extract additional data like author, date, category, etc.

## 📝 Example Output

Input: `best-language-learning-app.docx`

Output: 
- File: `articles/best-language-learning-app.html`
- Title: "Best Language Learning App - Complete Guide 2025"
- Meta: Optimized for SEO
- Content: Formatted with proper HTML structure
- CTAs: Links to App Store

## 🔐 Security Notes

- Never commit `.env` file (already in `.gitignore`)
- Keep your OpenAI API key secret
- Set usage limits in OpenAI dashboard to control costs
- The `.env.example` file is safe to commit

## 💡 Tips for Best Results

1. **Quality Input** = Quality Output
   - Write clear, well-structured Word docs
   - Use proper headings and formatting
   - Focus on one topic per document

2. **Review Generated Content**
   - AI is good but not perfect
   - Quick review of generated HTML recommended
   - Edit any awkward phrasing

3. **Monitor Costs**
   - Check OpenAI usage dashboard
   - GPT-4o-mini is very cost-effective
   - Bulk processing is efficient

4. **Test First**
   - Try with 5-10 articles first
   - Check output quality
   - Adjust prompts if needed
   - Then process all articles

## 📞 Support

If you encounter issues:
1. Check this README
2. Review console error messages
3. Check OpenAI API status
4. Contact: hello@lexalearn.app

## 🎉 You're All Set!

Just run `npm run generate` and watch the magic happen!

