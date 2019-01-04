# voyages-voyages

## Test API

* Bad request

```
curl localhost:3000/bad -v
curl localhost:3000/api/trips -v
```

* register

```
curl localhost:3000/api/auth/register -XPOST -d'{"name":"bob", "email":"bob@example.com","password":"12345678"}' -H 'Content-Type: application/json' -v
curl localhost:3000/api/auth/register -XPOST -d'{"name":"bob", "email":"bob@example.com"}' -H 'Content-Type: application/json' -v
curl localhost:3000/api/auth/register -XPOST -d'{"name":"bob", "email":"bob@example.com","password":"12345678"}' -H 'Content-Type: application/json' -v
curl localhost:3000/api/auth/register -XPOST -d'{"name":"bobby", "email":"bobby@example.com","password":"12345678"}' -H 'Content-Type: application/json' -v
```

* login

```
curl localhost:3000/api/auth/signin -XPOST -d'{"email":"bob@example.com","password":"12345678"}' -H 'Content-Type: application/json' -v
curl localhost:3000/api/auth/signin -XPOST -d'{"email":"unknownbob@example.com","password":"12345678"}' -H 'Content-Type: application/json' -v
curl localhost:3000/api/auth/signin -XPOST -d'{"email":"bob@example.com","password":"1234"}' -H 'Content-Type: application/json' -v
```

* trips

```
curl localhost:3000/api/trips -XGET -H 'Cookie: access_token=XXXXXXXXX'
curl localhost:3000/api/trips -XPOST -H 'Cookie: access_token=XXXXXXXXX' -v -d'{"name":"sahara"}'
```

