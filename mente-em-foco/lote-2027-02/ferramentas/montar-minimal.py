#!/usr/bin/env python3
# Reels minimal de fevereiro 2027: clipe Kling escuro + frase pequena em minúsculas visível desde o 1.º frame.
# python3 montar-minimal.py <minimal.json> <pasta_clipes> <saida>
import json, os, subprocess, sys
J, CL, OUT = sys.argv[1:4]
H = os.path.dirname(os.path.abspath(__file__))
MUS = os.path.join(H, '..', '..', 'ferramentas', 'musica', 'piano-cinematico-01.mp3')
os.makedirs(OUT, exist_ok=True)
for m in json.load(open(J))['minimal']:
    L = os.path.join(OUT, 'camadas', m['data']); os.makedirs(L, exist_ok=True)
    subprocess.run(['node', os.path.join(H, 'gerar-minimal.js'), L, m['frase']], check=True)
    clip = os.path.join(CL, f"clipe-{m['clipe']}.mp4")
    d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', clip]))
    T = min(max(d, 9), 12)
    fc = (f"[0]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,eq=brightness=-0.04:saturation=0.85,fps=30,tpad=stop_mode=clone:stop_duration=6,trim=duration={T},setpts=PTS-STARTPTS[bg];"
          f"[1]format=rgba,fade=out:st={T-2.2}:d=0.4:alpha=1[tx];[2]format=rgba,fade=in:st={T-2.6}:d=0.5:alpha=1[hd];"
          f"[bg][tx]overlay[b1];[b1][hd]overlay,format=yuv420p,fade=out:st={T-0.6}:d=0.6[v];"
          f"[3]atrim=start={m.get('mus_start', 0)}:duration={T},asetpts=PTS-STARTPTS,afade=in:d=0.5,afade=out:st={T-1.5}:d=1.5,volume=0.8[a]")
    cmd = ['ffmpeg', '-v', 'error', '-y', '-i', clip,
           '-loop', '1', '-t', str(T), '-i', os.path.join(L, 'texto.png'),
           '-loop', '1', '-t', str(T), '-i', os.path.join(L, 'handle.png'),
           '-i', MUS, '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-t', str(T),
           '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart',
           os.path.join(OUT, f"minimal-{m['data']}.mp4")]
    subprocess.run(cmd, check=True)
    print('ok', m['data'], flush=True)
