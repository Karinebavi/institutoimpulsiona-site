# Instituto Impulsiona

Site estático do Instituto Impulsiona. HTML, CSS e JavaScript puros, sem build. A raiz do repositório é o que o GitHub Pages publica.

Os textos e números vêm dos projetos com autorização de captação e do site anterior. Não invente resultado, depoimento, parceiro ou dado que não esteja numa página.

**Não coloque nomes, fotos ou trajetória das fundadoras.** Não crie seção de diretoria, governança ou organograma.

## Páginas

| Endereço | Arquivo |
|---|---|
| `/` | `index.html` |
| `/sobre/` | `sobre/index.html` |
| `/projetos/` | `projetos/index.html` |
| `/transparencia/` | `transparencia/index.html` |
| `/apoiar/` | `apoiar/index.html` |
| `/contato/` | `contato/index.html` |

Cada projeto autorizado tem uma ficha em `/projetos/#pis`, `#pis-2`, `#de-faixa-em-faixa`, `#esporte-na-estrada`, `#jogaacao` e `#sonho-de-campea`. Elas que jogam e Centro de Ginástica ficam em `/projetos/#em-analise`, sem valor autorizado e sem botão de patrocínio.

O menu, o rodapé e o botão de WhatsApp estão copiados em cada HTML. Se mudar um telefone, mude em todas as páginas.

## Ver no computador

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Editar um texto

Abra o HTML da página e troque só o que está visível entre as tags. Títulos aparecem em maiúsculas por causa do CSS: escreva normal.

A ficha de cada projeto autorizado fica dentro de `<details class="ficha">`. É o lugar do nº SLI, do processo, do DOU, do prazo, do local, da manifestação e do valor autorizado. Não coloque conta bancária.

Elas que jogam e Centro de Ginástica usam as logos em `assets/`, no bloco “Em análise”. Não mostre valor autorizado nem botão de patrocínio nesses dois.

## Imagens e documentos

| Arquivo | Uso |
|---|---|
| `assets/logo-horizontal-branco.png` | Logo do topo e do rodapé |
| `assets/logo-simbolo.png` | Marca d’água do hero |
| `favicon.png` | Ícone da aba |
| `assets/hero-poster.jpg` | Foto parada do hero (um frame do vídeo original) |
| `assets/logo-pis.png` | PIS, 1º e 2º ciclos |
| `assets/logo-de-faixa-em-faixa.png` | De Faixa em Faixa |
| `assets/logo-esporte-na-estrada.png` | Esporte na Estrada |
| `assets/logo-jogaacao.png` | JogaAção |
| `assets/logo-sonho-de-campea.png` | Sonho de Campeã |
| `assets/logo-elas-que-jogam.png` | Elas que jogam (em análise) |
| `assets/logo-centro-de-ginastica.png` | Centro de Ginástica (em análise) |
| `documentos/certidao-cndt-valida-27-01-2027.pdf` | CNDT, válida até 27/01/2027 |
| `documentos/certidao-pgfn-valida-27-01-2027.pdf` | Certidão federal / PGFN, válida até 27/01/2027 |

Para trocar uma imagem, mantenha o mesmo nome do arquivo. Estatuto, ata, cartão CNPJ e prestação de contas **não** têm PDF no site: o botão Solicitar abre o WhatsApp.

## Contato

- E-mail: `contato@institutoimpulsiona.com.br`
- WhatsApp: `https://wa.me/5531997924630` — (31) 99792-4630
- Instagram: `https://instagram.com/institutoimpulsiona`

“Quero patrocinar” e “Destine até 7% do seu IR” abrem WhatsApp ou e-mail com a mensagem que já está no `href`. O formulário de contato não tem servidor: os botões abrem WhatsApp ou o programa de e-mail.

## Cores e fontes

No começo de `css/styles.css`:

- tinta `#15100F`, vermelho `#C8202E`, osso `#FBF7F2`, creme `#F2EAE0`, dourado `#E0A53A`
- texto dourado sobre fundo claro usa `#6E470C` (`--gold-text`), para o contraste
- títulos: Archivo; texto: Inter; ícones: Font Awesome 6.5.1

Fontes e ícones vêm da internet. O hero é uma foto parada. Nada no site se move sozinho.

## Publicar

O workflow `.github/workflows/pages.yml` publica a raiz da `main`. Na primeira vez: **Settings → Pages → Source: GitHub Actions**.

Enquanto o domínio próprio não for apontado, o endereço é `https://karinebavi.github.io/institutoimpulsiona-site/`.

**Não crie `CNAME` e não configure domínio personalizado ainda.** O `sitemap.xml`, o `robots.txt` e as meta tags de compartilhamento usam esse endereço do GitHub Pages. Quando o domínio entrar, troque essa URL nesses arquivos e no `<head>` de cada página.

Também dá para publicar em **Deploy from a branch → main → / (root)**. O arquivo `.nojekyll` já está na raiz.
