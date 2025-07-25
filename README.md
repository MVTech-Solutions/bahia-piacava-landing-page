# Bahia Piaçava - Landing Page

Landing page moderna e responsiva para a empresa Bahia Piaçava, especializada em produtos naturais de piaçava.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Performance Otimizada**: Carregamento rápido com lazy loading de imagens
- **Formulário de Contato**: Integração direta com API externa via JavaScript
- **Animações Suaves**: Scroll animations e micro-interações
- **SEO Friendly**: Estrutura HTML5 semântica
- **Cross-browser**: Compatível com navegadores modernos

## 📁 Estrutura do Projeto

```
bahia-piacava-landing-page/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos CSS principais
│   ├── js/
│   │   └── script.js      # JavaScript para interações
│   └── images/            # Imagens do site
│       ├── logo.png
│       ├── hero-image.png
│       ├── about-images.png
│       ├── product-vassouras.png
│       ├── product-cordas.png
│       └── product-kiosks.png
├── README.md              # Documentação
└── TESTE.md              # Guia de testes
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com CSS Grid e Flexbox
- **Vanilla JavaScript**: Interações e formulário
- **Google Fonts**: Tipografia (Inter)
- **API Externa**: Integração para envio de formulários

## 📧 Integração do Formulário

O formulário de contato está integrado com a API externa:
- **Endpoint**: `https://api.mvtechsolutions.com.br/api/contact`
- **Método**: POST
- **Tipo**: JSON

### Campos do Formulário:
- `name` (obrigatório): Nome do contato
- `email` (obrigatório): E-mail válido
- `phone` (opcional): Telefone de contato
- `message` (obrigatório): Mensagem (mínimo 10 caracteres)

### Validações Implementadas:
- Validação em tempo real
- Verificação de e-mail válido
- Validação de telefone básica
- Mensagens de erro personalizadas
- Feedback visual de sucesso/erro

## 🚀 Como Usar

### 1. Preparação das Imagens
Adicione as seguintes imagens na pasta `assets/images/`:
- `logo.png` - Logo da empresa
- `hero-image.png` - Imagem principal do hero
- `about-images.png` - Imagem da seção sobre
- `product-vassouras.png` - Imagem do produto vassouras
- `product-cordas.png` - Imagem do produto cordas
- `product-kiosks.png` - Imagem do produto quiosques

### 2. Hospedagem
Como o projeto usa apenas HTML, CSS e JavaScript vanilla, pode ser hospedado em qualquer servidor web estático:

#### Opções de Hospedagem Gratuita:
- **Netlify**: Arraste e solte a pasta do projeto
- **Vercel**: Upload via GitHub ou interface web
- **GitHub Pages**: Hospedagem direta do repositório
- **Firebase Hosting**: Hospedagem do Google
- **Surge.sh**: Hospedagem via linha de comando

#### Hospedagem Tradicional:
- Faça upload de todos os arquivos para o diretório público do seu servidor
- Certifique-se de que o `index.html` está na raiz

### 3. Teste Local
Para testar localmente, você pode usar:

```bash
# Servidor Python (se tiver Python instalado)
python -m http.server 8000

# Ou Servidor Node.js (se tiver Node.js instalado)
npx serve .

# Acesse: http://localhost:8000
```

## 🔧 Configurações

### Personalização de Cores
As cores podem ser alteradas no arquivo `assets/css/style.css` nas variáveis CSS:

```css
:root {
  --primary-color: #2E8B57;      /* Verde principal */
  --primary-light: #90EE90;      /* Verde claro */
  --primary-dark: #1F5F3F;       /* Verde escuro */
  --secondary-color: #FF6B35;    /* Laranja */
  --accent-color: #4ECDC4;       /* Turquesa */
}
```

### API de Contato
Para trocar a API, edite o arquivo `assets/js/script.js` na função `initContactForm()`:

```javascript
fetch('https://sua-api.com/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(contactData)
})
```

## 📱 Responsividade

O design é mobile-first e inclui breakpoints para:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔍 SEO

- Meta tags otimizadas
- Estrutura HTML5 semântica
- Images com alt text apropriado
- URLs amigáveis com âncoras
- Schema markup (pode ser adicionado conforme necessário)

## 🧪 Testes

Consulte o arquivo `TESTE.md` para uma lista completa de testes a serem realizados.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre a implementação, consulte a documentação ou entre em contato.

---

