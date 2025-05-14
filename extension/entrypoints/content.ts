export default defineContentScript({
  matches: ['<all_urls>'], // Match all URLs to enable capturing on any website
  main() {
    console.log('Content script initialized');

    // Listen for messages from the background script
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === 'CAPTURE_PAGE') {
        // Capture the current page
        const pageData = {
          type: 'page',
          url: window.location.href,
          title: document.title,
          content: document.body.innerText.substring(0, 5000), // Limit content size
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
          type: 'selection',
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
