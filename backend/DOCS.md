## Decorators

  - по умолчанию для всех эндпоинтов вызывается **JwtGuard**
  - для обычного эндпоинта без декораторов проверяется проверка наличия guestId в request, если его нет - смотрит access_token
  - для **@Public** декоратора не проверяется ничего - используется только для refresh эндпоинта, чтобы выключить **JwtGuard**, (там включен **RefreshGuard**)
  - для **@UserOnly** декоратора проверяется обязательное наличие access_token


## Middlewares

**GuestTokenMiddleware**
Middleware для обработки гостевого токена (guest_token) в куках.
Если пользователь не авторизован (нет access_token), то ему присваивается уникальный guestId и создаётся JWT, сохраняемый в куках.

🔧 Логика
- Если присутствует access_token, guest_token сбрасывается (удаляется).
- Если guest_token отсутствует или недействителен:
  - создаётся новый guestId
  - создаётся JWT токен с guestId
  - токен сохраняется в guest_token куки.
- Если есть guest_token - присваивает guestId в req.guest = { id: guestId }.