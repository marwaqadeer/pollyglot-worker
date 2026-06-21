#PollyGlot - AI Translation App

## Overview

PollyGlot is an AI-powered translation web app that translates text into French, Spanish, or Japanese using OpenRouter AI models via a secure Cloudflare Worker backend.

## Features

- Translate text into 3 languages (French, Spanish, Japanese)
- Clean and simple UI following Figma design
- Secure bakend using Cloudflare Worker
- API key hidden using enviroment variables
- Fast AI-powered responses

## Tech Stack

- React (Frontend)
- Cloudflare Workers (Backend)
- OpenRouter AI API
- JavaScript / CSS

---

## API Security

API keys are stored securely using:

- `.dev.vars`
- Cloudflare Worker enviroment variables

No API keys are exposed in frontend code.

---

## How it works

1. User enters text
2. Select language
3. Frontend sends request to Cloudflare Worker
4. Worker sends request to OpenRouter API
5. AI returns translation
6. Result is shown in UI

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install

```
