export default async function handler(req, res) {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Mensagem não enviada" });
  }

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCGoBDkcTWYTV2jTN7NHYupCQQ0ZMWns6w",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      })
    }
  );

  const data = await response.json();

  const reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Erro ao gerar resposta";

  res.status(200).json({ reply });
}
