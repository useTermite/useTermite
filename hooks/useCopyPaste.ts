// Define the interface for CopyPasteFunctions, which includes copy and paste functions.
interface CopyPasteFunctions {
  copy: (text: string) => Promise<void>; // Function to copy text to the clipboard.
  paste: () => Promise<string>; // Function to retrieve text from the clipboard.
}

// Custom hook named useCopyPaste that returns CopyPasteFunctions.
const useCopyPaste = (): CopyPasteFunctions => {
  // Function to copy text to the clipboard using the Clipboard API.
  const copyHandler = async (text: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Function to retrieve text from the clipboard using the Clipboard API.
  const pasteHandler = async (): Promise<string> => {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      console.error('Failed to paste:', error);
      return '';
    }
  };

  // Return an object containing the copy and paste functions.
  return { copy: copyHandler, paste: pasteHandler };
};

// Export the useCopyPaste hook.
export default useCopyPaste;
