#!/bin/bash

echo "================================"
echo "   CONFIGURAÇÃO INICIAL GIT"
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

echo -e "${BLUE}[INFO]${NC} Configurando Git para o projeto Torre de Hanoi..."
echo ""

# Verificar se já existe um repositório Git
if [ ! -d ".git" ]; then
    echo -e "${BLUE}[INFO]${NC} Inicializando repositório Git..."
    git init
    echo ""
fi

# Configurar nome e email (se não estiver configurado)
git_name=$(git config user.name)
git_email=$(git config user.email)

if [ -z "$git_name" ]; then
    read -p "Digite seu nome: " user_name
    git config user.name "$user_name"
fi

if [ -z "$git_email" ]; then
    read -p "Digite seu email: " user_email
    git config user.email "$user_email"
fi

echo -e "${GREEN}[INFO]${NC} Configuração Git:"
echo "Nome: $(git config user.name)"
echo "Email: $(git config user.email)"
echo ""

# Adicionar arquivos
echo -e "${BLUE}[INFO]${NC} Adicionando arquivos ao Git..."
git add .

# Fazer primeiro commit
echo -e "${BLUE}[INFO]${NC} Fazendo primeiro commit..."
git commit -m "Adicionar jogo Torre de Hanoi completo"

echo ""
echo -e "${GREEN}[SUCCESS]${NC} Repositório Git configurado com sucesso!"
echo ""
echo "Próximos passos:"
echo "1. Criar repositório no GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Configurar remote:"
echo -e "   ${GREEN}git remote add origin https://github.com/SEU_USUARIO/torre-de-hanoi.git${NC}"
echo ""
echo "3. Fazer push:"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo ""
echo "4. Ou usar o script de deploy:"
echo -e "   ${GREEN}./deploy.sh${NC}"
echo ""

read -p "Pressione Enter para sair..."
