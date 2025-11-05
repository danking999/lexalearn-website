# ⚡ Quick Start - 5 Minutes to AI-Generated Articles

## The Problem You're Solving
You have **thousands of articles in Word documents** and need to publish them as SEO-optimized web pages quickly.

## The Solution
This automated system uses AI to:
1. Read your Word documents
2. Extract and format content intelligently
3. Generate SEO-optimized HTML pages
4. Handle thousands of articles efficiently

---

## 🚀 5-Minute Setup

### 1️⃣ Install (30 seconds)
```bash
npm install
```

### 2️⃣ Get API Key (2 minutes)
- Go to: https://platform.openai.com/api-keys
- Sign up / login
- Click "Create new secret key"
- Copy the key

### 3️⃣ Add API Key (30 seconds)
```bash
cp .env.example .env
```

Edit `.env` file and paste your API key:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

### 4️⃣ Add Word Docs (1 minute)
Drop your `.docx` files into the `word-documents/` folder.

### 5️⃣ Generate! (1 minute)
```bash
npm run generate
```

**Done!** Check the `articles/` folder for your generated HTML pages.

---

## 📊 What You Get

For **each Word document**, the system automatically creates:

✅ **Complete HTML page** with navigation & footer  
✅ **SEO-optimized** meta tags & descriptions  
✅ **URL-friendly** slugs (e.g., `best-language-learning-app.html`)  
✅ **Proper structure** with H1, H2, H3 headings  
✅ **Call-to-action** buttons to drive conversions  
✅ **Mobile responsive** design  
✅ **Social media** tags (Open Graph, Twitter Card)  

---

## 💰 Cost

Using GPT-4o-mini (recommended):
- **20 articles**: ~$0.40
- **100 articles**: ~$2.00
- **1,000 articles**: ~$20.00
- **10,000 articles**: ~$200.00

**Extremely cost-effective for bulk processing!**

---

## 🎯 Processing Workflow

```
Word Docs          AI Processing         HTML Pages
---------          -------------         ----------
article1.docx  →   Extract text      →   article1.html
article2.docx  →   Format content    →   article2.html
article3.docx  →   Generate SEO      →   article3.html
   ...         →   Create pages      →      ...
```

The system processes documents in **batches of 5** to respect API rate limits. Includes automatic delays between batches.

---

## 📁 Expected Folder Structure

```
lexalearn-website/
│
├── word-documents/          ← PUT YOUR .DOCX FILES HERE
│   ├── article-1.docx
│   ├── article-2.docx
│   └── ... (all your Word docs)
│
├── articles/                ← GENERATED HTML APPEARS HERE
│   ├── article-1.html
│   ├── article-2.html
│   └── ...
│
├── .env                     ← YOUR API KEY (keep secret!)
├── auto-generate-articles.js ← Main script
└── package.json
```

---

## 🎬 Example Run

```bash
$ npm run generate

🚀 Starting automated article generation...
📚 Found 20 Word documents to process

--- Processing batch 1 of 4 ---

📄 Processing: best-language-learning-app.docx
  → Extracting text from Word document...
  → Processing with AI...
  ✓ Generated: best-language-learning-app.html
  ✓ Title: Best Language Learning App - Complete Guide 2025

📄 Processing: how-to-learn-spanish-fast.docx
  → Extracting text from Word document...
  → Processing with AI...
  ✓ Generated: how-to-learn-spanish-fast.html
  ✓ Title: How to Learn Spanish Fast: 10 Proven Methods

...

============================================================
✅ GENERATION COMPLETE!
============================================================
✓ Successfully generated: 20 articles
📊 Articles index saved to: ./articles-data.json
📁 HTML files saved to: ./articles/

🚀 Next steps:
   1. Review the generated articles in the /articles folder
   2. Make any manual edits if needed
   3. Deploy: git add . && git commit -m "Add articles" && git push
```

---

## 🔍 What the AI Does

For each article, the AI:

1. **Analyzes** the content and topic
2. **Generates** SEO-optimized title (50-60 chars)
3. **Creates** URL slug (e.g., "best-language-learning-app")
4. **Writes** meta description (150-160 chars for Google)
5. **Extracts** 5-8 relevant keywords
6. **Converts** to semantic HTML:
   - Proper heading hierarchy
   - Formatted paragraphs
   - Lists (bullet/numbered)
   - Bold/emphasis where appropriate
