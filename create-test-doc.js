// Quick script to create a test Word document (in plain text format)
// This helps you test the system before adding your real Word docs

const fs = require('fs');
const path = require('path');

// Sample article content
const testArticle = `Best Language Learning App 2025 - Complete Guide

Learning a new language has never been easier thanks to modern technology and artificial intelligence. In this comprehensive guide, we'll explore the best language learning apps available in 2025 and what makes them effective.

Why Choose an AI-Powered Language Learning App

Traditional language learning methods often fall short because they don't provide enough speaking practice. Research shows that learners who practice speaking regularly progress three times faster than those who only focus on reading and writing exercises.

AI-powered language learning apps solve this problem by providing unlimited conversation practice with an intelligent tutor that's available 24/7. You can practice speaking without fear of judgment, get instant feedback on your pronunciation, and learn at your own pace.

Key Features to Look For

When choosing a language learning app, consider these essential features:

Conversation Practice: The app should allow you to practice speaking from day one. Speaking is the fastest way to become fluent.

Instant Feedback: Real-time corrections help you fix mistakes immediately, leading to faster improvement.

Personalized Learning: The app should adapt to your level and learning style, focusing on areas where you need the most help.

Spaced Repetition: Scientific research proves that spaced repetition improves long-term memory retention by up to 85%.

Progress Tracking: Being able to see your improvement keeps you motivated and helps identify areas that need more attention.

Why Lexa AI Stands Out

Lexa AI combines all these features into one powerful app. With Lexa AI, you can have natural conversations with an AI tutor that feels surprisingly human. The app listens to your speech, provides instant feedback, and creates personalized flashcards from your conversations.

Unlike other apps that focus primarily on reading and writing, Lexa AI emphasizes speaking from the very first lesson. This approach mirrors how children learn their first language - through conversation and immersion.

The Science Behind Conversation-Based Learning

Speaking activates multiple areas of your brain simultaneously. This multi-sensory engagement leads to better long-term memory retention compared to passive learning methods like reading or watching videos.

Studies show that learners who practice speaking daily achieve conversational fluency 2-3 times faster than those using traditional methods. The key is consistent practice, and that's where AI tutors excel - they're always available whenever you want to practice.

Getting Started with Language Learning

The best time to start learning a language is now. Don't wait until you've memorized thousands of words or mastered all the grammar rules. Start speaking from day one, even if you only know a few basic phrases.

With apps like Lexa AI, you can start having simple conversations immediately. The AI tutor adjusts to your level, helping you progress naturally from basic greetings to complex discussions about topics that interest you.

Conclusion

The best language learning app for you is one that emphasizes speaking practice, provides instant feedback, and keeps you engaged with personalized content. Lexa AI checks all these boxes and more, making it the ideal choice for serious language learners in 2025.

Start your language learning journey today and experience the difference that AI-powered conversation practice can make. Download Lexa AI and begin speaking your target language within minutes.`;

// Save as .txt file (can be converted to .docx manually or used for testing)
const testFilePath = path.join(__dirname, 'word-documents', 'test-article.txt');

fs.writeFileSync(testFilePath, testArticle);

console.log('\n✓ Test article created!');
console.log(`📄 Location: ${testFilePath}`);
console.log('\n📝 To test the system:');
console.log('   1. Convert this .txt file to .docx format (save as .docx in Word/Google Docs)');
console.log('   2. Or add your own .docx files to word-documents/');
console.log('   3. Run: npm run generate');
console.log('\n');

