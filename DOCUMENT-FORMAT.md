# 📄 Word Document Format Guide

## How to Structure Your Word Documents

The system is optimized to detect articles separated by the delimiter: **"lexa article #"**

---

## ✅ **Recommended Format**

### **Example Document Structure:**

```
lexa article 1

Spanish phrases

Learning Spanish phrases is an essential first step for any traveller or learner. 
Phrases like greetings, polite expressions and common questions help you navigate 
everyday situations...

[Full article content here - 300-2000 words]


lexa article 2

Basic Spanish phrases

When beginners search for "basic Spanish phrases," they often want a concise 
set of expressions to start communicating...

[Full article content here - 300-2000 words]


lexa article 3

Common Spanish phrases

"Common Spanish phrases" usually refers to expressions that appear frequently 
in everyday speech...

[Full article content here - 300-2000 words]
```

---

## 🎯 **Key Points**

### **1. Article Delimiter**
Use `lexa article #` (where # is the article number) to separate articles:
- `lexa article 1`
- `lexa article 2`
- `lexa article 3`
- etc.

**Case insensitive:** "LEXA ARTICLE 1" or "Lexa Article 1" also work.

### **2. Article Title/Keyword**
Put the target keyword or article title immediately after the delimiter:
```
lexa article 1

Spanish phrases    ← This becomes the target keyword

Article content starts here...
```

### **3. Article Content**
Write your full article content (300-2000 words recommended):
- Introduction
- Main sections with subheadings
- Key points or lists
- Conclusion

---

## 📝 **Complete Example**

Here's a full example with 3 articles:

```
lexa article 1

Spanish phrases

Learning Spanish phrases is an essential first step for any traveller or 
learner. Phrases like greetings, polite expressions and common questions 
help you navigate everyday situations.

Key Spanish phrases:
- Hola (Hello)
- Buenos días (Good morning)
- Gracias (Thank you)
- Lo siento (I'm sorry)

These basic expressions are indispensable when meeting people or asking 
for help.

[Continue with more content...]


lexa article 2

Basic Spanish phrases

When beginners search for "basic Spanish phrases," they often want a 
concise set of expressions to start communicating. Simple greetings and 
polite words allow you to connect with locals and show respect.

Essential basic phrases:
- Me llamo... (My name is...)
- Mucho gusto (Nice to meet you)
- Por favor (Please)
- De nada (You're welcome)

[Continue with more content...]


lexa article 3

Common Spanish phrases

"Common Spanish phrases" usually refers to expressions that appear 
frequently in everyday speech. These are the phrases you'll use most 
often in daily conversations.

Common expressions:
- ¿Cómo estás? (How are you?)
- ¿Dónde está...? (Where is...?)
- ¿Cuánto cuesta? (How much does it cost?)

[Continue with more content...]
```

---

## 🤖 **How the System Processes It**

### **Step 1: Delimiter Detection**
The system scans for `lexa article #` markers and counts them:
```
Found 3 articles using "lexa article #" delimiter
```

### **Step 2: AI Analysis**
AI processes each article section to:
- Extract the target keyword (e.g., "Spanish phrases")
- Identify the article title
- Capture all content for that article
- Remove the "lexa article #" marker from final output

### **Step 3: SEO Optimization**
For each article, AI generates:
- SEO-optimized title (50-60 chars)
- Meta description (150-160 chars)
- URL-friendly slug (e.g., `spanish-phrases.html`)
- Keywords list
- Full HTML content with proper structure

### **Step 4: Page Generation**
Creates separate HTML files:
```
articles/
├── spanish-phrases.html
├── basic-spanish-phrases.html
└── common-spanish-phrases.html
```

---

## ✅ **Best Practices**

### **1. Clear Delimiters**
Always use the exact format:
```
lexa article 1
lexa article 2
lexa article 3
```

### **2. Meaningful Keywords**
Start each article with its target keyword/topic:
```
lexa article 1

best language learning app    ← Clear target keyword

Article content...
```

### **3. Substantial Content**
Each article should be 300-2000 words:
- Too short (< 300 words): May not rank well
- Too long (> 2000 words): Consider splitting

### **4. Consistent Structure**
Use similar formatting for all articles:
- Introduction paragraph
- Main sections with subheadings
- Key points or lists
- Conclusion
- Natural keyword usage throughout

### **5. One Document = Many Articles**
You can put 20+ articles in one document:
```
lexa article 1
[Content...]

lexa article 2
[Content...]

...

lexa article 20
[Content...]
```

---

## 🚫 **What NOT to Do**

### ❌ **Don't skip numbers**
```
lexa article 1
lexa article 3  ← Missing #2
lexa article 4
```

### ❌ **Don't use inconsistent formatting**
```
lexa article 1
article 2       ← Missing "lexa"
lexa article 3
```

### ❌ **Don't put multiple topics in one article**
Each article should focus on ONE keyword/topic.

---

## 🧪 **Test Your Format**

### **Quick Test:**

1. Create a Word doc with 2-3 articles using the format
2. Save as `.docx` in `word-documents/` folder
3. Run: `npm run generate`
4. Check console output for:
   ```
   ✓ Found 3 articles using "lexa article #" delimiter
   ```
5. Verify 3 separate HTML files were created

---

## 📊 **Expected Output**

### **Input:**
```
One .docx file with 20 articles
Each marked with "lexa article #"
```

### **Output:**
```
20 separate HTML files in articles/
Each with:
  - Unique URL slug
  - SEO-optimized title & meta tags
  - Full formatted content
  - Navigation & footer
  - Mobile download banner
  - Call-to-action buttons
```

---

## 💡 **Tips for Scale**

### **Processing 1,000+ Articles:**

1. **Organize by topic**
   - Document 1: Spanish phrases (20 articles)
   - Document 2: French phrases (20 articles)
   - Document 3: German phrases (20 articles)

2. **Use descriptive filenames**
   - `spanish-phrases-articles.docx`
   - `french-phrases-articles.docx`

3. **Process in batches**
   - Test with 1-2 documents first
   - Then process all documents
   - System handles duplicates automatically

---

## ✅ **Quick Checklist**

Before uploading your Word document:

- [ ] Articles separated by `lexa article #`
- [ ] Numbers are sequential (1, 2, 3...)
- [ ] Each article has target keyword/title
- [ ] Each article is 300+ words
- [ ] Content is well-structured
- [ ] Saved as `.docx` format

Then run: `npm run generate`

---

## 🎉 **You're Ready!**

Format your Word documents with "lexa article #" delimiters and the system will automatically:
1. Detect all articles
2. Split them accurately
3. Generate SEO-optimized pages
4. Create separate HTML files

**Happy article generating!** 🚀