7. **Inserts** 1-2 call-to-action buttons
8. **Adds** navigation, footer, and styling
9. **Includes** all SEO meta tags

---

## 📝 Your Word Docs Can Be Any Format

The AI is smart enough to handle different formats:

**Simple format:**
```
Title

Paragraph 1
Paragraph 2
Paragraph 3
```

**Structured format:**
```
Main Title

Introduction...

Section 1 Heading
Content for section 1...

Section 2 Heading
Content for section 2...

• Bullet point 1
• Bullet point 2

Conclusion...
```

Both work! The AI figures it out.

---

## 🚀 Deploy to Production

After generating articles:

```bash
git add .
git commit -m "Add AI-generated articles"
git push
```

Vercel automatically deploys. Your articles will be live at:
- `https://lexalearn.app/articles.html` (index page)
- `https://lexalearn.app/articles/[slug].html` (individual articles)

---

## 🔧 Configuration

Want to customize? Edit `auto-generate-articles.js`:

```javascript
const CONFIG = {
  wordDocsFolder: './word-documents',  // Input folder
  articlesFolder: './articles',        // Output folder
  aiModel: 'gpt-4o-mini',             // AI model
  batchSize: 5                        // Articles per batch
};
```

---

## ⚡ Tips for Maximum Speed

### Processing 1,000+ Articles

1. **Use GPT-4o-mini** (default) - fastest and cheapest
2. **Increase batch size** to 10 (if no rate limits)
3. **Run overnight** for very large batches
4. **Check progress** - the script shows real-time updates

### Expected Processing Times

- **20 articles**: ~2-3 minutes
- **100 articles**: ~15-20 minutes
- **1,000 articles**: ~2-3 hours
- **10,000 articles**: ~20-30 hours

The script can be interrupted and resumed - it won't reprocess existing articles.

---

## 🛡️ Error Handling

The system is robust:

- ✅ **Empty docs**: Skipped automatically
- ✅ **AI failures**: Falls back to basic HTML generation
- ✅ **Rate limits**: Automatic delays and batching
- ✅ **Corrupted files**: Error logged, continues with next file
- ✅ **Duplicate slugs**: Adds number suffix automatically

---

## 📊 Monitoring Costs

Check OpenAI usage:
1. Go to https://platform.openai.com/usage
2. View real-time spending
3. Set spending limits if desired

**Recommended:** Set a monthly limit of $50-100 for safety.

---

## 🎯 Next Steps After Setup

1. **Test with a few docs** first (5-10 articles)
2. **Review generated output** quality
3. **Adjust AI prompt** if needed (in `auto-generate-articles.js`)
4. **Process all articles** once satisfied
5. **Deploy to production**

---

## ❓ Common Questions

**Q: Can I edit the generated HTML?**  
A: Yes! Edit any file in the `articles/` folder.

**Q: What if I add more Word docs later?**  
A: Just run `npm run generate` again. It processes new files.

**Q: Can I use a different AI provider?**  
A: Yes, but requires code modification. OpenAI works best out of the box.

**Q: Does it work with .doc files (old format)?**  
A: Only .docx. Convert old .doc files to .docx first.

**Q: How do I stop a long-running process?**  
A: Press Ctrl+C. Already-generated articles are saved.

---

## 📚 Full Documentation

- **SETUP-INSTRUCTIONS.md** - Detailed setup guide
- **README-AUTOMATION.md** - Technical documentation
- **ARTICLES-SETUP-GUIDE.md** - Manual method (backup)

---

## ✅ Pre-Flight Checklist

Before running `npm run generate`:

- [ ] `npm install` completed
- [ ] `.env` file created with API key
- [ ] `.docx` files in `word-documents/` folder
- [ ] OpenAI account has credits/payment method

**Ready?** Run `npm run generate` 🚀

---

## 🎉 You're Ready!

This system will save you **weeks of manual work** by automating the entire article generation process.

**Questions?** Check the detailed docs or email: hello@lexalearn.app

