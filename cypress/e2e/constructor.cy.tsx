import ingredientsData from '../fixtures/ingredients.json';

const ingredients = ingredientsData.data;
const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
const mains = ingredients.filter(ingredient => ingredient.type === 'main');
const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');

const testBun = buns[0];
const testMain = mains[0];
const testSauce = sauces[0];
const nameIngredients = [testMain.name, testSauce.name];

describe('проверяем функциональность страницы конструктора бургера', () => {
   beforeEach(() => {
        cy.intercept('GET', '**/api/ingredients', {
            fixture: 'ingredients.json',
        }).as('getIngredients');
      
        cy.visit('/');
        cy.wait('@getIngredients');
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

        
        
    })
});

