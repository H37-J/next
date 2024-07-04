#ffmpeg -i "$1?start=10&end=600" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 1.mp4  &

start=10
end=600
num=$RANDOM
eval "mkdir $2"
eval "cd $2"
cmd="ffmpeg -i $1 -crf 23 -b:v 3000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 $2.mp4"
eval "$cmd"