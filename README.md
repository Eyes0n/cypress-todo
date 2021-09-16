# Build and test an application using Cypress

This repository is the starting point for an official Cypress tutorial. We encourage you to clone this repo and follow along.

## [Cypress API](https://docs.cypress.io/api/table-of-contents)

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

- [cy.as()]('https://docs.cypress.io/api/commands/as')
  alias(별칭) 만들기 '@' prefix를 사용하여 cy.get() || cy.wait() Commands 내에서 사용

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

- [cy.contains()](https://docs.cypress.io/api/commands/contains)
  text를 포함하는 DOM element를 반환

- [cy.wrap()](https://docs.cypress.io/api/commands/wrap)
  wrap의 매개변수로 전달된 obj를 생성
  호출된 obj를 생성

- [cy.wait()](https://docs.cypress.io/api/commands/wait)
  특정 시간(ex. setTimeout)이나 리소스(ex. API응답)가 해결될 때까지 기다리기

- [cy.each()](https://docs.cypress.io/api/commands/each)
  배열과 같은 구조(길이 속성이 있는 배열 또는 객체)에서 콜백 함수를 반복 실행
  `cy.each( callbackFunc )`

- [cy.request()](https://docs.cypress.io/api/commands/request)
  HTTP 요청 만들기

  ```js
  cy.request(url);
  cy.request(url, body);
  cy.request(method, url);
  cy.request(method, url, body);
  cy.request(options);
  ```

## API TEST 하기

1. api 임의 서버 만들기 [cy.server()](https://docs.cypress.io/api/commands/server)
2. 요청 api에 따른 응답 api 만들기 [cy.route()](https://docs.cypress.io/api/commands/route)

   ```js
   cy.route('HTTP Method', 'Request URL API', Response);

   cy.route({
     url: '/api/todos',
     method: 'POST',
     status: 500,
     response: {},
   });
   ```

3. `cy.intercept()` 사용하기
   cy.server() and cy.route() are deprecated in Cypress 6.0.0.

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

## Cypress 객체로 다양한 bundles를 제공함

- `Cypress._` ([lodash](https://lodash.com/docs/))
  - Cypress.\_.head() 사용
  - Cypress.\_.merge() 사용
- `Cypress.$` (jQuery)
- `Cypress.minimatch` (minimatch.js)
- `Cypress.Blob` (Blob utils)
- `Cypress.Promise` (Bluebird)
