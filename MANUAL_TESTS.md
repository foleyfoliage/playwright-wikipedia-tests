# MANUAL TESTS

## Project
Wikipedia Search – Automation Support Task

## Document Type
Manual Functional Test Scenarios

## Status
In Progress

---

## Test Case 1

### Title
Search for "Quality Assurance" and validate page contains "software testing"

### Summary
Ensure that performing a search on Wikipedia for **"Quality Assurance"** opens a result page where the first result links to a page containing the text **"software testing"**.

### Preconditions
- User has access to a modern desktop browser (Chrome, Firefox, Edge)
- Wikipedia is reachable at https://en.wikipedia.org
- User has working internet access

### Users
Public (no authentication required)

### Test Environment
Production: https://en.wikipedia.org

### Steps to Reproduce
1. Open a web browser and navigate to **Wikipedia**.
2. Locate the search bar on the main page.
3. Enter the term **"Quality Assurance"**.
4. Press **Enter** to initiate the search.
5. Click the **first result** displayed in the search results.
6. Scroll through the page content.

### Expected Result
- The opened article contains the text:  
  **"software testing"**

### Actual Result
⬜ _To be completed during execution_

### Screenshots
_(Optional – attach upon failure)_

### Notes
This validates navigation, search, and content consistency for Wikipedia.

---

## Test Case 2

### Title
Verify a Wikipedia API request occurs during search

### Summary
Check that submitting a search query results in a network request to Wikipedia's API backend.

### Preconditions
- Browser DevTools enabled
- Network tab visible

### Users
Public

### Test Environment
Production: https://en.wikipedia.org

### Steps to Reproduce
1. Navigate to **Wikipedia**.
2. Open **Developer Tools → Network**.
3. Enter **"Quality Assurance"** into the search bar.
4. Press **Enter** to trigger the search.
5. Observe network logs.

### Expected Result
- At least one network request URL contains:  
  **`/w/api.php`**

### Actual Result
⬜ _To be completed during execution_

### Screenshots
_(Recommended – capture Network panel if request missing)_

### Notes
Confirms that Wikipedia uses API-driven search.

---

## Test Case 3 – Negative Test

### Title
Search for a nonsense term and verify no results are returned

### Summary
Validate how Wikipedia handles invalid search text and ensures proper user messaging.

### Preconditions
Same as previous test cases

### Users
Public

### Test Environment
Production: https://en.wikipedia.org

### Steps to Reproduce
1. Navigate to **Wikipedia**.
2. Enter **"qwertyuiopasdf"** into the search input field.
3. Press **Enter**.

### Expected Result
- Wikipedia shows a **no results** message containing the text:  
  **"did not match any articles"**

### Actual Result
⬜ _To be completed during execution_

### Screenshots
_(Optional)_

### Notes
Verifies error-handling for invalid or meaningless input.

---

## Version History

| Version | Date       | Author | Notes                                      |
|--------:|------------|--------|--------------------------------------------|
| 1.0     | 27/11/2025 | You    | Initial creation of manual test scenarios |

---

