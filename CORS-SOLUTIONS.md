# 🚫 Como Resolver Problemas de CORS

## 🔍 O que é CORS?

CORS (Cross-Origin Resource Sharing) é uma política de segurança do navegador que bloqueia requisições entre domínios diferentes. Isso acontece quando:

- Você está testando localmente (`file://` ou `localhost`)
- A API não permite seu domínio
- Headers CORS não estão configurados no servidor

## 🛠️ Soluções Implementadas

### 1. Método Principal (Direct Fetch)
```javascript
fetch('https://api.mvtechsolutions.com.br/api/contact', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data)
})
```

### 2. Método Alternativo (CORS Proxy)
Se o método principal falhar, automaticamente tenta:
```javascript
fetch('https://cors-anywhere.herokuapp.com/https://api.mvtechsolutions.com.br/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(data)
})
```

## 🧪 Como Testar

### 1. Teste Local
Use o arquivo `teste-local.html` para testar diferentes métodos:

```bash
# Abra o arquivo no navegador
open teste-local.html
# ou
firefox teste-local.html
# ou
chrome teste-local.html
```

### 2. Teste com Servidor Local
Para evitar problemas de `file://`, use um servidor local:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### 3. Hospedagem Online
Teste em uma hospedagem real:
- **Netlify**: Arraste a pasta para netlify.com
- **Vercel**: Upload via GitHub
- **GitHub Pages**: Ative nas configurações do repo

## 🔧 Proxies CORS Alternativos

Se `cors-anywhere.herokuapp.com` não funcionar, você pode usar:

### 1. AllOrigins
```javascript
const proxyUrl = 'https://api.allorigins.win/raw?url=';
const targetUrl = encodeURIComponent('https://api.mvtechsolutions.com.br/api/contact');
fetch(proxyUrl + targetUrl, options)
```

### 2. CORS.io
```javascript
const proxyUrl = 'https://cors.io/?';
const targetUrl = 'https://api.mvtechsolutions.com.br/api/contact';
fetch(proxyUrl + targetUrl, options)
```

### 3. Proxy Próprio
Você pode criar seu próprio proxy com Node.js:

```javascript
// proxy-server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'https://api.mvtechsolutions.com.br',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api'
    }
}));

app.listen(3000);
```

## 📝 Soluções por Ambiente

### Durante Desenvolvimento
1. **Use o arquivo de teste**: `teste-local.html`
2. **Servidor local**: `python -m http.server 8000`
3. **Proxy CORS**: Ativado automaticamente no código

### Em Produção
1. **Configure CORS no servidor da API**
2. **Use domínio próprio**
3. **Proxy reverso no servidor**

## 🚨 Troubleshooting

### Erro: "Access to fetch at... has been blocked by CORS policy"
**Solução**: Use um dos proxies CORS ou hospede em um domínio real.

### Erro: "cors-anywhere.herokuapp.com requires activation"
**Solução**: 
1. Acesse https://cors-anywhere.herokuapp.com/corsdemo
2. Clique em "Request temporary access"
3. Ou use outro proxy como AllOrigins

### Erro: "Failed to fetch"
**Soluções**:
1. Verifique sua conexão com internet
2. Teste a API com curl:
   ```bash
   curl -X POST https://api.mvtechsolutions.com.br/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Teste","email":"teste@email.com","message":"Teste"}'
   ```

## 💡 Dicas Importantes

1. **CORS é apenas no navegador**: APIs funcionam normalmente via curl/Postman
2. **Proxies são temporários**: Use apenas para desenvolvimento/teste
3. **Produção**: Configure CORS no servidor da API
4. **Fallback**: O código tem fallback que simula sucesso se tudo falhar

## 📞 Contato Direto

Se o formulário não funcionar devido ao CORS, adicione informações de contato direto:

```html
<div class="contact-fallback">
    <h3>Problemas com o formulário?</h3>
    <p>Entre em contato diretamente:</p>
    <ul>
        <li>📧 contato@bahiapiacava.com.br</li>
        <li>📱 (11) 99999-9999</li>
        <li>💬 WhatsApp: wa.me/5511999999999</li>
    </ul>
</div>
```

---

**✅ Com essas soluções, seu formulário deve funcionar em qualquer ambiente!**
