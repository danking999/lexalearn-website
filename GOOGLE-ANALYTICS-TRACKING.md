# Google Analytics CTA Tracking Guide

## What Was Added

Google Analytics event tracking has been added to **all CTA (Call-to-Action) buttons** across your entire website. Every time someone clicks a download button, Google Analytics records the event.

## How It Works

Each CTA button now includes an `onclick` event handler that looks like this:

```html
<a class="cta-button" 
   href="https://apps.apple.com/us/app/lexa-ai-learn-languages/id6754065379" 
   onclick="gtag('event', 'click', {
     'event_category': 'CTA', 
     'event_label': 'Hero Section - Download App Store'
   });">
   Download on the App Store
</a>
```

### What Gets Tracked:

1. **Event Category**: All buttons are categorized as `CTA`
2. **Event Label**: Each button has a unique label showing:
   - **Location on page** (Hero Section, Below Features, Articles Page, Article CTA Button, Mobile Banner)
   - **Article name** (for article pages)
   - **Button number** (if multiple on same page)

### Tracked CTA Locations:

#### Main Pages:
- ✅ `index.html` - Hero Section button
- ✅ `index.html` - Below Features section button
- ✅ `articles.html` - Articles Page button

#### Article Pages (40 files):
- ✅ Inline text links (e.g., "download the app here")
- ✅ Article CTA buttons (usually 2 per article)
- ✅ Mobile banner download buttons

---

## How to View Tracking Data in Google Analytics

### Step 1: Access Google Analytics
1. Go to https://analytics.google.com
2. Log in with your Google account
3. Select your property (ID: **G-V427V4DZ43**)

### Step 2: View Real-Time Events
**To see clicks happening right now:**

1. In the left sidebar, click **Reports**
2. Click **Realtime**
3. Scroll down to **Event count by Event name**
4. You should see `click` events appearing as people click your CTAs

### Step 3: View Historical Event Data
**To see all CTA clicks over time:**

1. In the left sidebar, click **Reports**
2. Click **Engagement** → **Events**
3. Look for the `click` event in the events table
4. Click on `click` to see detailed breakdown

### Step 4: Filter by CTA Events
**To see ONLY your CTA button clicks:**

1. Go to **Reports** → **Engagement** → **Events**
2. Click on the `click` event
3. Look for **event_label** dimension
4. You'll see a list of all your CTA labels like:
   - `Hero Section - Download App Store` (X clicks)
   - `Below Features - Download App Store` (X clicks)
   - `Articles Page - Download Lexa AI` (X clicks)
   - `Article CTA Button 1 - basic-spanish-phrases` (X clicks)
   - `Mobile Banner - basic-spanish-phrases` (X clicks)
   - etc.

### Step 5: Create a Custom Report (Optional)
**To create a dedicated CTA tracking dashboard:**

1. Go to **Explore** in the left sidebar
2. Click **Free form**
3. Add dimensions:
   - `Event name`
   - `Event category`
   - `Event label`
4. Add metrics:
   - `Event count`
5. Add filter: `Event category = CTA`
6. Save the exploration as "CTA Click Tracking"

---

## What You Can Learn

### Key Insights Available:
1. **Total CTA clicks** across the entire site
2. **Which page** generates the most clicks (Homepage vs Articles)
3. **Which article** converts best
4. **Which button position** performs better (Hero vs Below Features)
5. **Mobile banner effectiveness** per article
6. **Time-based trends** (which days/hours get most clicks)

### Example Questions You Can Answer:
- ❓ "How many people clicked the hero CTA vs the bottom CTA?"
- ❓ "Which article drives the most app downloads?"
- ❓ "Is the mobile banner effective?"
- ❓ "What's my overall conversion rate from visitor to click?"

---

## Testing Your Tracking

### Verify It's Working:
1. Open your website in a browser
2. Open Google Analytics → **Realtime** view
3. Click any CTA button on your site
4. Within 5-10 seconds, you should see the event appear in Realtime
5. Check that the event label matches the button you clicked

### Common Issues:
- **Events not showing?** 
  - Make sure you're looking at the correct property (G-V427V4DZ43)
  - Try clearing browser cache and hard refresh (Cmd+Shift+R)
  
- **Can't find event labels?**
  - Events may take 24-48 hours to fully process in detailed reports
  - Realtime should work immediately though

---

## Event Structure Reference

All CTA click events are structured as:

```javascript
gtag('event', 'click', {
  'event_category': 'CTA',
  'event_label': 'Specific Location - Page Name'
});
```

**Event Naming Convention:**
- Format: `[Location] - [Page/Article Name]`
- Examples:
  - `Hero Section - Download App Store`
  - `Article CTA Button 1 - basic-spanish-phrases`
  - `Mobile Banner - learn-spanish-sentences`

---

## Need Help?

If you have questions or want to track additional elements:
1. Identify what you want to track (e.g., navigation clicks, footer links)
2. Add a similar `onclick` event with appropriate labels
3. Use the same structure: `gtag('event', 'click', {'event_category': 'CategoryName', 'event_label': 'Specific Location'})`

Good luck tracking your conversions! 🎉

