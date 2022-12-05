# Initialize:

1. Create database **Nalbandian**
2. Create collection **keys**
3. Create users:

```shell
use admin

db.createUser(
{	user: "Ararat",
	pwd: "jcu3CV2JXX7u",
	roles:[{role: "readWrite" , db:"Nalbandian"}]
})

db.createUser(
{	user: "admin",
	pwd: "0GLJyBNaCr4M",
	roles:[{role: "userAdminAnyDatabase" , db:"admin"}]
})
```

4.  Enable authorization
    > Add this to `C:\Program Files\MongoDB\Server\6.0\bin`
    ````security:
        authorization: enabled````
5.  Restart MongoDB service