**Bahia Piaçava** - Produtos naturais de qualidade desde sempre.

## 🛠️ Configuração

### 1. Imagens
Adicione as seguintes imagens na pasta `assets/images/`:

- **logo.png**: Logo da Bahia Piaçava (recomendado: 200x60px)
- **hero-image.jpg**: Imagem principal (recomendado: 800x600px)
- **about-1.jpg**: Palmeiras de piaçava (recomendado: 400x600px)
- **about-2.jpg**: Vista aérea da plantação (recomendado: 400x300px)
- **about-3.jpg**: Processo sustentável (recomendado: 400x300px)
- **about-4.jpg**: Pôr do sol na plantação (recomendado: 800x300px)
- **product-vassouras.jpg**: Produto vassouras (recomendado: 400x300px)
- **product-cordas.jpg**: Produto cordas (recomendado: 400x300px)
- **product-kiosks.jpg**: Produto kiosks (recomendado: 400x300px)

### 2. Configuração do PHP
Para o formulário de contato funcionar:

1. Certifique-se de que o servidor tem PHP habilitado
2. Verifique se a extensão cURL está ativa
3. Configure as variáveis de e-mail no arquivo `send-contact.php` se necessário

### 3. API de Contato
O formulário está configurado para enviar dados para:
```
https://api.mvtechsolutions.com.br/api/contact
```

## 📱 Seções da Landing Page

### Header
- Logo da empresa
- Menu de navegação responsivo
- Botão de call-to-action "Solicitar Orçamento"

### Hero Section
- Título principal destacando produtos naturais de piaçava
- Descrição da empresa (30+ anos de experiência)
- Botões para "Ver Produtos" e "Nossa História"
- Imagem principal da plantação
- Estatísticas: 20+ anos, 100% natural, 500+ clientes

### Sobre Nós
- História da empresa e tradição familiar
- Informações sobre sustentabilidade
- Features: 100% Natural, Alta Qualidade, Tradição Familiar
- Galeria de imagens da plantação e processo

### Produtos
- Piaçava para vassouras
- Corda de piaçava
- Piaçava para kiosks
- Cards com imagens e descrições

### Por que escolher
- Benefícios: Durabilidade, Sustentabilidade, Saúde
- Lista de características dos produtos
- Box de garantia de qualidade

### Contato
- Formulário de contato integrado
- Informações de contato (endereço, telefone, e-mail)
- Horário de funcionamento

### Footer
- Links da empresa
- Informações de contato
- Copyright

## 🎨 Customização

### Cores
As cores principais estão definidas em CSS custom properties:
```css
:root {
  --primary-color: #2E8B57;    /* Verde principal */
  --primary-light: #90EE90;    /* Verde claro */
  --primary-dark: #1F5F3F;     /* Verde escuro */
  --secondary-color: #FF6B35;  /* Laranja */
  --accent-color: #4ECDC4;     /* Turquesa */
}
```

### Fontes
Utiliza a fonte Inter do Google Fonts com fallbacks:
```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Responsividade
- Desktop: Layout em grid de 2 colunas
- Tablet: Layout simplificado
- Mobile: Layout em coluna única com menu hambúrguer

## 🔧 Funcionalidades JavaScript

### Menu Mobile
- Menu hambúrguer responsivo
- Fechamento automático ao clicar em links
- Fechamento ao clicar fora do menu

### Formulário de Contato
- Validação em tempo real
- Integração com API externa
- Feedback visual para o usuário
- Estados de loading e success/error

### Animações
- Scroll suave entre seções
- Animações de entrada dos elementos
- Efeitos hover em cards e botões

### Performance
- Lazy loading de imagens
- Debounce em eventos de scroll
- Otimizações de JavaScript

## 🚀 Deploy

### Hospedagem Simples
1. Faça upload dos arquivos para o servidor
2. Certifique-se de que PHP está habilitado
3. Adicione as imagens na pasta `assets/images/`
4. Teste o formulário de contato

### Hospedagem Avançada
1. Configure um servidor web (Apache/Nginx)
2. Habilite HTTPS para segurança
3. Configure cache para recursos estáticos
4. Monitore os logs de erro do PHP

## 📞 Suporte

Para dúvidas ou customizações adicionais, entre em contato através do formulário da página ou pelos canais oficiais da Bahia Piaçava.

## 📄 Licença

Este projeto foi desenvolvido especificamente para a Bahia Piaçava. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Bahia Piaçava**
