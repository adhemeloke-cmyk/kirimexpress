import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { WAREHOUSE_ADDRESS, INITIAL_RATES, INITIAL_PACKAGES } from "./src/data/initialData.js";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "NKExpress" });
  });

  // Rates endpoint
  app.get("/api/rates", (req, res) => {
    res.json(INITIAL_RATES);
  });

  // Warehouse address endpoint
  app.get("/api/warehouse", (req, res) => {
    res.json(WAREHOUSE_ADDRESS);
  });

  // AI Assistant endpoint using Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Pesan tidak boleh kosong" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: "Terima kasih telah menghubungi NKExpress! Kami melayani pengiriman jastip dan ekspedisi rute Ternate, Sofifi, dan Tidore. Silakan hubungi CS WhatsApp kami di 08215046568 untuk bantuan langsung."
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Anda adalah Customer Service AI resmi dari "NKExpress", jasa jastip dan ekspedisi pengiriman rute Ternate, Sofifi, dan Tidore.

Informasi Layanan & Tarif Resmi NKExpress (Rute Sofifi, Ternate, Tidore):
- Nama Ekspedisi: NKExpress (Nusa Kirim Express)
- Alamat Gudang Utama: Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel, RT 013 / RW 004, Ternate Selatan, Kota Ternate, Maluku Utara
- Kontak WA CS: 08215046568.

Daftar Tarif Ongkir Resmi (Sofifi, Ternate, Tidore):
- ≤ 1 kg: Rp 20.000
- 2 kg: Rp 23.000
- 3 kg: Rp 26.000
- 4 kg: Rp 29.000
- 5 kg: Rp 30.000
- 6 kg: Rp 35.000
- 7 kg: Rp 40.000
- 8 kg: Rp 45.000
- 9 kg: Rp 48.000
- 10 kg: Rp 50.000
- 11 kg: Rp 57.000
- 12 kg: Rp 64.000
- 13 kg: Rp 71.000
- 14 kg: Rp 78.000
- 15 kg: Rp 85.000
- 16 kg: Rp 92.000
- 17 kg: Rp 99.000
- 18 - 25 kg: Rp 100.000
- > 25 kg: Rp 100.000 + Rp 10.000 / kg ekstra
- Per Karung: Rp 100.000 / karung
- Barang Berukuran Besar: Biaya terpisah (konsultasi CS)

Pertanyaan Pelanggan: "${message}"

Berikan jawaban yang ramah, jelas, singkat, profesional dalam Bahasa Indonesia.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const replyText = response.text || "Terima kasih! Ada yang bisa kami bantu mengenai pengiriman Anda?";
      res.json({ reply: replyText });
    } catch (err) {
      console.error("Gemini API Error:", err);
      res.json({
        reply: "Maaf, terjadi kendala teknis. Anda juga bisa langsung chat WhatsApp CS kami di 08215046568 untuk konsultasi ongkir dan pengiriman."
      });
    }
  });

  // AI Translator endpoint for China - Indonesia using Gemini
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, direction } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Teks terjemahan tidak boleh kosong" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key tidak dikonfigurasi di server" });
      }

      const ai = new GoogleGenAI({ apiKey });

      let prompt = "";
      if (direction === "zh-id") {
        prompt = `Anda adalah penerjemah profesional Bahasa Mandarin (China/Chinese) ke Bahasa Indonesia, khususnya spesialis dalam e-commerce (Taobao, 1688, Shopee China), nama barang, istilah pengiriman, dan instruksi logistik.
Terjemahkan teks berikut dari Bahasa Mandarin ke Bahasa Indonesia yang akurat, alami, dan mudah dipahami.
Sediakan juga bacaan Pinyin jika ada karakter Mandarin.

Format respon JSON:
{
  "translatedText": "hasil terjemahan dalam Bahasa Indonesia",
  "pinyin": "pinyin untuk teks mandarin asal (jika ada, jika tidak kosongkan string)",
  "explanation": "catatan singkat/istilah barang jika berguna, atau kosongkan"
}

Teks Mandarin yang akan diterjemahkan:
"${text}"`;
      } else {
        prompt = `Anda adalah penerjemah profesional Bahasa Indonesia ke Bahasa Mandarin (China/Chinese), khususnya spesialis dalam komunikasi supplier, percakapan e-commerce, nama barang, dan instruksi pengiriman/packing.
Terjemahkan teks berikut dari Bahasa Indonesia ke Bahasa Mandarin (Karakter Hanzi Simplifikasi).
Sediakan juga Pinyin dan arti literal singkat agar mudah dipakai kirim pesan ke supplier/seller China.

Format respon JSON:
{
  "translatedText": "hasil terjemahan dalam Karakter Mandarin (Hanzi)",
  "pinyin": "pinyin bacaan mandarin",
  "explanation": "penjelasan singkat atau kalimat alternatif untuk chat supplier jika ada"
}

Teks Indonesia yang akan diterjemahkan:
"${text}"`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      let parsed = { translatedText: "", pinyin: "", explanation: "" };
      try {
        parsed = JSON.parse(responseText);
      } catch (e) {
        parsed = { translatedText: responseText, pinyin: "", explanation: "" };
      }

      res.json(parsed);
    } catch (err) {
      console.error("Translation API Error:", err);
      res.status(500).json({
        error: "Gagal menerjemahkan. Silakan coba beberapa saat lagi."
      });
    }
  });

  // Vite middleware for dev or static server for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server NKExpress running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
