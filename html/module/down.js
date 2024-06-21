ffmpeg -i "https://www.91mjplay.com/20240311/htVtwrqD/index.m3u8?start=10&end=600" -c copy 1.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240311/htVtwrqD/index.m3u8?start=610&end=1200" -c copy 2.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240311/htVtwrqD/index.m3u8?start=1210&end=1800" -c copy 3.mp4 &
ffmpeg -i "https://www.91mjplay.com/20231224/w83Qk60Y/index.m3u8?start=1810&end=2400" -c copy 34.mp4 &
ffmpeg -i "https://www.91mjplay.com/20231224/w83Qk60Y/index.m3u8?start=2410&end=3000" -c copy 35.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240309/ffnJw3TL/index.m3u8?start=3010&end=3600" -c copy 26.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240309/ffnJw3TL/index.m3u8?start=3610&end=4200" -c copy 27.mp4 &

ffmpeg -i "https://www.91mjplay.com/20240616/tPG1CHz4/index.m3u8?start=10&end=600" -c copy 12.mp4 -crf 18 -b:v 5M filter:v fps=60 -vf scale=3840:2160  &


ffmpeg -i "https://www.91mjplay.com/20240614/A8lz1Cal/index.m3u8?start=10&end=600" -crf 18 -b:v 5000k -filter:v fps=60 -c:v libx264 -vf scale=3840:2160 12.mp4
ffmpeg -i "https://www.91mjplay.com/20240614/A8lz1Cal/index.m3u8?start=610&end=1200" -crf 18 -b:v 5000k -filter:v fps=60 -c:v libx264 -vf scale=3840:2160 13.mp4



ffmpeg -i "https://www.91mjplay.com/20240312/yvt1nRmY/index.m3u8?start=10&end=600" -crf 18 -b:v 5000k -filter:v fps=60 -c:v libx264 -vf scale=3840:2160 16.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240312/yvt1nRmY/index.m3u8?start=610&end=1200" -crf 18 -b:v 5000k -filter:v fps=60 -c:v libx264 -vf scale=3840:2160 17.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240312/yvt1nRmY/index.m3u8?start=1210&end=1800" -crf 18 -b:v 5000k -filter:v fps=60 -c:v libx264 -vf scale=3840:2160 18.mp4 &
ffmpeg -i "https://www.91mjplay.com/20240312/yvt1nRmY/index.m3u8?start=1810&end=1400" -crf 18 -b:v 5000k -filter:v fps=60 -c:v libx264 -vf scale=3840:2160 19.mp4

ffmpeg -i "https://www.91mjplay.com/20240416/13baXJjD/index.m3u8?start=10&end=600" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 1.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240416/13baXJjD/index.m3u8?start=610&end=1200" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 2.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240416/13baXJjD/index.m3u8?start=1210&end=1800" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 3.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240416/13baXJjD/index.m3u8?start=1810&end=2400" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 4.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240416/13baXJjD/index.m3u8?start=2410&end=3000" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 5.mp4  &
ffmpeg -i "https://www.91mjplay.com/20240416/13baXJjD/index.m3u8?start=3010&end=3600" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 6.mp4  &

ffmpeg -i "https://www.91mjplay.com/20240416/13baXJjD/index.m3u8?start=3610&end=4200" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 7.mp4  &


