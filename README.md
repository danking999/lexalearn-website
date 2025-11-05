# Lexa AI Website - Automated Article Generation System

## 🎯 Overview

This is an automated content management system that converts **thousands of Word documents into SEO-optimized HTML pages** using AI. Perfect for bulk content publishing and SEO optimization at scale.

### What It Does
- 📄 Reads `.docx` files from a folder
- 🤖 Uses AI to extract and format content intelligently  
- 📝 Generates complete HTML pages with SEO optimization
- 🚀 Handles thousands of articles efficiently
- 💰 Cost-effective (~$0.01 per article)

---

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Setup API key
cp .env.example .env
# Edit .env and add your OpenAI API key

# 3. Add Word documents
# Drop your .docx files into word-documents/ folder

# 4. Generate articles
npm run generate

# 5. Deploy
git add . && git commit -m "Add articles" && git push
```

**Done!** Your articles are now live.

---

## 📚 Documentation

Choose your path:

### 🚀 For Quick Setup
→ **[QUICKSTART.md](QUICKSTART.md)** - 5-minute guide to get running

### 📖 For Detailed Instructions  
→ **[SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md)** - Step-by-step setup with troubleshooting

### 🔧 For Technical Details
→ **[README-AUTOMATION.md](README-AUTOMATION.md)** - Full technical documentation & customization

### ✍️ For Manual Method
→ **[ARTICLES-SETUP-GUIDE.md](ARTICLES-SETUP-GUIDE.md)** - Manual article creation (backup option)

---

## 🏗️ System Architecture

```
┌─────────────────┐
│  Word Documents │ (.docx files in word-documents/)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AI Processor  │ (OpenAI GPT-4o-mini)
│                 │ - Extracts content
│                 │ - Generates SEO data
│                 │ - Formats HTML
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  HTML Generator │ (auto-generate-articles.js)
│                 │ - Creates pages
│                 │ - Adds navigation
│                 │ - Injects SEO tags
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Output Pages   │ (HTML in articles/)
│                 │ - SEO optimized
│                 │ - Mobile responsive
│                 │ - Production ready
└─────────────────┘
```

---

## 📁 Project Structure

```
lexalearn-website/
│
├── 📂 word-documents/           ← Input: Your .docx files go here
│   ├── article-1.docx
│   ├── article-2.docx
│   └── ...
│
├── 📂 articles/                 ← Output: Generated HTML files
│   ├── article-slug-1.html
│   ├── article-slug-2.html
│   └── ...
│
├── 📄 auto-generate-articles.js ← Main automation script
├── 📄 articles.html             ← Articles index/listing page
├── 📄 article-styles.css        ← Styling for article pages
├── 📄 articles-data.json        ← Generated index of all articles
│
├── 📄 package.json              ← Dependencies & scripts
├── 📄 .env                      ← Your API keys (not committed)
├── 📄 .env.example              ← Environment template
│
├── 📖 QUICKSTART.md            ← 5-minute setup guide
├── 📖 SETUP-INSTRUCTIONS.md    ← Detailed setup guide
├── 📖 README-AUTOMATION.md     ← Technical documentation
└── 📖 ARTICLES-SETUP-GUIDE.md  ← Manual method guide
```

---

## 🎯 Key Features

### Automated Processing
✅ Batch processing with rate limit protection  
✅ Error handling with automatic fallbacks  
✅ Progress tracking and status updates  
✅ Resume capability (won't reprocess existing articles)

### SEO Optimization
✅ Meta titles (50-60 characters)  
✅ Meta descriptions (150-160 characters)  
✅ Keywords extraction  
✅ Open Graph tags (social media)  
✅ Twitter Card tags  
✅ Canonical URLs  
✅ Semantic HTML structure (H1, H2, H3)

### Content Formatting
✅ Intelligent heading hierarchy  
✅ Proper paragraph formatting  
✅ Bullet and numbered lists  
✅ Call-to-action placement  
✅ Internal linking  
✅ Navigation & footer integration

### Scale & Performance
✅ Handles thousands of articles  
✅ Batch processing (5 articles at a time)  
✅ Cost-efficient (~$0.01 per article)  
✅ Fast processing (~3 minutes for 20 articles)

---

## 💰 Cost Breakdown

Using **GPT-4o-mini** (recommended):

| Articles | Cost | Time |
|----------|------|------|
| 20 | ~$0.40 | ~3 min |
| 100 | ~$2.00 | ~15 min |
| 1,000 | ~$20.00 | ~3 hours |
| 10,000 | ~$200.00 | ~30 hours |

**Very affordable for bulk processing!**

Alternative: **GPT-4o** (higher quality, 5x cost)

---

## 🚀 Usage

### Basic Usage
```bash
# Generate articles from Word documents
npm run generate
```

### Create Test Article
```bash
# Create a sample article to test the system
npm run create-test
```

### Process Specific Batch
Edit `auto-generate-articles.js` to filter files:
```javascript
const wordFiles = files.filter(f => 
  f.endsWith('.docx') && 
  f.includes('spanish') // Only process Spanish articles
);
```

---

## ⚙️ Configuration

Edit `auto-generate-articles.js`:

```javascript
const CONFIG = {
  wordDocsFolder: './word-documents',  // Input folder
  articlesFolder: './articles',        // Output folder  
  aiModel: 'gpt-4o-mini',             // AI model to use
  batchSize: 5                        // Articles per batch
};
```

### AI Model Options
- `gpt-4o-mini` - Fast, cheap, good quality ⭐ **Recommended**
- `gpt-4o` - Highest quality, more expensive
- `gpt-3.5-turbo` - Cheapest, lower quality

---

## 📊 What Gets Generated

For each Word document:

### 1. Complete HTML Page
- Navigation menu
- Article content (formatted)
- Sidebar with related links
- Footer with company info
- Mobile responsive design

### 2. SEO Elements
- Title tag (optimized for search)
- Meta description (for search results)
- Keywords meta tag
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URL

### 3. Content Structure
- H1 heading (article title)
- H2 headings (main sections)
- H3 headings (subsections)
- Paragraphs with proper spacing
- Lists (bullet/numbered)
- Call-to-action buttons

---

## 🔧 Troubleshooting

### Common Issues

**"OPENAI_API_KEY not found"**
→ Create `.env` file with your API key

**"No Word documents found"**
→ Add `.docx` files to `word-documents/` folder

**"AI processing failed"**
→ Script auto-falls back to basic HTML generation  
→ You can manually edit the generated file

**"Rate limit exceeded"**
→ Reduce `batchSize` from 5 to 2 in config  
→ Wait a few minutes and retry

**"Content looks wrong"**
→ Edit generated HTML in `articles/` folder  
→ Or adjust AI prompt in script

---

## 🎨 Customization

### Change Article Styling
Edit `article-styles.css` to modify colors, fonts, spacing

### Change CTA Text/URL
Edit the prompt in `auto-generate-articles.js`:
```javascript
<a class="cta-button" href="YOUR_URL">Your Custom CTA</a>
```

### Add Custom Fields
Modify the AI prompt to extract additional data:
- Author name
- Publication date
- Categories/tags
- Featured image URL

### Use Different AI Provider
The script can be adapted for Claude, Gemini, etc.  
Modify the `processArticleWithAI()` function

---

## 📈 Workflow for Large Batches

### Processing 1,000+ Articles

1. **Test First**
   - Start with 10 articles
   - Verify output quality
   - Adjust prompts if needed

2. **Process in Stages**
   - Batch 1: 100 articles
   - Review and adjust
   - Batch 2: 500 articles
   - Final batch: Remaining articles

3. **Monitor Progress**
   - Check console output
   - Review generated files periodically
   - Monitor OpenAI usage/costs

4. **Quality Control**
   - Spot-check random articles
   - Fix any formatting issues
   - Ensure CTAs are correct

5. **Deploy**
   - Git commit and push
   - Vercel auto-deploys
   - Verify live site

---

## 🔐 Security

- ✅ `.env` file is in `.gitignore` (never committed)
- ✅ API keys stay secret
- ✅ Set OpenAI usage limits to control costs
- ✅ Word documents folder is gitignored (if contains sensitive content)

---

## 🧪 Testing

```bash
# Create a test article
npm run create-test

