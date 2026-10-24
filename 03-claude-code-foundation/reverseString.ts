// Author: Vipin Singh
// Date: 2026-10-24
// File Description: Utility function that returns the reverse of a given string.

/**
 * Reverses the given string.
 * Uses the string iterator (via spread) so characters made of surrogate
 * pairs, such as emoji, are not split apart.
 *
 * @param input - The string to reverse.
 * @returns The reversed string.
 */
export function reverseString(input: string): string {
  return [...input].reverse().join("");
}

// Example usage:
// reverseString("hello"); // "olleh"
// reverseString("abc😀"); // "😀cba"
