# Warp Clicker 🚀

**Warp Clicker**, oyuncuların boyutlar arası devasa enerji üretimi yaptığı ve sınırları aştığı evrensel bir idle-clicker (tıklama) oyunudur! Mobil odaklı olarak tasarlanmış, akıcı animasyonlar ve derinlemesine geliştirme sistemleri barındıran bu oyun; Base Mainnet ile web3 entegrasyonu da sağlayarak oyun içi başarına blokzincir üzerinden gerçek bir değer kazandırıyor.

## 🌟 Özellikler

- **Mükemmel Idle Clicker Deneyimi:** Ekrana dokunarak "Warp Energy" üretin, kombo çarpanlarını tutturarak enerji patlamaları yaşayın.
- **Sürekli Gelişim:** Kazandığınız enerjiyi Quantum Relay, Dimensional Gate, Dyson Lattice ve Singularity Pump gibi ileri teknoloji altyapılarına harcayarak kapasitenizi katlayın.
- **Çevrimdışı Gelir (Offline Earnings):** Oyunda değilken bile sistemleriniz enerji üretmeye devam eder. Geri döndüğünüzde hasılatınızı toplayın.
- **Prestige & Boyut Atlatımı (Dimensional Collapse):** Ulaştığınız sonsuzluk noktasında evreni sıfırlayarak kalıcı prestij çarpanları kazanın ve yeni boyutların kilidini açın. Özel "Artifact"lar keşfedin.
- **Base Mainnet & Web3:** Cüzdanınızı bağlayarak skorlarınızı zincir üzerinde (on-chain) kayıt altına alın. Trustless AI Agent destekli akıllı "Orchestrator" kontrat bağlantıları.
- **ERC-8004 & ERC-8021:** Otomatik AI agent iletişimi (A2A), MCP (Model Context Protocol) adaptasyonlu API'ler. 

## 🛠️ Teknolojiler

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS (v4), Framer Motion
- **Backend:** Express API, Server-Side MCP endpoints, Vercel Serverless Ready
- **Web3:** Wagmi, Viem (Base Mainnet)
- **State Management:** Zustand (Persisted)

## 📡 Bot/Agent Entegrasyonu (MCP)

Bu depo, oyun üzerinde dış müdahalelere ve karmaşık operasyonlara olanak tanıyan bir "Warp Clicker Orchestrator" barındırır.
`/.well-known/agent-card.json` ve `/api/mcp` endpointleri sayesinde ERC-8004 standartlarında başka bir akıllı ajanın bu platforma bağlanıp görev alması sağlanmıştır.

## 🚀 Geliştirme (Local)

**Kurulum:**

```bash
npm install
```

**Çalıştırma:**

```bash
npm run dev
```

(Geliştirme sunucusu `http://localhost:3000` portunda çalışacaktır.)

## 📝 Notlar

Güvenliğe ve şeffaflığa çok önem veriyoruz. Repoda yer alan environment file örnekleri gizli private key verisi içermez. Test aşamalarında da kendi "dummy" (test) donelerinizi kullanmanız önerilir. Cüzdanlarınızı her zaman güvenilir ortamlarda imzalayın.
