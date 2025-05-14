import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';

export default defineContentScript({
  matches: ['<all_urls>'], // Match all URLs to enable capturing on any website
  main() {
    console.log('Content script initialized');
    const turndownService = new TurndownService();

    // Listen for messages from the background script
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === 'CAPTURE_PAGE') {
        // Clone the document to avoid modifying the original page
        const documentClone = document.cloneNode(true) as Document;
        const article = new Readability(documentClone).parse();

        let contentToStore = document.body.innerText.substring(0,5000); // Default to innerText
        if (article && article.content) {
          contentToStore = turndownService.turndown(article.content).substring(0, 20000); // Convert HTML to Markdown, increased limit
        } else if (article && article.textContent) {
          contentToStore = article.textContent.substring(0, 15000);
        }

        // Capture the current page using Readability and Turndown
        const pageData = {
          type: 'page' as 'page' | 'selection', // Cast to ensure type conformity
          url: window.location.href,
          title: article?.title || document.title, // Use Readability title, fallback to document.title
          content: contentToStore,
          timestamp: new Date().toISOString()
        };

        // Send the captured data back to the extension
        browser.runtime.sendMessage({
          action: 'CAPTURED_CONTENT',
          data: pageData
        });
      } 
      
      else if (message.type === 'CAPTURE_SELECTION') {
        // Get the selected text
        const selectionData = {
          type: 'selection' as 'page' | 'selection', // Cast to ensure type conformity
          url: window.location.href,
          title: document.title,
          content: message.selectionText || '',
          timestamp: new Date().toISOString()
        };

        // Send the captured data back to the extension
        browser.runtime.sendMessage({
          action: 'CAPTURED_CONTENT',
          data: selectionData
        });
      }
    });
  },
});
