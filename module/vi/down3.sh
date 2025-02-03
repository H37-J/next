start=10
end=600
num=$RANDOM

eval "mkdir $4"
eval "cd $4"
for ((i=1; i<=$2; i++))
do
    echo "$start"
echo "$end"

if [ "$i" -eq "$2" ]
    then
cmd="ffmpeg -i $1\?start\=$start\&end\=$end -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v: h264_nvenc -crf 23 -threads 0 $i.mp4"
else
cmd="ffmpeg -i $1\?start\=$start\&end\=$end -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v: h264_nvenc -crf 23 -threads 0 $i.mp4 &"
fi

eval $cmd

# shellcheck disable=SC2003
start=$(expr $start + 600)
# shellcheck disable=SC2003
end=$(expr $end + 600)
done
