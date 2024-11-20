/*=====================
RegEx Patterns
Most useful patterns for daily coding
=====================*/

/*========== Email Validation ==========*/
// Perfect balance between validation and real-world emails
const emailRegex = /^[\w@]+@[\w@]+\.[^\s@]+$/
"user@domain.com".match( emailRegex )		// ✓
"invalid.email@Com".match( emailRegex )		// ✗

/*========== Password Strength ==========*/
// At least 8 chars, 1 uppercase, 1 lowercase, 1 number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
"TestPass123".match( passwordRegex )	// ✓
"weakpass".match( passwordRegex )		// ✗

/*========== Phone Numbers ==========*/
// Matches: (123) 456-7890, 123-456-7890, 1234567890
const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
"(123) 456-7890".match( phoneRegex )	// ✓
"123.456.7890".match( phoneRegex )		// ✓

/*========== URL Validation ==========*/
// Matches URLs with or without protocol
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
"https://example.com/path".match( urlRegex )	// ✓
"invalid.com/path?".match( urlRegex )			// ✗

/*========== Date Formats ==========*/
// Matches: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY
const dateRegex = /^(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/
"2024-01-31".match( dateRegex ) // ✓
"31/01/2024".match( dateRegex ) // ✓

/*========== Credit Card Numbers ==========*/
// Matches major card formats (strips spaces/dashes)
const ccRegex = /^(\d{4}[-\s]?){3}\d{4}$/
"4111-1111-1111-1111".match( ccRegex ) // ✓
"4111 1111 1111 1111".match( ccRegex ) // ✓

