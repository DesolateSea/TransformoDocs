---
title: TransformoDocs v1.0.0
language_tabs:
  - http: http
  - shell: shell
  - javascript: javascript
  - python: python
language_clients:
  - http: ""
  - shell: ""
  - javascript: ""
  - python: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="transformodocs">TransformoDocs v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API for TransformoDocs

Base URLs:

* <a href="http://localhost:8080">http://localhost:8080</a>

<h1 id="transformodocs-user-authentication-api">User Authentication API</h1>

API for user authentication for the client application

## verifyResetPasswordOTP

<a id="opIdverifyResetPasswordOTP"></a>

> Code samples

```http
POST http://localhost:8080/api/auth/verify-reset-otp HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/auth/verify-reset-otp \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "email": "string",
  "otp": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/auth/verify-reset-otp',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/auth/verify-reset-otp', headers = headers)

print(r.json())

```

`POST /api/auth/verify-reset-otp`

*Verify reset password OTP*

Verify reset password OTP sent to user's email for password reset

> Body parameter

```json
{
  "email": "string",
  "otp": "string"
}
```

<h3 id="verifyresetpasswordotp-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[OTPVerifyRequest](#schemaotpverifyrequest)|true|none|
|» email|body|string|false|none|
|» otp|body|string|false|none|

> Example responses

> 200 Response

<h3 id="verifyresetpasswordotp-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OTP reset successful|[AuthResponse](#schemaauthresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## verifyEmailOtp

<a id="opIdverifyEmailOtp"></a>

> Code samples

```http
POST http://localhost:8080/api/auth/verify-email-otp HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/auth/verify-email-otp \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "email": "string",
  "otp": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/auth/verify-email-otp',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/auth/verify-email-otp', headers = headers)

print(r.json())

```

`POST /api/auth/verify-email-otp`

*Verify email OTP*

Verify OTP sent to user's email for email verification during registration

> Body parameter

```json
{
  "email": "string",
  "otp": "string"
}
```

<h3 id="verifyemailotp-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[OTPVerifyRequest](#schemaotpverifyrequest)|true|none|
|» email|body|string|false|none|
|» otp|body|string|false|none|

> Example responses

> 200 Response

<h3 id="verifyemailotp-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OTP verified successfully|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## updatePassword

<a id="opIdupdatePassword"></a>

> Code samples

```http
POST http://localhost:8080/api/auth/update-password HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/auth/update-password \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "email": "string",
  "token": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/auth/update-password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/auth/update-password', headers = headers)

print(r.json())

```

`POST /api/auth/update-password`

*Update password*

Update password for a user with a reset password OTP

> Body parameter

```json
{
  "email": "string",
  "token": "string",
  "password": "string"
}
```

<h3 id="updatepassword-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ResetPasswordRequest](#schemaresetpasswordrequest)|true|none|
|» email|body|string|false|none|
|» token|body|string|false|none|
|» password|body|string|false|none|

> Example responses

> 200 Response

<h3 id="updatepassword-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Password is reset successfully|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## signup

<a id="opIdsignup"></a>

> Code samples

```http
POST http://localhost:8080/api/auth/register HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/auth/register \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "email": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/auth/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/auth/register', headers = headers)

print(r.json())

```

`POST /api/auth/register`

*Register a new user*

Register a new user with email and password, sends an OTP to the user's email for verification

> Body parameter

```json
{
  "email": "string",
  "password": "string"
}
```

<h3 id="signup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SignupRequest](#schemasignuprequest)|true|none|
|» email|body|string|true|none|
|» password|body|string|false|none|

> Example responses

> 201 Response

<h3 id="signup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|User registered successfully|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## logout

<a id="opIdlogout"></a>

> Code samples

```http
POST http://localhost:8080/api/auth/logout HTTP/1.1
Host: localhost:8080
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/auth/logout \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/auth/logout',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/auth/logout', headers = headers)

print(r.json())

```

`POST /api/auth/logout`

*Logout a user*

Logout a user by clearing the JWT cookie

> Example responses

> 200 Response

<h3 id="logout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Logout successful|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## login

<a id="opIdlogin"></a>

> Code samples

```http
POST http://localhost:8080/api/auth/login HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "email": "string",
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/auth/login', headers = headers)

print(r.json())

```

`POST /api/auth/login`

*Login a user*

Login a user with email and password, upon successful login, a JWT token is set in cookie and returned in response

> Body parameter

```json
{
  "email": "string",
  "password": "string"
}
```

<h3 id="login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginRequest](#schemaloginrequest)|true|none|
|» email|body|string|false|none|
|» password|body|string|false|none|

> Example responses

> 200 Response

<h3 id="login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Login successful|[AuthResponse](#schemaauthresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## forgetPassword

<a id="opIdforgetPassword"></a>

> Code samples

```http
POST http://localhost:8080/api/auth/forgot-password HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/auth/forgot-password \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/auth/forgot-password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/auth/forgot-password', headers = headers)

print(r.json())

```

