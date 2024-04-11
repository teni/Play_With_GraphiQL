#!/bin/bash

input_file="password_file"
i=0;
alias_part="mutation {";
while IFS= read -r line
do
  line_array=($line);
  ((i+=1));
  alias_part=$alias_part" alias$i : login(username: '${line_array[0]}', password: '${line_array[1]}') {accessToken } " ;
done < "$input_file";

alias_part= $alias_part"}"

curl 'http://localhost:5013/graphql' -X POST  -H "Content-Type: application/json" --data-raw "{\"query\":\"  $alias_part   \" }"
