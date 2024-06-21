#ffmpeg -i "$1?start=10&end=600" -crf 18 -b:v 5000k -filter:v fps=60 -vf scale=2160:1440 -c:v h264_nvenc -threads 3 1.mp4  &

start=10
end=600

for ((i=1; i<=$2; i++))
do
    echo "$start"
    echo "$end"

    ffmpeg -i "$1?start=$start&end=$end -protocol_whitelist file,http,https,tcp,tls -bufsize 5M -threads 0" "$i.mp4"

    # shellcheck disable=SC2003
    start=$(expr $start + 600)
    # shellcheck disable=SC2003
    end=$(expr $end + 600)
done