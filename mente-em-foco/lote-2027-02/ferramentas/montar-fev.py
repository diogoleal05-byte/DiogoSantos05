#!/usr/bin/env python3
# Reels de frase de fevereiro 2027 (gancho: texto visível no 1.º frame).
# python3 montar-fev.py <reels.json> <pasta_fotos> <saida> [dia1,dia2,...]
import json, os, subprocess, sys
J, FOTOS, OUT = sys.argv[1:4]
SO = set(sys.argv[4].split(',')) if len(sys.argv) > 4 else None
H = os.path.dirname(os.path.abspath(__file__))
FER = os.path.join(H, '..', '..', 'ferramentas')
MUS = [os.path.join(FER, 'musica', m) for m in ('piano-cinematico-01.mp3', 'piano-violoncelo-03.mp3', 'synth-determinado-02.mp3')]
SOMBRA = os.path.join(FER, 'reel-sombra.png')
os.makedirs(OUT, exist_ok=True)
for i, r in enumerate(json.load(open(J))['reels']):
    dia = r['data'][-2:]
    if SO and dia not in SO: continue
    L = os.path.join(OUT, 'camadas', dia); os.makedirs(L, exist_ok=True)
    args = ['node', os.path.join(H, 'gerar-reel.js'), L, r['foto'], r['l1'], r['l2']] + (['lista'] if r.get('lista') else [])
    subprocess.run(args, check=True)
    T = 10 if r.get('lista') else 7
    TO = T - 1.8          # texto sai
    TE = T - 1.5          # logo entra
    l2in = 1.5 if r.get('lista') else 1.8
    fc = (
        f"[0]scale=1296:2304:force_original_aspect_ratio=increase,crop=1296:2304,"
        f"zoompan=z='1.08-0.0006*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={T*30}:s=1080x1920:fps=30[bg];"
        f"[1]format=rgba[sh];[bg][sh]overlay[b0];"
        f"color=black:s=1080x1920:d={T},format=rgba,colorchannelmixer=aa=0.75,fade=in:st={TO}:d=0.4:alpha=1[dk];[b0][dk]overlay[b1];"
        f"[2]format=rgba,fade=out:st={TO}:d=0.4:alpha=1[ba];[3]format=rgba,fade=out:st={TO}:d=0.4:alpha=1[a1];"
        f"[4]format=rgba,fade=in:st={l2in}:d=0.25:alpha=1,fade=out:st={TO}:d=0.4:alpha=1[a2];"
        f"[5]format=rgba,fade=in:st={TE}:d=0.5:alpha=1[en];"
        f"[b1][ba]overlay[c1];[c1][a1]overlay[c2];[c2][a2]overlay[c3];[c3][en]overlay,format=yuv420p[v];"
        f"[6]atrim=start=3:duration={T},asetpts=PTS-STARTPTS,afade=in:d=0.3,afade=out:st={T-1}:d=1[a]")
    cmd = ['ffmpeg', '-v', 'error', '-y', '-loop', '1', '-t', str(T), '-i', os.path.join(FOTOS, r['foto'] + '.png'),
           '-loop', '1', '-t', str(T), '-i', SOMBRA]
    for k in ('base', 'l1', 'l2', 'end'):
        cmd += ['-loop', '1', '-t', str(T), '-i', os.path.join(L, k + '.png')]
    cmd += ['-i', MUS[i % 3], '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-t', str(T),
            '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-r', '30', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart',
            os.path.join(OUT, f"reel-{r['data']}.mp4")]
    subprocess.run(cmd, check=True)
    print('ok', r['data'], flush=True)
