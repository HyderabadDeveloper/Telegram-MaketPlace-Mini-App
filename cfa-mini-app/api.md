# API Consumption Guide (Downstream Integration & External API)

This guide provides practical instructions and code recipes for consuming the CFA Question Generation & Mock Exam platform programmatically using an **API Key**.

---

## 📌 Table of Contents
1. [Overview & Base URL](#1-overview--base-url)
2. [Authentication](#2-authentication)
3. [Supported HTTP Methods & Endpoints](#3-supported-http-methods--endpoints)
4. [Retrieving Questions (`GET /api/v1/external/questions`)](#4-retrieving-questions)
   - [Retrieve 5, 10, or 20 Questions at Once (`limit`)](#retrieve-5-10-or-20-questions-at-once)
   - [Filter Questions by CFA Module (`module_code`)](#filter-questions-by-cfa-module)
   - [Include or Hide Answers & Explanations (`include_answers`)](#include-or-hide-answers--explanations)
   - [Filter by Difficulty & Audit Status](#filter-by-difficulty--audit-status)
   - [Paginating through Question Banks (`offset`)](#paginating-through-question-banks)
5. [Generating Mock Exams (`GET /api/v1/external/mock-exam`)](#5-generating-mock-exams)
   - [JSON Format for Test Engines](#json-format)
   - [Direct Printable PDF Format](#direct-printable-pdf-format)
6. [Ready-to-Use Code Recipes](#6-ready-to-use-code-recipes)
   - [Python](#python-example)
   - [JavaScript / Node.js](#javascript--nodejs-example)
   - [cURL](#curl-examples)
7. [HTTP Status Codes & Troubleshooting](#7-http-status-codes--troubleshooting)

---

## 1. Overview & Base URL

The external API allows LMS platforms (Canvas, Moodle, Blackboard), mobile quiz apps, and custom test runners to programmatically pull verified CFA questions and complete mock exams.

* **Base URL (Local Dev):** `http://127.0.0.1:8088/api/v1/external`
* **Response Content-Type:** `application/json` (or `application/pdf` for PDF mock exams)

---

## 2. Authentication

External endpoints require the `X-API-Key` header with your issued secret token:

```http
X-API-Key: cfa_live_YOUR_SECRET_TOKEN
```

> **How to get an API Key:** Log in to the Admin Dashboard, click **External API Keys** in the sidebar, enter your application name (e.g., `Telegram Quiz Bot` or `Mobile App`), and copy the generated key.

---

## 3. Supported HTTP Methods & Endpoints

| Endpoint | HTTP Method | Auth Header | Description |
|---|:---:|---|---|
| `/api/v1/external/questions` | **GET** | `X-API-Key` | Search, filter, and paginate questions with optional answer keys. |
| `/api/v1/external/mock-exam` | **GET** | `X-API-Key` | Generate an exam session sized to official weightings (JSON or PDF). |
| `/api/v1/external/keys` | **GET** | `Authorization: Bearer <JWT>` | *(Admin only)* List all issued client keys and usage stats. |
| `/api/v1/external/keys` | **POST** | `Authorization: Bearer <JWT>` | *(Admin only)* Create and issue a new `cfa_live_...` API key. |
| `/api/v1/external/keys/{id}` | **DELETE** | `Authorization: Bearer <JWT>` | *(Admin only)* Revoke an issued key immediately. |

---

## 4. Retrieving Questions

### Endpoint: `GET /api/v1/external/questions`

All filtering and pagination options are passed as URL query parameters.

### Query Parameters Reference

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `50` | Number of questions to return per request. Range: `1` to `200`. |
| `offset` | integer | `0` | Number of records to skip for pagination. |
| `module_code` | string | `None` | Filter by CFA module code (case-insensitive). E.g., `QM`, `ECON`, `FSA`, `ETHICS`. |
| `include_answers`| boolean | `true` | If `true`, returns `correct_answer` and `explanation`. If `false`, both fields are `null`. |
| `difficulty` | string | `None` | Filter by question difficulty: `basic`, `intermediate`, `advanced`. |
| `status` | string | `accepted` | Filter by audit status: `accepted` (default), `flagged`, or `all`. |

---

### Retrieve 5, 10, or 20 Questions at Once

Control the batch size using the `limit` query parameter:

```bash
# Get exactly 5 questions
GET /api/v1/external/questions?limit=5

# Get exactly 10 questions
GET /api/v1/external/questions?limit=10

# Get exactly 20 questions
GET /api/v1/external/questions?limit=20
```

---

### Filter Questions by CFA Module

Filter questions strictly by topic using `module_code`:

| Module Code | CFA Curriculum Topic Name |
|---|---|
| `ETHICS` | Ethical and Professional Standards |
| `QM` | Quantitative Methods |
| `ECON` | Economics |
| `FSA` | Financial Statement Analysis |
| `CI` | Corporate Issuers |
| `EQ` | Equity Investments |
| `FI` | Fixed Income |
| `DER` | Derivatives |
| `ALT` | Alternative Investments |
| `PM` | Portfolio Management |

**Example:** Fetch 10 questions only from **Financial Statement Analysis**:
```http
GET /api/v1/external/questions?module_code=FSA&limit=10
```

---

### Include or Hide Answers & Explanations

Use the `include_answers` flag to adapt for exam delivery vs. answer review:

#### 1. In Practice / Review Mode (`include_answers=true` - Default)
Returns the correct option (`"A"`, `"B"`, or `"C"`) and the auditor-verified explanation:
```http
GET /api/v1/external/questions?limit=5&include_answers=true
```

#### 2. In Live Candidate Exam Mode (`include_answers=false`)
Prevents answer leaks to the client/browser during an active test:
```http
GET /api/v1/external/questions?limit=5&include_answers=false
```
*In the response, both `"correct_answer"` and `"explanation"` are set to `null`.*

---

### Filter by Difficulty & Audit Status

Combine parameters to target specific practice drills:
```http
# 10 advanced Economics questions that passed automated audit
GET /api/v1/external/questions?module_code=ECON&difficulty=advanced&status=accepted&limit=10
```

---

### Paginating through Question Banks

Use `offset` in increments of `limit` to page through entire catalogs:

* **Page 1 (Questions 1–10):** `GET /api/v1/external/questions?limit=10&offset=0`
* **Page 2 (Questions 11–20):** `GET /api/v1/external/questions?limit=10&offset=10`
* **Page 3 (Questions 21–30):** `GET /api/v1/external/questions?limit=10&offset=20`

The response includes `"total": <count>` so you know how many total items exist in the database.

---

### Sample Response (`GET /api/v1/external/questions`)

```json
{
  "total": 142,
  "limit": 5,
  "offset": 0,
  "client": "Mobile CFA Quiz App",
  "questions": [
    {
      "id": "e9b28f72-9c98-4664-9271-e8d986bbf510",
      "module_code": "FSA",
      "module_name": "Financial Statement Analysis",
      "los_code": "LOS-19.a",
      "difficulty": "intermediate",
      "cognitive_level": "application",
      "stem": "Under IFRS, which of the following cash flows is most appropriately classified as an operating activity?",
      "options": {
        "A": "Dividends received",
        "B": "Principal repayment on long-term debt",
        "C": "Issuance of common stock"
      },
      "correct_answer": "A",
      "explanation": "Under IFRS, interest and dividends received may be classified as either operating or investing cash flows. Under US GAAP, dividends received must be classified as operating.",
      "metadata": {
        "generator_provider": "gemini",
        "generator_model": "gemini-2.5-flash",
        "auditor_model": "gemini-2.5-pro",
        "audit_verdict": "APPROVED"
      }
    }
  ]
}
```

---

## 5. Generating Mock Exams

### Endpoint: `GET /api/v1/external/mock-exam`

This endpoint constructs balanced, multi-session exam papers distributed according to official CFA Level 1 topic weightings.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `total_questions`| integer | `90` | Exam size (min `10`, max `180`). Typical values: `90` (half-mock) or `180` (full mock). |
| `format` | string | `json` | Return format: `json` or `pdf`. |
| `include_answers`| boolean | `true` | Include explanations and answer keys. |

### JSON Format
```bash
curl -X GET "http://127.0.0.1:8088/api/v1/external/mock-exam?total_questions=90&format=json" \
  -H "X-API-Key: cfa_live_YOUR_TOKEN"
```

### Direct Printable PDF Format
Returns a formatted two-column printable PDF exam booklet with separate question sheets and answer explanation sections:
```bash
curl -X GET "http://127.0.0.1:8088/api/v1/external/mock-exam?total_questions=90&format=pdf" \
  -H "X-API-Key: cfa_live_YOUR_TOKEN" \
  --output CFA_Level_1_Mock_Exam.pdf
```

---

## 6. Ready-to-Use Code Recipes

### Python Example

```python
import requests

API_BASE_URL = "http://127.0.0.1:8088/api/v1/external"
API_KEY = "cfa_live_YOUR_SECRET_TOKEN"

headers = {
    "X-API-Key": API_KEY
}

def get_questions(count=10, module="FSA", difficulty=None, with_answers=True):
    """Fetch questions with flexible count and filtering."""
    params = {
        "limit": count,
        "offset": 0,
        "include_answers": str(with_answers).lower()
    }
    if module:
        params["module_code"] = module
    if difficulty:
        params["difficulty"] = difficulty

    response = requests.get(f"{API_BASE_URL}/questions", headers=headers, params=params)
    response.raise_for_status()
    data = response.json()
    
    print(f"Total available matching questions: {data['total']}")
    print(f"Retrieved: {len(data['questions'])} questions\n")
    
    for i, q in enumerate(data["questions"], 1):
        print(f"Q{i}. [{q['module_code']} - {q['difficulty'].upper()}] {q['stem']}")
        for opt_key, opt_text in q["options"].items():
            print(f"   {opt_key}) {opt_text}")
        if with_answers:
            print(f"   --> Correct Answer: {q['correct_answer']}")
            print(f"   --> Explanation: {q['explanation']}\n")

if __name__ == "__main__":
    # Example 1: Fetch 5 Ethics questions WITH answers
    get_questions(count=5, module="ETHICS", with_answers=True)

    # Example 2: Fetch 20 Quantitative Methods questions WITHOUT answers (Candidate mode)
    # get_questions(count=20, module="QM", with_answers=False)
```

---

### JavaScript / Node.js Example

```javascript
const API_BASE_URL = 'http://127.0.0.1:8088/api/v1/external';
const API_KEY = 'cfa_live_YOUR_SECRET_TOKEN';

async function fetchQuestions({ count = 10, module = null, includeAnswers = true }) {
  const url = new URL(`${API_BASE_URL}/questions`);
  url.searchParams.set('limit', count);
  url.searchParams.set('include_answers', includeAnswers);
  if (module) url.searchParams.set('module_code', module);

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-Key': API_KEY,
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`API Error [${res.status}]: ${errorData.detail}`);
  }

  const data = await res.json();
  return data;
}

// Example usage:
fetchQuestions({ count: 10, module: 'FSA', includeAnswers: true })
  .then(data => {
    console.log(`Fetched ${data.questions.length} questions out of ${data.total} total.`);
    data.questions.forEach((q, idx) => {
      console.log(`\nQ${idx + 1}: ${q.stem}`);
      console.log(`A) ${q.options.A}\nB) ${q.options.B}\nC) ${q.options.C}`);
      console.log(`Correct Answer: ${q.correct_answer}`);
    });
  })
  .catch(err => console.error(err));
```

---

### cURL Examples

#### 1. Retrieve 5 Questions with Answers
```bash
curl -X GET "http://127.0.0.1:8088/api/v1/external/questions?limit=5&include_answers=true" \
  -H "X-API-Key: cfa_live_YOUR_TOKEN"
```

#### 2. Retrieve 10 Questions Filtered by Equity (`EQ`)
```bash
curl -X GET "http://127.0.0.1:8088/api/v1/external/questions?module_code=EQ&limit=10" \
  -H "X-API-Key: cfa_live_YOUR_TOKEN"
```

#### 3. Retrieve 20 Questions without Answers (Student Exam Mode)
```bash
curl -X GET "http://127.0.0.1:8088/api/v1/external/questions?limit=20&include_answers=false" \
  -H "X-API-Key: cfa_live_YOUR_TOKEN"
```

#### 4. Retrieve Second Page (Next 20 questions)
```bash
curl -X GET "http://127.0.0.1:8088/api/v1/external/questions?limit=20&offset=20" \
  -H "X-API-Key: cfa_live_YOUR_TOKEN"
```

---

## 7. HTTP Status Codes & Troubleshooting

| Status Code | Meaning | Cause & Resolution |
|---|---|---|
| `200 OK` | Success | Request succeeded and data is returned. |
| `401 Unauthorized` | Invalid/Missing Key | Missing `X-API-Key` header or the key has been revoked. Ensure you include `X-API-Key: cfa_live_...`. |
| `422 Unprocessable Entity` | Parameter Error | `limit` is outside range (`1` to `200`) or invalid parameter type. |
| `404 Not Found` | No Questions / Not Found | No questions match the specified module or criteria. |
| `500 Internal Server Error`| Server Error | Check that backend database is running and reachable. |
