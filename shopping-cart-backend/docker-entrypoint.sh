#!/bin/bash

set -m
gradle bootRun &
find src/main/ -name *.java | entr gradle compileJava

fg %1