`POST /api/auth/forgot-password`

*Send reset password OTP*

Send reset password OTP to user's email for password reset

> Body parameter

```json
"string"
```

<h3 id="forgetpassword-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|string|true|none|

> Example responses

> 200 Response

<h3 id="forgetpassword-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Reset password OTP sent successfully|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="transformodocs-file-upload-controller">file-upload-controller</h1>

## pdfUpload

<a id="opIdpdfUpload"></a>

> Code samples

```http
POST http://localhost:8080/api/public/v1/upload/pdf HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: */*

```

```shell
# You can also use wget
curl -X POST http://localhost:8080/api/public/v1/upload/pdf \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "pdf": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/public/v1/upload/pdf',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}

r = requests.post('http://localhost:8080/api/public/v1/upload/pdf', headers = headers)

print(r.json())

```

`POST /api/public/v1/upload/pdf`

> Body parameter

```json
{
  "pdf": "string"
}
```

<h3 id="pdfupload-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» pdf|body|string(binary)|true|none|

> Example responses

> 200 Response

<h3 id="pdfupload-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="transformodocs-security-controller">security-controller</h1>

## getCsrfToken

<a id="opIdgetCsrfToken"></a>

> Code samples

```http
GET http://localhost:8080/api/public/v1/auth/_csrf HTTP/1.1
Host: localhost:8080
Accept: */*

```

```shell
# You can also use wget
curl -X GET http://localhost:8080/api/public/v1/auth/_csrf \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/public/v1/auth/_csrf',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:8080/api/public/v1/auth/_csrf', headers = headers)

print(r.json())

```

`GET /api/public/v1/auth/_csrf`

> Example responses

> 200 Response

<h3 id="getcsrftoken-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="getcsrftoken-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="transformodocs-user-controller">user-controller</h1>

## getUserById

<a id="opIdgetUserById"></a>

> Code samples

```http
GET http://localhost:8080/api/private/user/{id} HTTP/1.1
Host: localhost:8080
Accept: */*

```

```shell
# You can also use wget
curl -X GET http://localhost:8080/api/private/user/{id} \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/private/user/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:8080/api/private/user/{id}', headers = headers)

print(r.json())

```

`GET /api/private/user/{id}`

<h3 id="getuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

<h3 id="getuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## getUser

<a id="opIdgetUser"></a>

> Code samples

```http
GET http://localhost:8080/api/private/user/ HTTP/1.1
Host: localhost:8080
Accept: */*

```

```shell
# You can also use wget
curl -X GET http://localhost:8080/api/private/user/ \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://localhost:8080/api/private/user/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': '*/*'
}

r = requests.get('http://localhost:8080/api/private/user/', headers = headers)

print(r.json())

```

`GET /api/private/user/`

> Example responses

> 200 Response

<h3 id="getuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_OTPVerifyRequest">OTPVerifyRequest</h2>
<!-- backwards compatibility -->
<a id="schemaotpverifyrequest"></a>
<a id="schema_OTPVerifyRequest"></a>
<a id="tocSotpverifyrequest"></a>
<a id="tocsotpverifyrequest"></a>

```json
{
  "email": "string",
  "otp": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|otp|string|false|none|none|

<h2 id="tocS_AuthResponse">AuthResponse</h2>
<!-- backwards compatibility -->
<a id="schemaauthresponse"></a>
<a id="schema_AuthResponse"></a>
<a id="tocSauthresponse"></a>
<a id="tocsauthresponse"></a>

```json
{
  "message": "string",
  "token": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|
|token|string|false|none|none|

<h2 id="tocS_MessageResponse">MessageResponse</h2>
<!-- backwards compatibility -->
<a id="schemamessageresponse"></a>
<a id="schema_MessageResponse"></a>
<a id="tocSmessageresponse"></a>
<a id="tocsmessageresponse"></a>

```json
{
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|

<h2 id="tocS_ResetPasswordRequest">ResetPasswordRequest</h2>
<!-- backwards compatibility -->
<a id="schemaresetpasswordrequest"></a>
<a id="schema_ResetPasswordRequest"></a>
<a id="tocSresetpasswordrequest"></a>
<a id="tocsresetpasswordrequest"></a>

```json
{
  "email": "string",
  "token": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|token|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_SignupRequest">SignupRequest</h2>
<!-- backwards compatibility -->
<a id="schemasignuprequest"></a>
<a id="schema_SignupRequest"></a>
<a id="tocSsignuprequest"></a>
<a id="tocssignuprequest"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|none|
|password|string|false|none|none|

<h2 id="tocS_LoginRequest">LoginRequest</h2>
<!-- backwards compatibility -->
<a id="schemaloginrequest"></a>
<a id="schema_LoginRequest"></a>
<a id="tocSloginrequest"></a>
<a id="tocsloginrequest"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "string",
  "email": "string",
  "emailVerified": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|email|string|false|none|none|
|emailVerified|boolean|false|none|none|

