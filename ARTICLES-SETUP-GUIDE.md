# Quick Guide: Bulk Upload 20 SEO Articles

## Overview
This system allows you to quickly convert your Word document articles into individual SEO-optimized HTML pages.

## Step-by-Step Process

### Step 1: Prepare Your Articles Data
1. Open your Word document with the 20 articles
2. Open `generate-articles.js` 
3. For each article, copy the content and fill in this format:

```javascript
{
  title: "Your Article Title Here",
  slug: "url-friendly-name-here",  // Use lowercase, hyphens instead of spaces
  metaDescription: "150-160 character description for Google search results",
  keywords: "keyword1, keyword2, keyword3",
  content: `
    <h1>Your Article Title</h1>
    <p>Your first paragraph...</p>
    
    <h2>Section Heading</h2>
    <p>Section content...</p>
    
    <h2>Another Section</h2>
    <p>More content...</p>
    
    <div class="article-cta">
      <a class="cta-button" href="https://apps.apple.com/us/app/lexa-ai-learn-languages/id6754065379" target="_blank" rel="noopener noreferrer">Try Lexa AI - Download Now</a>
    </div>
  `
}
```

### Step 2: Convert Word Content to HTML
For each article in your Word doc:
- **Paragraph text** → `<p>text here</p>`
- **Main headings** → `<h2>Heading Text</h2>`
- **Subheadings** → `<h3>Subheading Text</h3>`
- **Bullet lists** → 
  ```html
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
  ```
- **Numbered lists** → 
  ```html
  <ol>
    <li>Item 1</li>
    <li>Item 2</li>
  </ol>
  ```
- **Bold text** → `<strong>bold text</strong>`
- **Italic text** → `<em>italic text</em>`

### Step 3: Generate Article Pages
Once you've filled in all 20 articles in `generate-articles.js`:

```bash
node generate-articles.js
```

This will:
- Create 20 individual HTML files in the `/articles` folder
- Generate `articles-data.json` for the articles index page
- Each article will have proper SEO meta tags, navigation, and footer

### Step 4: Deploy to Vercel
```bash
git add .
git commit -m "Add 20 SEO articles"
git push
```

Vercel will automatically deploy your changes.

## Tips for SEO

### 1. Choose Good Slugs
- Use the main keyword from each search term
- Keep it short and readable
- Example: "best language learning app" → `best-language-learning-app`

### 2. Write Good Meta Descriptions
- 150-160 characters
- Include main keyword
- Make it compelling for clicks

### 3. Content Structure
- Start with H1 (article title)
- Use H2 for main sections
- Use H3 for subsections
- Include 1-2 CTAs per article
- Aim for 800-2000 words per article

### 4. Internal Linking
- Link to your main page
- Link between related articles
- Link to the App Store

## Quick Example

Here's a complete example of one article:

```javascript
{
  title: "How to Learn Spanish Fast: 10 Proven Methods",
  slug: "how-to-learn-spanish-fast",
  metaDescription: "Discover 10 proven methods to learn Spanish fast. Expert tips on conversation practice, AI tutoring, and effective study techniques for rapid progress.",
  keywords: "learn spanish fast, how to learn spanish, spanish learning tips, learn spanish quickly",
  content: `
    <h1>How to Learn Spanish Fast: 10 Proven Methods</h1>
    
    <p>Learning Spanish doesn't have to take years. With the right approach and modern tools, you can achieve conversational fluency faster than you think. Here are 10 proven methods that will accelerate your Spanish learning journey.</p>
    
    <h2>1. Practice Speaking from Day One</h2>
    <p>The biggest mistake language learners make is waiting until they're "ready" to start speaking. Research shows that learners who practice speaking from day one progress 3x faster than those who focus only on reading and writing.</p>
    
    <p>With AI language tutors like Lexa AI, you can start having conversations immediately without the pressure of speaking to a real person. This builds confidence and helps you learn naturally.</p>
    
    <h2>2. Use Spaced Repetition for Vocabulary</h2>
    <p>Spaced repetition is scientifically proven to improve long-term retention by 85%. Instead of cramming words, review them at optimal intervals to move vocabulary into long-term memory.</p>
    
    <h2>3. Immerse Yourself in the Language</h2>
    <p>Create an immersive environment by changing your phone language to Spanish, listening to Spanish podcasts, and watching Spanish content. Immersion accelerates learning by forcing your brain to think in Spanish.</p>
    
    <div class="article-cta">
      <a class="cta-button" href="https://apps.apple.com/us/app/lexa-ai-learn-languages/id6754065379" target="_blank" rel="noopener noreferrer">Start Learning Spanish with Lexa AI</a>
    </div>
    
    <h2>Conclusion</h2>
    <p>Learning Spanish fast is possible with the right combination of speaking practice, spaced repetition, and immersion. Start today with Lexa AI and experience the fastest way to learn Spanish through AI-powered conversations.</p>
  `
}
```

## Need Help?
If you run into any issues, contact hello@lexalearn.app

