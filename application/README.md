chaincode api server
====================

## programs
```
nodejs
```


## Server Start
```
node server.js > /dev/null 2>&1 &
```


## Api list
```
1. Create User (register)
2. Minting (mint)
3. TotalSupply (TotalSupply)
4. Minter account balance (Burn)
5. Account check (ClientAccountID)
6. Account balance (ClientAccountBalance)
7. Transfer (Transfer)
8. Approve (Approve)
9. Allowance (Allowance)
10. TransferFrom (TransferFrom)
```

## information
```
{
    "id" //The id value in the body of the api refers to uthe logged-in user.
}
```


## Endpoint
```
http://IP:Port/api/v1.0/function
```


### 1. Create User
 - Method : POST
 - Path : /register
 + __Reaquest__
 ```json
 { 
     "id" : "",
     "password" : ""
 }
 ```
 
 + __Response__

 - Success 200 code
 ```json
 {
     "response" : "${Create Username} User Register Successfully"
 }
 ```

 - __Password Error__
 ```json
 {
     "response" :  "password 파라미터의 값이 존재하지 않습니다."
 }
 ```

 - __ID Error__
 ```json
 {
     "response" :  "id 파라미터의 값이 존재하지 않습니다."
 }
 ```



### 2. Minting
 - Method : Post
 - Path : /minter
 + __Reaquest__
 ```json
 {
     "id" : "minter",
     "totalsupply" : "100000.24224"
 }
 ```
 + __Response__
 ```json
 {
    "response": "ok"
 }
 ```
 
 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```

 ### 3. BalanceOf
 - Method : Post
 - Path : /BalanceOf
 + __Reaquest__
 ```json
 {
    "id" : "spender",
    "minter" : "eDUwOTo6Q049bWludGVyLE9VPWNsaWVudDo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT"
 }
 ```
 + __Response__
 ```json
 {
    "response": "99800.24224"
 }
 ```
 
 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```

### 4. TotalSupply
 - Method : Post
 - Path : /TotalSupply
 + __Reaquest__

 ```json
 {
    "id" : "minter"
 }
 ```

 + __Response__
 ```json
 {
    "response": "100000.24224"
 }
 ```
 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```



### 5. Minter account balance Burn
 - Method : Post
 - Path : /Burn
 + __Reaquest__
 ```json
 {
    "id" : "spender",
    "minter" : "eDUwOTo6Q049bWludGVyLE9VPWNsaWVudDo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT"
 }
 ```


 + __Response__
 ```json
 {
    "response": "ok"
 }
 ```

  - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```


### 6. Transfer
 - Method : Post
 - Path : /Transfer
 + __Reaquest__
 ```json
 {
    "id" : "minter",
    "to" : "eDUwOTo6Q049dGVzdCxPVT1jbGllbnQ6OkNOPWZhYnJpYy1jYS1zZXJ2ZXIsT1U9RmFicmljLE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUw==",
    "_value" : "1000.2223"
 }
 ```


 + __Response__
 ```json
 {
    "response": "ok"
 }
 ```

 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```


### 7. Account check (ClientAccountID)
 - Method : Post
 - Path : /ClientAccountID
 + __Reaquest__

 ```json
 {
     "id" : "test"
 }
 ```

 + __Response__
 ``` json
 {
    "response": "eDUwOTo6Q049dGVzdCxPVT1jbGllbnQ6OkNOPWZhYnJpYy1jYS1zZXJ2ZXIsT1U9RmFicmljLE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUw=="
 }
 ```

 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```


 ### 8. Account check (ClientAccountBalance)
 - Method : Post
 - Path : /ClientAccountBalance
 + __Reaquest__

 ```json
 {
     "id" : "test"
 }
 ```

 + __Response__
 ``` json
 {
    "response": "1000.2223"
 }
 ```
 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```


 ### 9. Approve (승인)
 - Method : Post
 - Path : /Approve
 + __Reaquest__

 ```json
 {
    "id" : "minter",
    "spender" : "eDUwOTo6Q049c3BlbmRlcixPVT1jbGllbnQ6OkNOPWZhYnJpYy1jYS1zZXJ2ZXIsT1U9RmFicmljLE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUw==",
    "value" : "200"
 }
 ```

 + __Response__
 ``` json
 {
    "response": "ok"
 }
 ```
 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```

 ### 10. Allowance (승인)
 - Method : Post
 - Path : /Allowance
 + __Reaquest__

 ```json
 {
    "id" : "test1",
    "minter" : "eDUwOTo6Q049bWludGVyLE9VPWNsaWVudDo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT",
    "spender" : "eDUwOTo6Q049c3BlbmRlcixPVT1jbGllbnQ6OkNOPWZhYnJpYy1jYS1zZXJ2ZXIsT1U9RmFicmljLE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUw=="
 }
 ```

 + __Response__
 ``` json
 {
    "response": "{지출자 값}"
 }
 ```
 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```

 ### 11. TransferFrom (제 3자 전송)
 - Method : Post
 - Path : /Allowance
 + __Reaquest__

 ```json
 {
    "id" : "spender",
    "from" : "eDUwOTo6Q049bWludGVyLE9VPWNsaWVudDo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT",
    "to" : "eDUwOTo6Q049cmVjaXBpZW50LE9VPWNsaWVudDo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT",
    "value" : "100"
 }
 ```

 + __Response__
 ``` json
 {
    "response": "ok"
 }
 ```
 - __Error__
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```
