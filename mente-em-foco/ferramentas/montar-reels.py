# Monta os Reels de um lote. python3 montar-reels.py <pasta_lote> <pasta_fotos>
import json, subprocess, sys, os, tempfile
LOTE, FOTOS = sys.argv[1], sys.argv[2]
HERE = os.path.dirname(os.path.abspath(__file__))
MUS = sorted(os.path.join(HERE, 'musica', f) for f in os.listdir(os.path.join(HERE, 'musica')) if f.endswith('.mp3'))
d = json.load(open(os.path.join(LOTE, 'conteudo.json')))
out = os.path.join(LOTE, 'reels'); os.makedirs(out, exist_ok=True)
sh = os.path.join(HERE, 'reel-sombra.png')
if not os.path.exists(sh):
    from PIL import Image
    W, H = 1080, 1920; im = Image.new('RGBA', (W, H)); px = im.load()
    for y in range(H):
        t = y / H
        a = 0.88 - 0.75 * (t / 0.62) if t < 0.62 else 0.13 + 0.6 * ((t - 0.62) / 0.38)
        for x in range(W): px[x, y] = (0, 0, 0, int(255 * max(0, min(1, a))))
    im.save(sh)
D = 10
ONLY = sys.argv[3].split(',') if len(sys.argv) > 3 else None
for i, r in enumerate(d['reels']):
    if ONLY and r['data'] not in ONLY: continue
    foto = os.path.join(FOTOS, r['foto'] + '.png')
    if not os.path.exists(foto): foto = os.path.join(HERE, 'fotos-ia', r['foto'] + '.png')
    tmp = tempfile.mkdtemp()
    subprocess.run(['node', os.path.join(HERE, 'gerar-reel.js'), tmp, 'x', r['l1'], r['l2']], check=True)
    mus = MUS[i % len(MUS)]; off = (i * 7) % 15
    name = os.path.join(out, f"reel-{r['data']}.mp4")
    fc = f"""[0]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,scale=2160:3840,zoompan=z='1+0.0004*on':d={D*30}:s=1080x1920:fps=30,format=yuv420p,trim=duration={D}[bg];
[1]format=rgba,trim=duration={D}[sh];
[2]format=rgba,fade=in:st=0.2:d=0.5:alpha=1,fade=out:st=7.2:d=0.5:alpha=1,trim=duration={D}[b];
[3]format=rgba,fade=in:st=0.7:d=0.6:alpha=1,fade=out:st=7.2:d=0.5:alpha=1,trim=duration={D}[l1];
[4]format=rgba,fade=in:st=3.0:d=0.6:alpha=1,fade=out:st=7.2:d=0.5:alpha=1,trim=duration={D}[l2];
[5]format=rgba,fade=in:st=7.7:d=0.6:alpha=1,trim=duration={D}[e];
color=black@0.55:s=1080x1920:r=30:d={D},format=rgba,fade=in:st=7.2:d=0.6:alpha=1[dk];
[bg][sh]overlay[v1];[v1][dk]overlay[v1b];[v1b][b]overlay[v2];[v2][l1]overlay[v3];[v3][l2]overlay[v4];[v4][e]overlay,format=yuv420p[v];
[6]atrim=start={off}:duration={D},asetpts=PTS-STARTPTS,afade=in:d=0.5,afade=out:st=8.8:d=1.2[a]"""
    cmd = ['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-i', foto, '-loop', '1', '-i', sh]
    for k in ['base', 'l1', 'l2', 'end']: cmd += ['-loop', '1', '-i', f'{tmp}/{k}.png']
    cmd += ['-i', mus, '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-r', '30', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-c:a', 'aac', '-b:a', '160k', '-t', str(D), '-movflags', '+faststart', name]
    subprocess.run(cmd, check=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', '5', '-i', name, '-frames:v', '1', '-q:v', '3', name.replace('.mp4', '-capa.jpg')], check=True)
    print('ok', name)