# This creates: word-documents/test-article.txt
# Convert to .docx and test the generator
```

---

## 📞 Support

### Self-Help Resources
1. Read [QUICKSTART.md](QUICKSTART.md) for quick setup
2. Check [SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md) for detailed steps
3. Review [README-AUTOMATION.md](README-AUTOMATION.md) for technical details

### Get Help
- Email: hello@lexalearn.app
- Check OpenAI API status: https://status.openai.com
- Review OpenAI usage: https://platform.openai.com/usage

---

## 🎓 Example Workflow

Here's how a typical bulk article generation works:

### Scenario: You have 1,000 articles in Word format

**Step 1: Initial Setup (5 min)**
```bash
npm install
cp .env.example .env
# Add API key to .env
```

**Step 2: Add Documents (2 min)**
```bash
# Copy all .docx files to word-documents/
cp ~/my-articles/*.docx word-documents/
```

**Step 3: Test Run (3 min)**
```bash
# Process first 5 articles to test
npm run generate
# Review output in articles/ folder
```

**Step 4: Full Processing (3 hours)**
```bash
# Process all 1,000 articles
npm run generate
# Grab coffee ☕ and let it run
```

**Step 5: Review (30 min)**
```bash
# Spot-check 10-20 random articles
# Make manual edits if needed
```

**Step 6: Deploy (2 min)**
```bash
git add .
git commit -m "Add 1,000 SEO articles"
git push
```

**Total Time**: ~4 hours  
**Total Cost**: ~$20  
**Total Articles**: 1,000 SEO-optimized pages

**Alternative Manual Method**: ~3 months of work at 12 articles/day

---

## ✅ Production Checklist

Before deploying to production:

- [ ] All articles generated successfully
- [ ] Spot-checked random articles for quality
- [ ] SEO tags look correct
- [ ] CTAs link to correct URLs
- [ ] Navigation works on all pages
- [ ] Mobile responsive (test on phone)
- [ ] Articles index page updated
- [ ] Sitemap includes new articles (if applicable)
- [ ] Analytics tracking works (if applicable)

---

## 🚀 Future Enhancements

Possible additions:
- Automatic image generation/selection
- Multi-language support
- Categories/tags system
- Related articles suggestions
- RSS feed generation
- XML sitemap auto-update
- Social media auto-posting
- A/B testing for CTAs

---

## 📜 License

ISC License

---

## 🎉 You're All Set!

This system will **save you weeks of manual work** and make it easy to scale your content to thousands of articles.

**Ready to start?** Read [QUICKSTART.md](QUICKSTART.md) and run `npm run generate` 🚀

---

**Questions?** Check the docs or email hello@lexalearn.app

