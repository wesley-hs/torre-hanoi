# 🚀 Configuração Git - Torre de Hanoi

## Passo 1: Configurar Git no Projeto

Abra o **Git Bash** na pasta do projeto e execute os comandos abaixo:

```bash
# Navegar para a pasta do projeto
cd /c/Users/Micro/Desktop/torre

# Inicializar repositório Git
git init

# Configurar nome e email (substitua pelos seus dados)
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Adicionar jogo Torre de Hanoi completo"
```

## Passo 2: Criar Repositório no GitHub

1. Acesse: https://github.com
2. Clique em "New repository"
3. Nome: `torre-de-hanoi`
4. Marque como "Public"
5. NÃO marque "Add a README file"
6. Clique em "Create repository"

## Passo 3: Conectar ao GitHub

```bash
# Conectar ao repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/torre-de-hanoi.git

# Verificar se está conectado
git remote -v

# Enviar arquivos para o GitHub
git push -u origin main
```

## Passo 4: Ativar GitHub Pages

1. Vá para o repositório no GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main" → "/ (root)"
5. Save

## 🌐 Seu jogo ficará disponível em:
```
https://SEU_USUARIO.github.io/torre-de-hanoi/
```

## 🔄 Para futuras atualizações:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

---

**Dica**: Use sempre o Git Bash para comandos Git, pois está configurado corretamente!
