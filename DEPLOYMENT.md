
# 🚀 Deployment Guide

This guide details how to deploy your **Flipkart Clone**. 
We will deploy the **Backend (Server)** on [Render](https://render.com) and the **Frontend (Client)** on [Vercel](https://vercel.com).

## 📋 Prerequisites

1.  **GitHub Repository**: Push this entire project to a **Public or Private GitHub Repository**.
2.  **Cloud MySQL Database**: Since you are using MySQL, you need a cloud-hosted MySQL database.
    *   **Option A**: [Aiven for MySQL](https://aiven.io/mysql) (Free tier available).
    *   **Option B**: [PlanetScale](https://planetscale.com/) (Free tier available).
    *   **Option C**: [Render Managed MySQL](https://render.com/docs/mysql) (Paid).
    *   *Note down your `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` from the cloud provider.*

---

## 🛠️ Step 1: Deploy Backend (Render)

1.  **Sign Up/Login** to [Render](https://dashboard.render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect to your GitHub repository.
4.  **Configure the Service**:
    *   **Name**: `flipkart-clone-api` (or similar)
    *   **Root Directory**: `server` (Important!)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  **Environment Variables**:
    Scroll down to "Environment Variables" and add these keys (from your cloud DB provider):
    | Key | Value |
    | :--- | :--- |
    | `DB_HOST` | *your-cloud-db-host* |
    | `DB_NAME` | *your-db-name* |
    | `DB_USER` | *your-db-user* |
    | `DB_PASSWORD` | *your-db-password* |
    | `DB_SYNC_FORCE` | `false` (Set to `true` ONLY if you want to wipe & seed data on deploy) |
    | `PORT` | `10000` (Render acts on port 10000 by default, let it manage it) |
6.  Click **Create Web Service**.
7.  Wait for deployment to finish. **Copy the On-Render URL** (e.g., `https://flipkart-clone-api.onrender.com`).

---

## 🎨 Step 2: Deploy Frontend (Vercel)

1.  **Sign Up/Login** to [Vercel](https://vercel.com/).
2.  Click **Add New...** > **Project**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    *   **Framework Preset**: Vite (detected automatically).
    *   **Root Directory**: Click `Edit` and select `client`.
5.  **Environment Variables**:
    Expand the "Environment Variables" section and add:
    | Key | Value |
    | :--- | :--- |
    | `VITE_API_URL` | Paste your Render Backend URL (e.g., `https://flipkart-clone-api.onrender.com`) |
    *   *Note: Do NOT add a trailing slash `/` at the end.*
6.  Click **Deploy**.

---

## ✅ Verification

1.  Open your Vercel App URL.
2.  Search for a product. If products load, your Frontend is talking to your Backend!
3.  Add an item to the cart to verify Database connectivity.

## 🔒 Security Note
We have created `.env` files locally to keep your secrets safe. **Do not commit `.env` files to GitHub.** Your `.gitignore` should already handle this.
