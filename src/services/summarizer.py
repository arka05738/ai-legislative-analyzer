import google.generativeai as genai

# 🔥 PUT YOUR REAL API KEY HERE
genai.configure(api_key="AIzaSyCIEB4WCwxVIIy7k8DFvivEnU839BO--gk")

model = genai.GenerativeModel("gemini-pro")

def summarize_text(text):
    try:
        if not text:
            return "No content"

        response = model.generate_content(
            f"Summarize this text in simple and short way:\n{text}"
        )

        return response.text

    except Exception as e:
        print("Error:", e)
        return "Summary failed"