#!/bin/bash

echo "================================"
echo "   DEPLOY TORRE DE HANOI"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se estamos na pasta correta
if [ ! -f "index.html" ]; then
    echo -e "${RED}[ERRO]${NC} Arquivo index.html não encontrado!"
    echo "Certifique-se de estar na pasta do projeto Torre de Hanoi"
    read -p "Pressione Enter para sair..."
    exit 1
fi

# Verificar se já existe um repositório Git
if [ ! -d ".git" ]; then
    echo -e "${BLUE}[INFO]${NC} Inicializando repositório Git..."
    git init
    echo ""
fi

# Verificar se o remote origin existe
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}[AVISO]${NC} Remote 'origin' não configurado!"
    echo ""
    echo "Por favor, configure o remote manualmente:"
    echo -e "${GREEN}git remote add origin https://github.com/SEU_USUARIO/torre-de-hanoi.git${NC}"
    echo ""
    echo "Substitua SEU_USUARIO pelo seu nome de usuário do GitHub"
    echo ""
    read -p "Pressione Enter para sair..."
    exit 1
fi

echo -e "${GREEN}[INFO]${NC} Remote configurado!"
echo ""

# Verificar se há mudanças para commit
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${YELLOW}[AVISO]${NC} Nenhuma mudança detectada para commit"
    echo ""
else
    # Adicionar arquivos
    echo -e "${BLUE}[INFO]${NC} Adicionando arquivos..."
    git add .
    
    # Fazer commit
    echo -e "${BLUE}[INFO]${NC} Fazendo commit..."
    read -p "Digite a mensagem do commit (ou pressione Enter para usar padrão): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Atualizar jogo Torre de Hanoi"
    fi
    
    git commit -m "$commit_msg"
fi

# Fazer push
echo -e "${BLUE}[INFO]${NC} Enviando para o GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================"
    echo -e "   ${GREEN}DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
    echo "================================"
    echo ""
    echo "Seu jogo estará disponível em alguns minutos em:"
    echo -e "${GREEN}https://SEU_USUARIO.github.io/torre-de-hanoi/${NC}"
    echo ""
    echo "Substitua SEU_USUARIO pelo seu nome de usuário do GitHub"
    echo ""
else
    echo ""
    echo -e "${RED}[ERRO]${NC} Falha no deploy!"
    echo "Verifique suas credenciais e conexão com a internet."
    echo ""
fi

read -p "Pressione Enter para sair..."
