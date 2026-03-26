import flask
import openai
from flask import Flask, render_template, request, jsonify
from openai import OpenAI
app = Flask(__name__)
client = Grok(api_key="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")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    question = data["question"]
    user_answer = data["user_answer"]
    correct_answer = data["correct_answer"]

    prompt = f"""
Bạn là một giáo viên nghiêm khắc nhưng dễ hiểu.
Nếu có công thức toán:
- Luôn đặt trong $$...$$
- Sử dụng LaTeX chuẩn (ví dụ: \\frac{a}{b}, x^2, \\sqrt{x})
Câu hỏi:
{question}

Câu trả lời của học sinh:
{user_answer}

Đáp án đúng:
{correct_answer}

Hãy phân tích bằng tiếng Việt theo format sau:

[LOI SAI]
Chỉ ra học sinh sai ở đâu.

[TAI SAO SAI]
Giải thích vì sao sai.

[CACH LAM DUNG]
Trình bày cách suy nghĩ đúng.

[LOI KHUYEN]
Đưa ra lời khuyên để tránh lỗi này.

Phân loại lỗi:
- Sai kiến thức / Sai tính toán / Hiểu nhầm đề
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )

    result = response.choices[0].message.content

    return jsonify({"result": result})

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)