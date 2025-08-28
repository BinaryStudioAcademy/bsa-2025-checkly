#!/bin/bash
set -e

echo "👉 Installing Chromium dependencies (Elastic Beanstalk, Amazon Linux 2)..."

yum install -y \
	atk \
	at-spi2-atk \
	at-spi2-core \
	gtk3 \
	nss \
	cups-libs \
	alsa-lib \
	pango \
	cairo \
	libXcomposite \
	libXcursor \
	libXdamage \
	libXext \
	libXi \
	libXtst \
	libXrandr \
	libXfixes \
	libXrender \
	libxkbcommon \
	mesa-libgbm \
	libdrm \
	xorg-x11-server-Xvfb \
	libXss \
	libXScrnSaver \
	liberation-fonts

yum install -y \
	ca-certificates \
	fonts-liberation \
	libasound2 \
	libatk-bridge2.0-0 \
	libatk1.0-0 \
	libc6 \
	libcairo2 \
	libcups2 \
	libdbus-1-3 \
	libexpat1 \
	libfontconfig1 \
	libgbm1 \
	libgcc1 \
	libglib2.0-0 \
	libgtk-3-0 \
	libnspr4 \
	libnss3 \
	libpango-1.0-0 \
	libpangocairo-1.0-0 \
	libstdc++6 \
	libx11-6 \
	libx11-xcb1 \
	libxcb1 \
	libxcomposite1 \
	libxcursor1 \
	libxdamage1 \
	libxext6 \
	libxfixes3 \
	libxi6 \
	libxrandr2 \
	libxrender1 \
	libxss1 \
	libxtst6 \
	lsb-release \
	wget \
	xdg-utils

echo "✅ Chromium dependencies installed."
