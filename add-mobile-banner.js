// Script to add mobile banner to all existing article files

const fs = require('fs-extra');
const path = require('path');

const articlesFolder = './articles';
const appStoreUrl = 'https://apps.apple.com/us/app/lexa-ai-learn-languages/id6754065379';

const mobileBannerHTML = `
    <!-- Mobile Download Banner (sticky on mobile) -->
    <div class="mobile-download-banner" id="mobileBanner">
        <button class="close-banner" onclick="closeBanner()" aria-label="Close banner">×</button>
        <div class="banner-content">
            <div class="banner-text">
                <h4>Start Learning Today</h4>
                <p>Download Lexa AI and practice speaking!</p>
            </div>
            <div class="banner-button">
                <a class="cta-button" href="${appStoreUrl}" target="_blank" rel="noopener noreferrer">Download</a>
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

async function addBannerToArticle(filePath, fileName) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    
    // Check if banner already exists
    if (content.includes('mobile-download-banner')) {
      console.log(`  ⊙ ${fileName} - banner already exists, skipping`);
      return false;
    }
    
    // Replace closing tags with banner + closing tags
    content = content.replace('</body>\n</html>', mobileBannerHTML);
    
    await fs.writeFile(filePath, content);
    console.log(`  ✓ ${fileName} - banner added`);
    return true;
  } catch (error) {
    console.error(`  ✗ ${fileName} - error:`, error.message);
    return false;
  }
}

async function addBannersToAllArticles() {
  console.log('\n🔧 Adding mobile banner to existing articles...\n');
  
  const files = await fs.readdir(articlesFolder);
  const htmlFiles = files.filter(f => f.endsWith('.html'));
  
  console.log(`📄 Found ${htmlFiles.length} article files\n`);
  
  let addedCount = 0;
  let skippedCount = 0;
  
  for (const fileName of htmlFiles) {
    const filePath = path.join(articlesFolder, fileName);
    const added = await addBannerToArticle(filePath, fileName);
    if (added) {
      addedCount++;
    } else {
      skippedCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Mobile banner update complete!');
  console.log('='.repeat(60));
  console.log(`✓ Added to: ${addedCount} articles`);
  console.log(`⊙ Skipped: ${skippedCount} articles (already had banner)`);
  console.log('\n🔄 Refresh your browser to see the mobile banner!');
  console.log('   Test on mobile view (DevTools > Toggle device toolbar)\n');
}

addBannersToAllArticles().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});

