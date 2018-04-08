#!/bin/bash
export NODE_ENV=production
npm run build
npm run server
echo Production Done!
