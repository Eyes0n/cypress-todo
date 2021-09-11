# Build and test an application using Cypress

This repository is the starting point for an official Cypress tutorial. We encourage you to clone this repo and follow along.

- `describe()`와 `context()`은 동일한 의미 및 기능

- `it()`과 `specify()`은 동일한 의미 및 기능

- `only()`은 여러 케이스에서 only가 붙은 케이스만 test하겠다는 의미

- `type(string)`은 "string문자열이 입력된다." 라는 의미

  => 테스트 실행 시 string 문자열이 입력되면서 진행된다.

- `get()`은 매개변수로 class, id, 여러 변수가 들어올 수 있으며 해당 tag를 찾는다.

- `should()`는 `assert`이며 ???

  should syntax

  ```js
  .should(chainers)
  .should(chainers, value)
  .should(chainers, method, value)
  .should(callbackFn)
  ```

## 프론트에서 api test 하기

1. api 임의 서버 만들기 `cy.server()`
2. 요청 api에 따른 응답 api 만들기

   ```js
   cy.route('HTTP Method', 'Request API', { Obj Response });

   cy.route({
     url: '/api/todos',
     method: 'POST',
     status: 500,
     response: {},
   });
   ```

## Cypress Command 만들기

support/commands.js 파일에서 `Cypress.Commands.add('함수명', callback)` 으로 추가

- seedAndVisit() 명령 : 해당 주소로 이동하여 초기 todos를 load한다.

  > 예제에서는 input-form의 경우와 app-init경우를 나누어서 test 코드 작성
  >
  > - input-form의 경우 초기 데이터가 **없는** 경우에 대한 test case
  >   `cy.seedAndVisit([])`호출
  > - app-init의 경우 초기 데이터가 **있는** 경우에 대한 test case
  >   `cy.seedAndVisit()`호출

  ```js
  Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos') => {
    cy.server();
    cy.route('GET', '/api/todos', seedData);
    cy.visit('/');
  });
  ```
