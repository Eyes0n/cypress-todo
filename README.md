# Build and test an application using Cypress

This repository is the starting point for an official Cypress tutorial. We encourage you to clone this repo and follow along.

- `describe()`와 `context()`은 동일한 의미 및 기능

- `it()`과 `specify()`은 동일한 의미 및 기능

- `only()`은 여러 케이스에서 only가 붙은 케이스만 test하겠다는 의미

- `type(string)`은 "string문자열이 입력된다." 라는 의미

  => 테스트 실행 시 string 문자열이 입력되면서 진행된다.

- `get()`은 매개변수로 class, id, 여러 변수가 들어올 수 있으며 해당 tag를 찾는다.
  get syntax

  ```js
  cy.get(selector);
  cy.get(alias);
  cy.get(selector, options);
  cy.get(alias, options);
  ```

- `should()`는 `assert`이며 ???
  should syntax

  ```js
  .should(chainers)
  .should(chainers, value)
  .should(chainers, method, value)
  .should(callbackFn)
  ```

- `invoke(func)` 이전에 산출된 결과에 대해 함수를 호출합니다.
  syntax

  ```js
  .invoke(functionName)
  .invoke(options, functionName)
  .invoke(functionName, args...)
  .invoke(options, functionName, args...)
  ```

  todo 삭제 시 hover되야 보이는 삭제 버튼에서 hover에 대응되는 함수를 호출합니다.

  ```js
  cy.get('.todo-list li').as('list');
  cy.get('@list')
    .first()
    .find('.destroy')
    .invoke('show') // hover에 대응되는 함수 호출
    .click();
  ```

- `as()`로 alias(별칭) 만들기 '@' prefix를 사용하여 cy.get() || cy.wait() Commands 내에서 사용
  링크 : https://docs.cypress.io/api/commands/as

  ```js
  // as 사용 전 list를 참조하여 사용
  const list = cy.get('.todo-list li');

  list.first().find('.destroy').invoke('show').click();

  // as 사용 후 @list를 get으로 호출하여 사용
  cy.get('.todo-list li').as('list'); // alias 정의 '@' 접두어 사용 X

  cy.get('@list') // '@'접두어 붙여서 호출
    .first()
    .find('.destroy')
    .invoke('show')
    .click();

  cy.get('@list') // '@'접두어 붙여서 호출
    .should('have.length', 3)
    .and('not.contain', 'Milk');
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
