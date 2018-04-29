@echo off
docker-machine.exe start default

docker-machine.exe env --shell=cmd default
