## Create users:

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

	
