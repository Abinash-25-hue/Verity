# import os
# import json
# import google.generativeai as genai

# class ApprovalCopilotAgent:
#     def __init__(self, api_key: str, history_file: str = "approval_history.json"):
#         genai.configure(api_key=api_key)
#         # Using gemini-1.5-flash for speed and reliability
#         self.model = genai.GenerativeModel("gemini-2.5-flash")
#         self.history = self._load_history(history_file)

#     def _load_history(self, filepath: str):
#         if os.path.exists(filepath):
#             with open(filepath, "r") as f:
#                 return json.load(f)
#         return []

#     def evaluate_request(self, category: str, item: str, amount: float, department: str, description: str) -> str:
#         # Format past decisions into prompt context
#         history_context = json.dumps(self.history, indent=2)

#         system_prompt = f"""
# You are an Enterprise Approval Copilot Agent. Your goal is to help managers make informed approval decisions.

# ### Historical Decision Database:
# {history_context}

# ### Current Request to Evaluate:
# - Category: {category}
# - Item/Service: {item}
# - Amount: ${amount:,.2f}
# - Department: {department}
# - Additional Context/Justification: {description}

# ### Output Requirements:
# Provide a clear, structured analysis containing:
# 1. **Recommendation**: [APPROVE / REJECT / NEEDS HUMAN REVIEW]
# 2. **Risk Assessment**: High, Medium, or Low (with 1 sentence explaining why)
# 3. **Historical Precedent**: Compare this request to similar past records in the database.
# 4. **Policy & Market Context**: General feasibility, typical industry benchmarks, or compliance factors.
# 5. **Actionable Next Steps**: What the approver should verify before final sign-off.

# Be concise, objective, and executive-ready.
# """
#         response = self.model.generate_content(system_prompt)
#         return response.text

import os
import json
from google import genai

class ApprovalCopilotAgent:
    def __init__(self, api_key: str, history_file: str = "approval_history.json"):
        # Initialize the modern Client directly with your API key
        self.client = genai.Client(api_key=api_key)
        # Standard model name: gemini-1.5-flash
        self.model_name = "gemini-1.5-flash"
        self.history = self._load_history(history_file)

    def _load_history(self, filepath: str):
        if os.path.exists(filepath):
            with open(filepath, "r") as f:
                return json.load(f)
        return []

    def evaluate_request(self, category: str, item: str, amount: float, department: str, description: str) -> str:
        # Format past decisions into prompt context
        history_context = json.dumps(self.history, indent=2)

        system_prompt = f"""
You are an Enterprise Approval Copilot Agent. Your goal is to help managers make informed approval decisions.

### Historical Decision Database:
{history_context}

### Current Request to Evaluate:
- Category: {category}
- Item/Service: {item}
- Amount: ${amount:,.2f}
- Department: {department}
- Additional Context/Justification: {description}

### Output Requirements:
Provide a clear, structured analysis containing:
1. **Recommendation**: [APPROVE / REJECT / NEEDS HUMAN REVIEW]
2. **Risk Assessment**: High, Medium, or Low (with 1 sentence explaining why)
3. **Historical Precedent**: Compare this request to similar past records in the database.
4. **Policy & Market Context**: General feasibility, typical industry benchmarks, or compliance factors.
5. **Actionable Next Steps**: What the approver should verify before final sign-off.

Be concise, objective, and executive-ready.
"""
        # Call the new generate_content API endpoint
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=system_prompt,
        )
        return str(response.text or "")