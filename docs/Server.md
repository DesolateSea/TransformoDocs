---
title: OpenAPI definition v0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="openapi-definition">OpenAPI definition v0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="http://localhost:8080">http://localhost:8080</a>

<h1 id="openapi-definition-user-authentication-api">User Authentication API</h1>

API for user authentication for the client application

## verifyResetPasswordOTP

<a id="opIdverifyResetPasswordOTP"></a>

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

<h1 id="openapi-definition-file-upload-controller">file-upload-controller</h1>

## pdfUpload

<a id="opIdpdfUpload"></a>

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

<h1 id="openapi-definition-test-controller">test-controller</h1>

## test

<a id="opIdtest"></a>

`GET /api/public/test`

> Example responses

> 200 Response

<h3 id="test-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="success">
This operation does not require authentication
</aside>

## testPost

<a id="opIdtestPost"></a>

`POST /api/public/test`

> Example responses

> 200 Response

<h3 id="testpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="success">
This operation does not require authentication
</aside>

## healthTest

<a id="opIdhealthTest"></a>

`GET /api/public/python/health`

> Example responses

> 200 Response

<h3 id="healthtest-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="success">
This operation does not require authentication
</aside>

## OTPChecker

<a id="opIdOTPChecker"></a>

`GET /api/public/WrongOTP`

<h3 id="otpchecker-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## UserChecker

<a id="opIdUserChecker"></a>

`GET /api/public/UserExists`

<h3 id="userchecker-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## InvalidEmailChecker

<a id="opIdInvalidEmailChecker"></a>

`GET /api/public/InvalidEmail`

<h3 id="invalidemailchecker-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## testPrivate

<a id="opIdtestPrivate"></a>

`GET /api/private/test`

> Example responses

> 200 Response

<h3 id="testprivate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="openapi-definition-security-controller">security-controller</h1>

## getCsrfToken

<a id="opIdgetCsrfToken"></a>

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

<h1 id="openapi-definition-user-controller">user-controller</h1>

## getUserById

<a id="opIdgetUserById"></a>

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

