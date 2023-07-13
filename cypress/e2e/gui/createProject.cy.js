import { faker } from "@faker-js/faker";
//a partir desse objeto, quando for passado o parâmetro, o teste poderá ser visual para camadas gui e api somadas
const options = { env: { snapshotOnly: true } };

describe("Create Project", options, () => {
  beforeEach(() => {
    cy.api_deleteProjects();
    cy.login();
  });

  it("successfully", () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    };

    cy.gui_createProject(project);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/${Cypress.env("user_name")}/${project.name}`
    );
    cy.contains(project.name).should("be.visible");
    cy.contains(project.description).should("be.visible");
  });
});
