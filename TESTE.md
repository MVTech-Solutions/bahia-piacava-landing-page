# 🚀 INSTRUÇÕES DE TESTE - Bahia Piaçava Landing Page

## ✅ Checklist de Verificação

### 1. Estrutura dos Arquivos
Verifique se todos os arquivos foram criados corretamente:

```
✅ index.html              (Página principal)
✅ README.md               (Documentação)
✅ assets/css/style.css    (Estilos)
✅ assets/js/script.js     (JavaScript)
✅ assets/images/          (Pasta de imagens)
```

### 2. Adicionar Imagens
📁 Na pasta `assets/images/`, adicione:

```
🖼️ logo.png               (Logo da Bahia Piaçava)
🖼️ hero-image.png         (Imagem principal do hero)
🖼️ about-images.png       (Imagem da seção sobre)
🖼️ product-vassouras.png  (Produto vassouras)
🖼️ product-cordas.png     (Produto cordas/cestas)
🖼️ product-kiosks.png     (Quiosque/gazebo)
```

### 3. Teste da Landing Page

#### 🌐 Navegação
- [ ] Logo carrega corretamente
- [ ] Menu desktop funciona
- [ ] Menu mobile (hambúrguer) abre/fecha
- [ ] Links de navegação fazem scroll suave
- [ ] Botão "Solicitar Orçamento" funciona

#### 📱 Responsividade
Teste em diferentes tamanhos de tela:
- [ ] Desktop (1200px+)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (até 768px)

#### 🎨 Layout e Design
- [ ] Todas as imagens carregam
- [ ] Cores estão corretas (verde #2E8B57)
- [ ] Fontes carregam (Inter do Google Fonts)
- [ ] Animações funcionam no scroll
- [ ] Cards de produtos têm hover effect

#### 📋 Formulário de Contato
- [ ] Campos obrigatórios são validados
- [ ] Validação de e-mail funciona
- [ ] Validação de telefone funciona
- [ ] Mensagem de erro aparece
- [ ] Botão mostra loading ao enviar
- [ ] API retorna resposta (teste com dados reais)

### 4. Teste do Formulário de Contato

#### 🧪 Teste Manual do Formulário
1. Abra a página no navegador
2. Preencha o formulário com dados válidos
3. Clique em "Enviar Mensagem"
4. Verifique se:
   - [ ] Loading aparece no botão
   - [ ] Mensagem de sucesso/erro é exibida
   - [ ] Formulário é limpo após sucesso
   - [ ] Console não mostra erros JavaScript

#### 🔍 Debug do JavaScript
Se o formulário não funcionar:

1. **Abra o Console do Navegador (F12)**
2. **Procure por erros JavaScript**
3. **Verifique a aba Network para ver requisições**

#### 📡 Teste da API
**Teste a API manualmente:**
```bash
curl -X POST https://api.mvtechsolutions.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","phone":"11999999999","message":"Mensagem de teste"}'
```

#### 🌐 Hospedagem Estática
Como o projeto agora usa apenas HTML/CSS/JS, pode ser hospedado em:
- [ ] Netlify (gratuito)
- [ ] Vercel (gratuito)  
- [ ] GitHub Pages (gratuito)
- [ ] Firebase Hosting (gratuito)
- [ ] Qualquer servidor web estático

### 5. Performance e SEO

#### ⚡ Performance
- [ ] Imagens otimizadas (< 500KB cada)
- [ ] CSS/JS minificados (produção)
- [ ] Lazy loading das imagens
- [ ] Fontes Google carregando otimizadas

#### 🔍 SEO
- [ ] Title tag presente
- [ ] Meta description configurada
- [ ] Headers H1, H2, H3 corretos
- [ ] Alt text nas imagens
- [ ] URL amigável
- [ ] Schema.org (opcional)

### 6. Segurança

#### 🔒 Verificações
- [ ] HTTPS habilitado (produção)
- [ ] Headers de segurança
- [ ] Validação de entrada (JavaScript)
- [ ] Rate limiting da API

### 7. Customizações Opcionais

#### 🎨 Branding
- [ ] Cores personalizadas (CSS variables)
- [ ] Logo de alta resolução
- [ ] Favicon adicionado
- [ ] Meta tags Open Graph

#### 🚀 Funcionalidades Extras
- [ ] Google Analytics
- [ ] WhatsApp button
- [ ] Botão "Voltar ao topo"
- [ ] Mapa de localização
- [ ] Chat online

### 8. Deploy em Produção

#### 🌐 Hospedagem Estática
Escolha uma das opções gratuitas:

**Netlify:**
1. Arraste a pasta do projeto para netlify.com
2. Configure domínio personalizado (opcional)

**Vercel:**
1. Conecte seu GitHub
2. Faça deploy automático

**GitHub Pages:**
1. Suba o código para GitHub
2. Ative GitHub Pages nas configurações

#### 🔧 Configurações de Produção
- [ ] Domínio personalizado configurado
- [ ] SSL/HTTPS habilitado
- [ ] Redirect www para domínio principal
- [ ] Google Analytics adicionado
- [ ] Sitemap.xml criado (opcional)

### 🆘 Resolução de Problemas

#### ❌ Problemas Comuns

**Formulário não envia:**
- Verificar se JavaScript carregou
- Verificar console do navegador para erros
- Testar API manualmente
- Verificar conexão com internet

**Imagens não carregam:**
- Verificar nomes dos arquivos (.png)
- Verificar caminhos das imagens
- Verificar se arquivos existem na pasta

**Layout quebrado:**
- Verificar se CSS carregou
- Verificar console do navegador
- Testar em modo privado/incógnito
- Limpar cache do navegador

**Menu mobile não funciona:**
- Verificar se JavaScript carregou
- Verificar erros no console
- Testar em diferentes navegadores

**API não responde:**
- Verificar endpoint da API
- Testar com cURL manualmente
- Verificar CORS da API
- Confirmar formato dos dados enviados

### 📞 Suporte

Se encontrar problemas:
1. Verifique este checklist
2. Consulte os logs de erro
3. Teste cada componente isoladamente
4. Entre em contato para suporte técnico

---

**✨ Sucesso! Sua landing page da Bahia Piaçava está pronta para conquistar clientes!**
