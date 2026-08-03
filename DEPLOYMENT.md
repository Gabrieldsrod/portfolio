# Guia de Implantação em VM Pessoal (Docker + Nginx Proxy Reverso)

Este guia descreve como hospedar este projeto em uma Máquina Virtual (Ubuntu/Debian) usando **Docker Compose** para rodar a aplicação e **Nginx no Host** como proxy reverso com suporte a **HTTPS / SSL (Certbot)**.

---

## 1. Pré-requisitos na VM

Acesse sua VM via SSH e certifique-se de ter os seguintes pacotes instalados:

```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar Docker, Nginx e Certbot
sudo apt install -y docker.io docker-compose-v2 nginx certbot python3-certbot-nginx

# Adicionar seu usuário ao grupo docker (para não precisar usar sudo)
sudo usermod -aG docker $USER
newgrp docker
```

---

## 2. Subir a Aplicação com Docker Compose

1. Clone o repositório na sua VM:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO> portfolio
   cd portfolio
   ```

2. Suba o container da aplicação:
   ```bash
   docker compose up -d --build
   ```

3. Verifique se o container está rodando:
   ```bash
   docker compose ps
   ```
   *A aplicação estará escutando internamente em `127.0.0.1:8080`.*

---

## 3. Configurar o Nginx no Host como Proxy Reverso

1. Copie o modelo de configuração do Nginx:
   ```bash
   sudo cp nginx-proxy.conf.example /etc/nginx/sites-available/portfolio.conf
   ```

2. Edite o arquivo para colocar seu domínio ou IP:
   ```bash
   sudo nano /etc/nginx/sites-available/portfolio.conf
   ```
   *Altere `seu-dominio.com` e `www.seu-dominio.com` pelo seu domínio real.*

3. Ative a configuração criando o link simbólico:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio.conf /etc/nginx/sites-enabled/
   ```

4. Teste a sintaxe do Nginx e recarregue o serviço:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 4. Configurar Certificado SSL Gratuito (Certbot / Let's Encrypt)

Para habilitar HTTPS com renovação automática:

```bash
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

O Certbot configurará automaticamente o redirecionamento HTTP -> HTTPS no seu Nginx.

---

## 5. Comandos Úteis de Manutenção

- **Ver logs do container:**
  ```bash
  docker compose logs -f
  ```
- **Reiniciar a aplicação:**
  ```bash
  docker compose restart
  ```
- **Atualizar a aplicação com novas alterações do Git:**
  ```bash
  git pull
  docker compose up -d --build
  ```
