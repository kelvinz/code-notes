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

