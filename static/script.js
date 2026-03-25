
const question = document.getElementById("question").getValue();
function formatResult(text) {
    return text
        .replace("[LOI SAI]", "<h3>❌ Lỗi sai</h3>")
        .replace("[TAI SAO SAI]", "<h3>📌 Tại sao sai</h3>")
        .replace("[CACH LAM DUNG]", "<h3>✅ Cách làm đúng</h3>")
        .replace("[LOI KHUYEN]", "<h3>💡 Lời khuyên</h3>")
        .replace(/\n/g, "<br>");
}

async function analyze() {
    const question = document.getElementById("question").value;
    const user_answer = document.getElementById("user_answer").value;
    const correct_answer = document.getElementById("correct_answer").value;

    if (!question || !user_answer || !correct_answer) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    document.getElementById("result").innerHTML = "⏳ Đang phân tích...";

    const res = await fetch("/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            question,
            user_answer,
            correct_answer
        })
    });

    const data = await res.json();

    const formatted = formatResult(data.result);
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "⏳ Đang phân tích...";
    if (window.MathJax) {
    MathJax.typesetPromise([resultDiv]);
}   

function insertLatex(latex) {
    const mf = document.getElementById("question");
    mf.insert(latex);
}
document.getElementById("question").addEventListener("input", function(e) {
    let val = e.target.value;

    // Simple shortcuts
    val = val.replace(/<=/g, "\\leq ");
    val = val.replace(/>=/g, "\\geq ");
    val = val.replace(/\*/g, "\\times ");
    val = val.replace(/\/\//g, "\\frac{}{}");

    e.target.value = val;
});
document.getElementById("question").setOptions({
    virtualKeyboardMode: "onfocus"
});
const mf = document.getElementById("question");
mf.setOptions({
    virtualKeyboardMode: "onfocus",
    smartMode: true,
    defaultMode: "math" // keep math, but allow text properly
});
