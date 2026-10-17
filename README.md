# Simón Morales Lozano — CV virtual

Portfolio personal / CV online. HTML + CSS + JavaScript puro con Bootstrap 5 (vía CDN), sin build step: se publica tal cual con GitHub Pages.

## Cómo actualizar el contenido

Todo el contenido (experiencia, educación, skills, proyectos, contacto) está en **[`js/data.js`](js/data.js)**, en español e inglés.

1. Editá `js/data.js` (cada texto tiene `{ es: "...", en: "..." }`).
2. Cambiá `updated` a la fecha de hoy (`"AAAA-MM"`), se muestra en el footer.
3. `git commit` + `git push` → GitHub Pages lo publica en 1–2 minutos.

Otros archivos útiles:

| Qué | Dónde |
| --- | --- |
| Foto de perfil | `assets/img/simon.png` |
| CV descargable | `assets/SimonMoralesLozano-CV-Eng.pdf` (ruta en `data.js` → `cv`) |
| Proyectos | `projects` en `data.js` (la sección aparece sola cuando hay al menos uno) |
| Colores / estilos | variables al principio de `css/style.css` |

## Ver en local

```bash
python -m http.server 5173
```

y abrí <http://localhost:5173>.

## Publicación (GitHub Pages + dominio propio)

1. **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)`.
2. En **Custom domain** poné tu dominio (queda guardado en el archivo `CNAME`).
3. En el panel DNS de tu dominio:
   - Dominio raíz (`midominio.com`): registros **A** → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: registro **CNAME** → `SimM20.github.io`
4. Cuando el certificado esté listo, activá **Enforce HTTPS**.
