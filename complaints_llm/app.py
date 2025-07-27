import os
from flask import Flask, request, jsonify, render_template # <-- Import render_template
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environment variables 
load_dotenv()

# Initialize Flask App and enable CORS
app = Flask(__name__)
CORS(app) 

# --- LangChain and Pydantic Setup (No changes needed here) ---
class EmailDraft(BaseModel):
    """A structured representation of a professional email draft."""
    subject: str = Field(description="A clear and concise subject line for the email.")
    body: str = Field(description="The full body content of the professionally drafted email.")

try:
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
    ).with_structured_output(EmailDraft)
except Exception as e:
    print(f"Error initializing Google AI model: {e}")
    llm = None


# --- NEW ROUTE to serve the Test UI ---
@app.route('/')
def index():
    """Renders the testing UI homepage."""
    return render_template('index.html')


# --- API Endpoint (No changes needed here) ---
@app.route('/generate-email', methods=['POST'])
def generate_email_endpoint():
    """
    Receives complaint details and uses an LLM to generate a professional
    email draft for customer care.
    """
    if not llm:
        return jsonify({"error": "LLM service is not configured correctly."}), 500

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request. No JSON body provided."}), 400

    complaint_type = data.get('complaintType')
    details = data.get('details')
    order_id = data.get('orderId')
    product_name = data.get('productName')
    supplier_name = data.get('supplierName')

    if not all([complaint_type, details, order_id, product_name, supplier_name]):
        return jsonify({"error": "Missing required fields in request."}), 400

    prompt_text = f"""
        You are a highly professional and empathetic Customer Support Email Drafter.
        A customer has filed a complaint about an order. Your task is to draft a concise, internal-facing email to the customer care team.

        **Complaint Context:**
        - **Order ID:** {order_id}
        - **Supplier:** {supplier_name}
        - **Product:** {product_name}
        - **Complaint Reason:** {complaint_type}
        - **Customer's Description:** "{details}"

        **Instructions:**
        1.  Create a clear and concise subject line that includes the Order ID and complaint type.
        2.  Write the email body. Start by acknowledging the complaint.
        3.  Summarize the issue clearly for the customer care team.
        4.  Maintain a professional and urgent tone.
        5.  Suggest the next step is for the team to investigate and contact the customer.
    """
    message = HumanMessage(content=prompt_text)

    try:
        result = llm.invoke([message])
        response_data = result.model_dump()
        return jsonify(response_data)
    except Exception as e:
        print(f"LLM Invocation Error: {e}")
        return jsonify({"error": f"An error occurred during AI processing: {e}"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)