describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses input on load', () => {
    cy.focused().should('have.class', 'new-todo');
  });

  it('accepts input', () => {
    const typedText = 'Buy Milk';

    cy.get('.new-todo').type(typedText).should('have.value', typedText);
  });

  context('Form submission', () => {
    beforeEach(() => {
      cy.server();
    });

    it('Add a new todo on submit', () => {
      const itemText = 'Buy eggs';
      // 해당 api를 가진 서버가 없어도 cypress에서 아래와 같이 서버를 임의로 정의해줘서 사용가능하다.
      // post api 요청 성공의 경우에 대한 case
      cy.route('POST', 'api/todos', {
        name: itemText,
        id: 1,
        isCompleted: false,
      });

      cy.get('.new-todo')
        .type(itemText)
        .type('{enter}')
        .should('have.value', '');

      cy.get('.todo-list li').should('have.length', 1).and('contain', itemText);
    });

    it('Shows an error mesage on a failed submission', () => {
      // post api 요청 실패의 경우에 대한 case
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {},
      });

      cy.get('.new-todo').type('test{enter}');

      cy.get('.todo-list li').should('not.exist');

      cy.get('.error').should('be.visible');
    });
  });
});
