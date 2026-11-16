# Instituto Impulsiona

Site estático do Instituto Impulsiona (organização da sociedade civil, Lei de Incentivo ao Esporte). HTML, CSS e JavaScript puros, sem build. Pensado para o GitHub Pages servir a raiz do repositório.

O texto, os números, os contatos e os destinos de WhatsApp e e-mail vêm do site publicado em [www.institutoimpulsiona.com.br](https://www.institutoimpulsiona.com.br) em 16 de novembro de 2026. Não invente conteúdo: se um dado não está numa página abaixo, ele não estava no site.

## Páginas

| Endereço | Arquivo | O que tem |
|---|---|---|
| `/` | `index.html` | Início: hero, quem somos, método 3T, números e chamada |
| `/sobre/` | `sobre/index.html` | Missão, visão, valores, diretoria e corpo técnico |
| `/projetos/` | `projetos/index.html` | PIS, De Faixa em Faixa, Esporte na Estrada e JogaAção |
| `/transparencia/` | `transparencia/index.html` | Prestação de contas, tabela, documentos e organograma |
| `/apoiar/` | `apoiar/index.html` | Patrocínio (empresas) e doação ou voluntariado (pessoas) |
| `/contato/` | `contato/index.html` | Contatos e formulário |

Cada projeto também pode ser linkado direto: `/projetos/#pis`, `/projetos/#de-faixa-em-faixa`, `/projetos/#esporte-na-estrada`, `/projetos/#jogaacao`.

O menu, o rodapé e o botão verde de WhatsApp estão **copiados em cada HTML**. Se mudar um telefone ou um item de menu, altere em todas as páginas.

## Ver no computador

Na pasta do repositório:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`. Use um servidor local: abrindo o arquivo direto no navegador, o vídeo do hero e alguns caminhos podem falhar.

## Editar um texto

1. Abra o HTML da página (tabela acima) em qualquer editor.
2. Procure a frase e troque só o texto visível, entre as tags.
3. Não mude `class`, `href` nem os nomes dos arquivos de imagem, a menos que queira trocar o destino do link ou a imagem.
4. Salve e atualize o navegador.

Títulos ficam em maiúsculas por causa do CSS. Escreva normal, por exemplo `Do impulso`. O site mostra `DO IMPULSO`.

O ano do rodapé (`© … Instituto Impulsiona`) é preenchido sozinho com o ano corrente. O CNPJ está escrito no rodapé: **53.381.079/0001-04**.

## Editar uma imagem ou o vídeo

As mídias ficam em `assets/`. Troque o arquivo **mantendo o mesmo nome**:

| Arquivo | Onde aparece |
|---|---|
| `assets/logo-horizontal-branco.png` | Logo do topo (fundo escuro) e do rodapé. Só existe a versão branca. |
| `assets/logo-simbolo.png` | Marca d’água do hero |
| `favicon.png` | Ícone da aba. É o símbolo reduzido. Se trocar o símbolo, gere de novo um PNG quadrado de 32 px com o mesmo nome. |
| `assets/apple-touch-icon.png` | Ícone ao salvar na tela inicial do celular |
| `assets/hero.mp4` | Vídeo de fundo da página inicial (sem som, em loop) |
| `assets/logo-pis.png` | Card do PIS |
| `assets/logo-de-faixa-em-faixa.png` | Card De Faixa em Faixa |
| `assets/logo-esporte-na-estrada.png` | Card Esporte na Estrada |
| `assets/logo-jogaacao.png` | Card JogaAção |

Use PNG com fundo transparente nos logos. O vídeo precisa ser MP4.

## WhatsApp, e-mail e Instagram

Não troque o número “no olho”: os botões usam o link completo.

- WhatsApp principal, flutuante, doações, patrocínio, voluntariado, “Solicitar” e formulário: `https://wa.me/5531997924630` — **(31) 99792-4630**
- Segundo telefone, só no rodapé e em Contato: `https://wa.me/5531993898010` — **(31) 99389-8010**
- E-mail: `contato@institutoimpulsiona.onmicrosoft.com`
- Instagram: `https://instagram.com/institutoimpulsiona`

Os botões “Solicitar”, “Quero patrocinar”, “Apoiar com R$ …” e “Quero ser voluntário” abrem o WhatsApp com a mensagem que já está no `href`. Se mudar a frase, troque também o texto depois de `?text=` (espaços viram `%20`). Os valores R$ 50, R$ 100, R$ 200 e Outro são ajustados pelo arquivo `js/site.js`.

O formulário de Contato **não envia para um servidor**. “Enviar pelo WhatsApp” abre `wa.me/5531997924630`. “Enviar por e-mail” abre o programa de e-mail para `contato@institutoimpulsiona.onmicrosoft.com`, assunto `Contato pelo site — {nome}`.

## Cores e fontes

Estão no começo de `css/styles.css`:

- tinta `#15100F`, vermelho `#C8202E`, osso `#FBF7F2`, creme `#F2EAE0`, dourado `#E0A53A`
- títulos: [Archivo](https://fonts.google.com/specimen/Archivo)
- texto: [Inter](https://fonts.google.com/specimen/Inter)
- ícones: Font Awesome 6.5.1 (carregado da internet)

As duas fontes e os ícones precisam de conexão. Sem internet, o navegador usa uma fonte parecida do sistema e os ícones somem; o texto continua.

## Publicar

O workflow `.github/workflows/pages.yml` publica a raiz do repositório no GitHub Pages a cada push na branch `main`.

Na primeira vez, no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Não é preciso escolher uma pasta. Depois do merge deste site na `main`, a Action “Publicar no GitHub Pages” sobe o site.

Enquanto o domínio próprio não for apontado, o endereço é:

`https://karinebavi.github.io/institutoimpulsiona-site/`

**Não crie um arquivo `CNAME` e não configure domínio personalizado ainda.** O DNS de `institutoimpulsiona.com.br` só deve mudar depois que este site for aprovado. O endereço sem `www` ainda não faz parte desta publicação.

As imagens de compartilhamento (Open Graph) apontam para o logo nesse endereço do GitHub Pages. Quando o domínio próprio entrar no ar, vale atualizar a linha `og:image` no `<head>` de cada HTML, se quiser que a miniatura use o domínio novo. Não há URL canônica no HTML de propósito, para não fixar o domínio antes da hora.

Se preferir publicar sem Actions: **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**. O arquivo `.nojekyll` já está na raiz para o GitHub não reprocessar o site.

## O que o site antigo não tinha

Isto não foi inventado e continua de fora até alguém enviar o arquivo ou o texto:

- PDFs de Estatuto Social, Ata de Fundação e Eleição, prestação de contas e Cartão CNPJ. Os botões só chamam no WhatsApp.
- Nomes, fotos e currículos da diretoria e do corpo técnico.
- Fotos dos projetos, além dos quatro logos e do vídeo do hero.
- Logo horizontal colorido ou preto (só há a versão branca, para fundo escuro).
- Endereço físico, CEP ou mapa. O bloco “Atuação nacional” é um cartão, não um mapa.
- A frase **Atuação nacional ·** na página Contato termina no ponto médio, como no site de origem. Não foi completada.
- Pix, boleto ou pagamento no site. Doação é só conversa no WhatsApp.
