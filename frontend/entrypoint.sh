# wait for the service to be ready
while ! curl --fail --silent --head http://localhost:5001; do
  sleep 1
done

open http://localhost:5001