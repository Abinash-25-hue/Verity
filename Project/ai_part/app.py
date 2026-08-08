import streamlit as st
import os
import json
import pandas as pd
from agent import ApprovalCopilotAgent

st.set_page_config(page_title="AI Approval Copilot", page_icon="📋", layout="wide")

st.title("📋 AI Approval Copilot")
st.markdown("Automated risk assessment and decision intelligence powered by Gemini.")

# Sidebar for API Key & Configuration
with st.sidebar:
    st.header("⚙️ Configuration")
    api_key = st.text_input("Gemini API Key", type="password", value=os.getenv("GEMINI_API_KEY", ""))
    st.markdown("---")
    st.subheader("📚 Historical Data Overview")
    if os.path.exists("approval_history.json"):
        with open("approval_history.json") as f:
            data = json.load(f)
            st.dataframe(pd.DataFrame(data), height=250)

# Main UI layout
col1, col2 = st.columns([1, 1])

with col1:
    st.subheader("📝 Submit Request for Analysis")
    with st.form("approval_form"):
        category = st.selectbox("Category", ["Software License", "Hardware", "Travel", "Vendor / External Service", "Marketing / Ads", "Other"])
        item = st.text_input("Item / Title", placeholder="e.g., AWS Cloud Credit Top-up")
        amount = st.number_input("Requested Amount ($USD)", min_value=0.0, value=1500.0, step=100.0)
        department = st.selectbox("Department", ["Engineering", "Design", "Marketing", "Sales", "HR", "Operations"])
        description = st.text_area("Justification / Description", placeholder="Explain why this expense is required...")
        
        submitted = st.form_submit_button("🤖 Analyze with Copilot", use_container_width=True)

with col2:
    st.subheader("📊 AI Copilot Decision Intelligence")
    if submitted:
        if not api_key:
            st.error("Please enter your Gemini API Key in the sidebar.")
        elif not item:
            st.warning("Please specify the item title.")
        else:
            with st.spinner("Analyzing request against historical precedents and policy standards..."):
                try:
                    agent = ApprovalCopilotAgent(api_key=api_key)
                    result = agent.evaluate_request(category, item, amount, department, description)
                    st.success("Analysis Complete!")
                    st.markdown(result)
                except Exception as e:
                    st.error(f"Error evaluating request: {str(e)}")
    else:
        st.info("Fill out the form on the left and click **Analyze with Copilot** to get a recommendation.")