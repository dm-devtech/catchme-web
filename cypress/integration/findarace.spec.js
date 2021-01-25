describe("Testing Find Race Page", function () {
  describe("Find Race Page", function () {
    it("check content is correct", function () {
      cy.visit("/findrace");
      cy.get("input").contains("Find Race").click();
      cy.location("pathname").should("include", "findrace");
      cy.readFile("src/assets/SoundEffects/buttonClick.mp3", "base64").then(
        (mp3) => {
          const uri = "data:audio/mp3;base64," + mp3;
          const audio = new Audio(uri);

          audio.play();
        }
      );
      cy.get("h1").contains("CatchMe");
      cy.get("h2").contains("Race Finder");
      cy.get("p").contains("Enter your name:");
      cy.get("input").contains("Find Race");
      cy.get('[alt="home-icon"]').should("be.visible");
      cy.get('[alt="plus-icon"]').should("be.visible");
      cy.get("p").contains("KiMaGoDa");
    });
  });

  describe("Find Race Page", function () {
    it("check content is correct", function () {
      cy.visit("/findrace");
      cy.get("input").contains("Find Race");
      cy.location("pathname").should("include", "findrace");
      cy.readFile("src/assets/SoundEffects/buttonClick.mp3", "base64").then(
        (mp3) => {
          const uri = "data:audio/mp3;base64," + mp3;
          const audio = new Audio(uri);

          audio.play();
        }
      );
      cy.get("h1").contains("CatchMe");
      cy.get("h2").contains("Race Finder");
      cy.get("p").contains("Enter your name:");
      cy.get("input").contains("Find Race");
      cy.get('[alt="home-icon"]').should("be.visible");
      cy.get('[alt="plus-icon"]').should("be.visible");
      cy.get("p").contains("KiMaGoDa");
      cy.get("input").contains("Find Race").click();
      cy.get("h1").contains("CatchMe");
      cy.get('[alt="home-icon"]').should("be.visible");
      cy.get("p").contains("KiMaGoDa");
    });
  });
});
