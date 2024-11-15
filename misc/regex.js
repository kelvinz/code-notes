/*=====================
RegEx Patterns
Most useful patterns for daily coding
=====================*/

/*========== Email Validation ==========*/
// Perfect balance between validation and real-world emails
const emailRegex = /^[\w@]+@[\w@]+\.[^\s@]+$/
"user@domain.com".match( emailRegex )		// ✓
"invalid.email@Com".match( emailRegex )		// ✗

