import ingredientsData from '../fixtures/ingredients.json';
import orderData from '../fixtures/order.json';

const ingredients = ingredientsData.data;
const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
const mains = ingredients.filter(ingredient => ingredient.type === 'main');
const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');

const testBun = buns[0];
const testMain = mains[0];
const testSauce = sauces[0];
const nameIngredients = [testMain.name, testSauce.name];
const testRefreshToken = 'testRefreshToken';
const testAccessToken = 'testAccessToken';
const testOrderNumber = orderData.order.number;

describe('проверяем функциональность страницы конструктора бургера', () => {
   beforeEach(() => {
        // моковые токены
        localStorage.setItem('refreshToken', testRefreshToken);
        cy.setCookie('accessToken', testAccessToken);
        cy.viewport(1300, 800);

        cy.intercept('GET', '**/api/ingredients', {
            fixture: 'ingredients.json',
        }).as('getIngredients');

         cy.intercept('GET', '**/api/auth/user', {
            fixture: 'user.json',
        }).as('getUser');

        cy.intercept('POST', '**/api/orders', {
            fixture: 'order.json',
        }).as('postOrder');

      
        cy.visit('/');
        cy.wait('@getIngredients');
        cy.wait('@getUser');
    }); 

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('Тестируем добавление ингредиентов из списка в конструктор.', () => {
        // выбираем ингридиенты из списка и кликаем
        cy.get(`[data-cy=${testBun._id}]`).contains('button', 'Добавить').click();
        cy.get(`[data-cy=${testMain._id}]`).contains('button', 'Добавить').click();
        cy.get(`[data-cy=${testSauce._id}]`).contains('button', 'Добавить').click();

        // проверяем, что булка добавилась в оба блока
        cy.get('[data-cy=sectionConstructor]').within(() => {
            cy.get('[data-cy=firstBun]').contains(testBun.name).should('be.visible');
            cy.get('[data-cy=lastBun]').contains(testBun.name).should('be.visible');
        });

        // проверяем, что начинки/ соусы попали в список и их количество соответствует нужному
        cy.get('[data-cy=sectionConstructor]').within(() => {
            cy.get('[data-cy=ingredients]').children().should('have.length', nameIngredients.length);
        });

        cy.get('[data-cy=sectionConstructor]').within(() => {
            cy.get('[data-cy=ingredients]').within(() => {
                nameIngredients.forEach(name => {
                    cy.contains(name).should('be.visible');
                });
            });
        });  
    });

    it('Тестируем работу модальных окон: открытие модального окна ингридиента и закрытие по клику на крестик.', () => {
        cy.get(`[data-cy=${testBun._id}]`).click();
        cy.get('[data-cy=modal]').should('be.visible').contains(testBun.name).should('be.visible');
        cy.get('[data-cy=modalClose]').click();
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Тестируем работу модальных окон: открытие модального окна ингридиента и закрытие по клику на оверлей.', () => {
        cy.get(`[data-cy=${testBun._id}]`).click();
        cy.get('[data-cy=modal]').should('be.visible').contains(testBun.name).should('be.visible');
        cy.get('[data-cy=modalOverlay]').click({ force: true });
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Тестируем создание заказа.', () => {
        // выбираем ингридиенты из списка и кликаем - собираем заказ
        cy.get(`[data-cy=${testBun._id}]`).contains('button', 'Добавить').click();
        cy.get(`[data-cy=${testMain._id}]`).contains('button', 'Добавить').click();
        cy.get(`[data-cy=${testSauce._id}]`).contains('button', 'Добавить').click();

        // нажать Оформить заказ
        cy.get('[data-cy=orderButton]').click();
        cy.wait('@postOrder').its('request.body').should('deep.equal', {
            ingredients: [testBun._id, testMain._id, testSauce._id, testBun._id]
        });

        // Проверяется, что модальное окно открылось и номер заказа верный
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=orderNumber]').contains(testOrderNumber).should('be.visible');
        
        // Закрывается модальное окно и проверяется успешность закрытия
        cy.get('[data-cy=modalClose]').click();
        cy.get('[data-cy=modal]').should('not.exist');
        cy.get('[data-cy=orderNumber]').should('not.exist');

        // Проверяем, что конструктор пуст
        cy.get('[data-cy=firstBun]').should('not.exist');
        cy.get('[data-cy=lastBun]').should('not.exist');
        cy.get('[data-cy=ingredientItem]').should('have.length', 0);
    });

});

