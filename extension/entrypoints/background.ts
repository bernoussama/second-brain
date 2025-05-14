// Define types for captured content
interface CapturedContent {
  type: 'page' | 'selection';
  url: string;
  title: string;
  content: string;
  timestamp: string;
}

export default defineBackground(() => {
  console.log('Background script initialized', { id: browser.runtime.id });

  // Store the most recently captured content
  let capturedContent: CapturedContent | null = null;

  // Create context menu items
  browser.contextMenus.create({
    id: 'capture-page',
    title: 'Capture this page',
    contexts: ['page']
  });

  browser.contextMenus.create({
    id: 'capture-selection',
    title: 'Capture selected text',
    contexts: ['selection']
  });

  // Listen for context menu clicks
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (!tab?.id) return;

    if (info.menuItemId === 'capture-page') {
      console.log('Capture page clicked', { url: tab.url });
      browser.tabs.sendMessage(tab.id, { 
        type: 'CAPTURE_PAGE',
        url: tab.url
      });
    } 
    
    else if (info.menuItemId === 'capture-selection' && info.selectionText) {
      console.log('Capture selection clicked', { 
        url: tab.url, 
        selection: info.selectionText 
      });
      browser.tabs.sendMessage(tab.id, {
        type: 'CAPTURE_SELECTION',
        url: tab.url,
        selectionText: info.selectionText
      });
    }
  });

  // Listen for messages from content script
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'CAPTURED_CONTENT') {
      console.log('Content captured:', message.data);
      
      // Store the captured content
      capturedContent = message.data;
      
      // Open the popup to let the user categorize the content
      browser.action.openPopup();
    }
  });

  // Expose the captured content to the popup
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'GET_CAPTURED_CONTENT') {
      sendResponse(capturedContent);
      
      // Clear the content after it's been retrieved by the popup
      if (message.clearAfterRetrieving) {
        capturedContent = null;
      }
    }
  });
});
