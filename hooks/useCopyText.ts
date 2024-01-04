// Define the interface for CopyPasteFunctions, which includes copy and paste functions.
interface CopyPasteFunctions {
  copy: (text: string) => void // Function to copy text to the clipboard.
  paste: () => Promise<string | null> // Function to retrieve text from the clipboard.
}

// Custom hook named useCopyPaste that returns CopyPasteFunctions.
const useCopyPaste = (): CopyPasteFunctions => {
  // Function to copy text to the clipboard.
  const copyToClipboard = (text: string): void => {
    // Create a temporary textarea element.
    const textarea = document.createElement('textarea')
    textarea.value = text // Set the value of the textarea to the provided text.
    document.body.appendChild(textarea) // Append the textarea to the document body.
    textarea.select() // Select the text within the textarea.
    document.execCommand('copy') // Execute the copy command to copy the selected text.
    document.body.removeChild(textarea) // Remove the temporary textarea from the document body.
  }

  // Function to retrieve text from the clipboard.
  const pasteFromClipboard = async (): Promise<string | null> => {
    try {
      // Use the navigator.clipboard.readText method to read text from the clipboard.
      const text = await navigator.clipboard.readText()
      return text
    } catch (error) {
      // Handle errors that may occur while reading from the clipboard.
      console.error('Error reading from clipboard:', error)
      return null
    }
  }

  // Return an object containing the copy and paste functions.
  return { copy: copyToClipboard, paste: pasteFromClipboard }
}

// Export the useCopyPaste hook.
export default useCopyPaste
