import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

templates = re.findall(r'<template id="([^"]+)">', text)
print('Templates found in index.html:', len(templates))
for t in templates:
    print(' -', t)

required_templates = [
    'template-landing',
    'template-login',
    'template-my-complaints',
    'template-report-step1',
    'template-report-step2',
    'template-report-step3',
    'template-success',
    'template-tracking',
    'template-profile'
]

all_ok = True
for rt in required_templates:
    if rt in templates:
        print(f'  [PASS] {rt}')
    else:
        print(f'  [FAIL] {rt}')
        all_ok = False

if all_ok:
    print('\nALL REQUIRED TEMPLATES PRESENT!')
