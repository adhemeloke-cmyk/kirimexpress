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
    res.json({ status: "ok", app: "NK EXPRESS" });
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
          reply: "Terima kasih telah menghubungi NK EXPRESS! Kami melayani pengiriman jastip dan ekspedisi rute Ternate, Sofifi, dan Tidore. Silakan hubungi CS WhatsApp kami di 08215046568 untuk bantuan langsung."
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Anda adalah Customer Service AI resmi dari "NK EXPRESS", jasa jastip dan ekspedisi pengiriman rute Ternate, Sofifi, dan Tidore.

Informasi Layanan & Tarif Resmi NK EXPRESS (Rute Sofifi, Ternate, Tidore):
- Nama Ekspedisi: NK EXPRESS (Nusa Kirim Express)
- Alamat Gudang Utama: Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel, RT 013 / RW 004, Ternate Selatan, Kota Ternate, Maluku Utara
- Kontak WA CS: 08215046568.

Daftar Tarif Ongkir Resmi (Rute Ternate → Sofifi):
- ≤ 1 kg: Rp 28.000
- 2 kg: Rp 53.000
- 3 kg: Rp 71.000
- 4 kg: Rp 89.000
- 5 kg: Rp 105.000
- 6 kg: Rp 125.000
- 7 kg: Rp 145.000
- 8 kg: Rp 165.000
- 9 kg: Rp 183.000
- 10 kg: Rp 200.000
- 11 kg: Rp 222.000
- 12 kg: Rp 244.000
- 13 kg: Rp 266.000
- 14 kg: Rp 288.000
- 15 kg: Rp 310.000
- 16 kg: Rp 332.000
- 17 kg: Rp 354.000
- 18 kg: Rp 370.000
- 19 kg: Rp 385.000
- 20 kg: Rp 400.000
- 21 kg: Rp 415.000
- 22 kg: Rp 430.000
- 23 kg: Rp 445.000
- 24 kg: Rp 460.000
- 25 kg: Rp 475.000
- > 25 kg: Hubungi / Tanya CS WhatsApp
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
    console.log(`Server NK EXPRESS running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
