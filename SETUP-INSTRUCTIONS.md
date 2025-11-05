# 🚀 Automated Article Generation - Setup Instructions

## What This System Does

**Automatically converts Word documents into SEO-optimized HTML pages using AI.**

Perfect for handling **thousands of articles** efficiently:
- Upload Word docs to a folder
- AI extracts and formats content
- Generates complete HTML pages with SEO tags
- Creates article index automatically
- Deploy to production

## 📦 Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `mammoth` - Reads Word documents
- `openai` - AI processing
- `slugify` - Creates URL-friendly names
- Other utilities

## 🔑 Step 2: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create account or sign in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-...`)

## ⚙️ Step 3: Configure Environment

```bash
# Copy the example file
cp .env.example .env

# Edit .env file and add your API key
nano .env
```

Your `.env` file should contain:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxx
APP_STORE_URL=https://apps.apple.com/us/app/lexa-ai-learn-languages/id6754065379
SITE_URL=https://lexalearn.app
```

**Save and close the file.**

## 📄 Step 4: Add Your Word Documents

```bash
# Copy all your .docx files to the word-documents folder
# You can drag & drop them or use terminal:

cp /path/to/your/articles/*.docx word-documents/
```

Example structure:
```
word-documents/
├── best-language-learning-app.docx
├── how-to-learn-spanish-fast.docx
├── ai-language-tutor-benefits.docx
├── learn-french-online.docx
└── ... (all your articles)
```

**Each Word doc = One article page**

## 🎬 Step 5: Run the Generator

```bash
npm run generate
```

The script will:
1. ✓ Find all Word docs in `word-documents/`
2. ✓ Extract text from each document
3. ✓ Send to AI for processing
4. ✓ Generate SEO-optimized HTML
5. ✓ Save to `articles/` folder
6. ✓ Create articles index

**Progress will show in terminal:**
```
🚀 Starting automated article generation...
📚 Found 20 Word documents to process

📄 Processing: best-language-learning-app.docx
  → Extracting text from Word document...
  → Processing with AI...
  ✓ Generated: best-language-learning-app.html
  ✓ Title: Best Language Learning App - Complete Guide 2025

...

✅ GENERATION COMPLETE!
✓ Successfully generated: 20 articles
```

## 📊 Step 6: Review Generated Articles

```bash
# View the generated HTML files
ls -la articles/

# Open one in browser to check
open articles/best-language-learning-app.html
```

**Check:**
- ✓ Content looks good
- ✓ Headings are proper
- ✓ CTAs are in place
- ✓ SEO tags are correct

## 🚀 Step 7: Deploy to Production

```bash
git add .
git commit -m "Add AI-generated articles"
git push
```

Vercel will automatically deploy your changes.

**Your articles will be live at:**
- https://lexalearn.app/articles.html (index)
- https://lexalearn.app/articles/article-slug.html (individual pages)

---

## 💰 Cost Information

Using **GPT-4o-mini** (recommended):
- ~$0.01-$0.02 per article
- 20 articles = ~$0.20-$0.40
- 1000 articles = ~$10-$20

**Very affordable for bulk processing!**

---

## 🔄 Processing More Articles Later

**To add more articles in the future:**

1. Add new `.docx` files to `word-documents/` folder
2. Run `npm run generate` again
3. It will process new files and add to existing articles
4. Push changes to deploy

---

## 📝 Word Document Tips

Your Word docs can be in any format, but for best results:

### Good Format:
```
Title of Your Article

Introduction paragraph explaining the topic...

Main Heading 1
Content for this section with multiple paragraphs...

Main Heading 2
More content here...

Key points to remember:
• Point 1
• Point 2
• Point 3

Conclusion paragraph...
```

### AI Will Automatically:
- ✓ Create proper HTML structure
- ✓ Add H1, H2, H3 headings
- ✓ Format paragraphs and lists
- ✓ Generate SEO title & description
- ✓ Create URL-friendly slug
- ✓ Add call-to-action buttons
- ✓ Insert navigation & footer

**Minimum 300 words recommended per article.**

---

## 🎯 What Gets Generated

For each Word document, you get:

### 1. Complete HTML Page
- Full page with navigation
- Properly formatted content
- Footer with links
- Mobile responsive

### 2. SEO Optimization
- Meta title (50-60 chars)
- Meta description (150-160 chars)
- Keywords
- Open Graph tags (social media)
- Twitter Card tags
- Canonical URL

### 3. Call-to-Actions
- Links to App Store
- Encourages downloads
- Strategic placement

### 4. Internal Linking
- Links to homepage
- Links to articles index
- Navigation menu

---

## 🛠️ Troubleshooting

### Problem: "OPENAI_API_KEY not found"
**Solution:** Make sure `.env` file exists with your API key

### Problem: "No Word documents found"
**Solution:** Add `.docx` files to `word-documents/` folder

### Problem: "AI processing failed"
**Solution:** Script will create a basic version automatically. You can manually edit the generated HTML file.

### Problem: "Rate limit exceeded"
**Solution:** 
- Wait a few minutes and try again
- Or reduce `batchSize` in `auto-generate-articles.js` from 5 to 2

### Problem: Article content looks wrong
**Solution:**
- Open the generated HTML file in `articles/` folder
- Manually edit as needed
- HTML knowledge helpful but not required

---

## 📞 Need Help?

Read the detailed documentation:
- `README-AUTOMATION.md` - Full technical details
- `ARTICLES-SETUP-GUIDE.md` - Manual setup guide (backup method)

Contact: hello@lexalearn.app

---

## ✅ Quick Checklist

Before running the generator, make sure:

- [ ] Node.js installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with API key
- [ ] Word documents in `word-documents/` folder
- [ ] Word docs are `.docx` format (not `.doc`)

Then run: `npm run generate`

---

## 🎉 That's It!

The system handles everything automatically. Just:
1. Add Word docs
2. Run script
3. Review results
4. Deploy

**Perfect for scaling to thousands of articles!**

