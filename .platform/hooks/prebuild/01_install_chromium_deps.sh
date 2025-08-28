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

echo "✅ Chromium dependencies installed."
