ffmpeg -i "https://www.91mjplay.com/20231224/w83Qk60Y/index.m3u8?start=10&end=600" -protocol_whitelist file,http,https,tcp,tls -bufsize 5M -threads 0 -c copy 1.mp4

ffmpeg -i "https://www.91mjplay.com/202207/05/onEYC7zf/index.m3u8?start=10&end=600" 1.mp4 &
ffmpeg -i "blob:https://missav.com/27fdb889-8e50-49ee-8921-c5fd3b6533b5" -c copy 3.mp4 &
ffmpeg -i "https://www.91mjplay.com/20231224/w83Qk60Y/index.m3u8?start=1810&end=2400" -c copy 34.mp4 &
ffmpeg -i "https://www.91mjplay.com/20231224/w83Qk60Y/index.m3u8?start=2410&end=3000" -c copy 35.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240309/ffnJw3TL/index.m3u8?start=3010&end=3600" -c copy 26.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240309/ffnJw3TL/index.m3u8?start=3610&end=4200" -c copy 27.mp4 &



ffmpeg -i "https://www.91mjplay.com/20240103/ILsdGwGM/index.m3u8?start=10&end=600" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 1.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240103/ILsdGwGM/index.m3u8?start=610&end=1200" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 2.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240103/ILsdGwGM/index.m3u8?start=1210&end=1800" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 3.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240103/ILsdGwGM/index.m3u8?start=1810&end=2400" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 4.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240103/ILsdGwGM/index.m3u8?start=2410&end=3000" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 5.mp4  &




ffmpeg -i "https://www.91mjplay.com/20240622/TuEmKfg3/index.m3u8?start=10&end=600" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 6.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240622/TuEmKfg3/index.m3u8?start=610&end=1200" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 7.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240622/TuEmKfg3/index.m3u8?start=1210&end=1800" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 8.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240622/TuEmKfg3/index.m3u8?start=1810&end=2400" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 9.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240622/TuEmKfg3/index.m3u8?start=2410&end=3000" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 10.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240622/TuEmKfg3/index.m3u8?start=3010&end=3600" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 11.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240622/TuEmKfg3/index.m3u8?start=3610&end=4200" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 12.mp4  &
