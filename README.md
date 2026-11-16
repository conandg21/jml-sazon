# JML Sazón — Comida Ecuatoriana

Static website (6 pages) for JML Sazón: ceviches and encebollados.

| Page | File |
|------|------|
| Inicio (Home) | `index.html` |
| Menú | `menu.html` |
| Nosotros (About) | `nosotros.html` |
| Sobre Mariela (the chef) | `mariela.html` |
| Pedidos (How to order + order form) | `pedidos.html` |
| Contacto | `contacto.html` |

## Change the phone number / email

Open **`js/site.js`** and edit the `SITE` block at the top. It updates every page:

```js
const SITE = {
  phoneDisplay: "+1 (212) 321-0666",
  phone: "+12123210666",
  whatsapp: "12123210666",
  email: "Mariela8879@gmail.com",   // ← her email
  instagram: "jmlsazon88",
  area: "108th Street, Manhattan",
  zellePhone: "+1 (212) 321-0666",
  zelleName: "Mariela",
};
```

### Zelle payments
Zelle has no "pay" button for websites, so `pedidos.html#zelle` shows her Zelle number and name, a **Copy number** button, and a button to send the payment screenshot on WhatsApp.
Optional: save her Zelle QR code from her bank app as `images/zelle-qr.png` and it appears on that card automatically.

Other things to personalize (look for `✏️` comments):
- Prices → `menu.html`
- Hours → `pedidos.html`
- Her story → `nosotros.html`, her bio → `mariela.html`

The forms don't need a server: they open WhatsApp or the visitor's email app with the message already written.

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `jml-sazon`).
2. Upload everything in this folder (keep the `css`, `js`, `images` folders).
3. In the repo go to **Settings → Pages**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/jml-sazon/`.
